import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  useColorScheme,
  StatusBar,
  Linking,
  Modal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import {
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  Shield,
  Navigation,
  X,
  FileText,
  Search,
  Car,
  Users,
  Mail,
  User,
} from "lucide-react-native";
import GradientHeader from "../components/GradientHeader";

const { height } = Dimensions.get("window");

const NearestHelpScreen = () => {
  const router = useRouter();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState(null);
  const [distance, setDistance] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? "#1a1f4d" : "#ffffff";

  const [policeStations, setPoliceStations] = useState([]);
  const [nearestHelp, setNearestHelp] = useState(null);
  const [fetchingStations, setFetchingStations] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      fetchNearbyPoliceStations();
    }
  }, [currentLocation]);

  useEffect(() => {
    if (currentLocation && policeStations.length > 0) {
      findNearestStation();
    }
  }, [currentLocation, policeStations]);

  useEffect(() => {
    if (currentLocation && nearestHelp) {
      fetchRoute();
    }
  }, [nearestHelp]);

  useEffect(() => {
    if (showDetailsModal) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showDetailsModal]);

  const fetchNearbyPoliceStations = async () => {
    if (!currentLocation) return;

    setFetchingStations(true);
    const { latitude, longitude } = currentLocation;
    const radius = 10000; // 10km radius

    // Overpass API query
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="police"](around:${radius},${latitude},${longitude});
        way["amenity"="police"](around:${radius},${latitude},${longitude});
        relation["amenity"="police"](around:${radius},${latitude},${longitude});
      );
      out body;
      >;
      out skel qt;
    `;

    try {
      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const data = await response.json();

      // Process the results
      const stations = data.elements
        .filter((element) => element.lat && element.lon)
        .map((element, index) => {
          const tags = element.tags || {};
          return {
            id: element.id || index,
            name: tags.name || `Police Station ${index + 1}`,
            latitude: element.lat,
            longitude: element.lon,
            address: formatAddress(tags),
            phone: tags.phone || tags["contact:phone"] || "N/A",
            landline: tags.phone || "N/A",
            mobile: tags["contact:mobile"] || "N/A",
            email: tags.email || tags["contact:email"] || "N/A",
            officer: "Officer Information Not Available",
            website: tags.website || tags["contact:website"] || null,
            opening_hours: tags.opening_hours || "24/7",
          };
        });

      console.log(`Found ${stations.length} police stations nearby`);
      setPoliceStations(stations);
      setFetchingStations(false);

      if (stations.length === 0) {
        Alert.alert(
          "No Police Stations Found",
          "No police stations found within 10km. Try increasing the search radius."
        );
      }
    } catch (error) {
      console.error("Error fetching police stations:", error);
      Alert.alert(
        "Error",
        "Could not fetch nearby police stations. Please try again."
      );
      setFetchingStations(false);
    }
  };

  const fetchRoute = async () => {
    if (!currentLocation || !nearestHelp) return;

    try {
      // Using OSRM (free, no API key needed)
      const url = `https://router.project-osrm.org/route/v1/driving/${currentLocation.longitude},${currentLocation.latitude};${nearestHelp.longitude},${nearestHelp.latitude}?overview=full&geometries=geojson`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];

        // Convert coordinates from [lng, lat] to {latitude, longitude}
        const coords = route.geometry.coordinates.map((coord) => ({
          latitude: coord[1],
          longitude: coord[0],
        }));

        setRouteCoordinates(coords);

        // Update distance and time from actual route
        setDistance((route.distance / 1000).toFixed(1)); // Convert meters to km
        setEstimatedTime(Math.round(route.duration / 60)); // Convert seconds to minutes
      }
    } catch (error) {
      console.error("Error fetching route:", error);
      // Fallback to straight line
      setRouteCoordinates([currentLocation, nearestHelp]);
    }
  };

  const formatAddress = (tags) => {
    const parts = [];
    if (tags["addr:street"]) parts.push(tags["addr:street"]);
    if (tags["addr:housenumber"]) parts.push(tags["addr:housenumber"]);
    if (tags["addr:city"]) parts.push(tags["addr:city"]);
    if (tags["addr:postcode"]) parts.push(tags["addr:postcode"]);

    return parts.length > 0 ? parts.join(", ") : "Address not available";
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const calculateEstimatedTime = (distanceInKm) => {
    const averageSpeed = 30;
    const timeInHours = distanceInKm / averageSpeed;
    const timeInMinutes = Math.round(timeInHours * 60);
    return timeInMinutes;
  };

  const findNearestStation = () => {
    if (!currentLocation || policeStations.length === 0) return;

    let nearest = policeStations[0];
    let minDistance = calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      policeStations[0].latitude,
      policeStations[0].longitude
    );

    policeStations.forEach((station) => {
      const dist = calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        station.latitude,
        station.longitude
      );
      if (dist < minDistance) {
        minDistance = dist;
        nearest = station;
      }
    });

    setNearestHelp(nearest);
    setDistance(minDistance.toFixed(1));
    setEstimatedTime(calculateEstimatedTime(minDistance));
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to find nearest help"
        );
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const userLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      };

      setCurrentLocation(userLocation);
      setRegion(userLocation);
      setLoading(false);
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "Could not fetch your location");
      setLoading(false);
    }
  };

  const handleEmergencyCall = () => {
    if (!nearestHelp || nearestHelp.phone === "N/A") {
      Alert.alert(
        "No Phone Number",
        "No phone number available for this station"
      );
      return;
    }

    Alert.alert("Emergency Call", `Call ${nearestHelp.name} now?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Call Now",
        onPress: () => {
          const phoneNumber = nearestHelp.phone.replace(/[^0-9+]/g, "");
          Linking.openURL(`tel:${phoneNumber}`);
        },
      },
    ]);
  };

  const handleSendMessage = () => {
    if (!nearestHelp || nearestHelp.phone === "N/A") {
      Alert.alert(
        "No Phone Number",
        "No phone number available for this station"
      );
      return;
    }

    const phoneNumber = nearestHelp.phone.replace(/[^0-9+]/g, "");
    Linking.openURL(`sms:${phoneNumber}`);
  };

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${nearestHelp.latitude},${nearestHelp.longitude}`;
    Linking.openURL(url);
  };

  const handleChangeLocation = () => {
    if (policeStations.length === 0) {
      Alert.alert("No Stations", "No police stations available");
      return;
    }

    Alert.alert(
      "Select Police Station",
      "Choose a different police station",
      policeStations.map((station) => ({
        text: station.name,
        onPress: () => {
          setNearestHelp(station);
          if (currentLocation) {
            const dist = calculateDistance(
              currentLocation.latitude,
              currentLocation.longitude,
              station.latitude,
              station.longitude
            );
            setDistance(dist.toFixed(1));
            setEstimatedTime(calculateEstimatedTime(dist));
          }
        },
      }))
    );
  };

  const handleMoreDetails = () => {
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
  };

  if (loading || !currentLocation || fetchingStations || !nearestHelp) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
        <View className="flex-1 items-center justify-center px-6">
          <ActivityIndicator size="large" color="#DC2626" />
          <Text className="mt-4 text-gray-600 text-base text-center">
            {fetchingStations
              ? "Searching for nearby police stations..."
              : "Finding nearest help..."}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const routeCoordinatesDisplay =
    routeCoordinates.length > 0
      ? routeCoordinates
      : [currentLocation, nearestHelp];

  return (
    <SafeAreaView
      className="flex-1"
      edges={["left", "right"]}
      style={{ backgroundColor: bgColor }}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <GradientHeader
        title="Nearest Help"
        onBack={() => router.push("/(tabs)")}
      />

      <ScrollView className="flex-1">
        {/* Map Section */}
        <View style={{ height: 384 }}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion={region}
            showsUserLocation
            showsMyLocationButton
          >
            <Marker
              coordinate={currentLocation}
              title="Your Location"
              description="You are here"
            >
              <View className="items-center">
                <View className="bg-red-600 w-12 h-12 rounded-full items-center justify-center shadow-lg border-4 border-white">
                  <View className="w-3 h-3 bg-white rounded-full" />
                </View>
              </View>
            </Marker>

            {policeStations.map((station) => (
              <Marker
                key={station.id}
                coordinate={{
                  latitude: station.latitude,
                  longitude: station.longitude,
                }}
                title={station.name}
                description={station.address}
              >
                <View className="items-center">
                  <View
                    className={`${
                      nearestHelp.id === station.id
                        ? "bg-blue-900"
                        : "bg-gray-600"
                    } w-14 h-14 rounded-full items-center justify-center shadow-lg border-4 border-white`}
                  >
                    <Shield size={24} color="white" />
                  </View>
                </View>
              </Marker>
            ))}

            <Polyline
              coordinates={routeCoordinatesDisplay}
              strokeColor="#2563EB"
              strokeWidth={5}
            />
          </MapView>
        </View>

        {/* Help Info Section */}
        <View className="px-4 pb-4 bg-white">
          <View className="flex-row items-center mb-4 mt-2">
            <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mr-4">
              <View className="w-14 h-14 bg-blue-900 rounded-full items-center justify-center">
                <Shield size={28} color="white" />
              </View>
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-900">
                {nearestHelp.name}
              </Text>
              <Text className="text-sm text-gray-600 mt-1">
                {nearestHelp.address}
              </Text>
              <Text className="text-xs text-blue-600 font-semibold mt-1">
                {distance ? `${distance} km away` : "Calculating..."}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleSendMessage}
              className="w-12 h-12 items-center justify-center mr-2 bg-white border border-gray-400 rounded-lg"
              activeOpacity={0.6}
            >
              <MessageSquare size={22} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleEmergencyCall}
              className="w-12 h-12 items-center justify-center bg-white border border-gray-400 rounded-lg"
              activeOpacity={0.6}
            >
              <Phone size={22} color="#000000" />
            </TouchableOpacity>
          </View>

          {/* Trip Details */}
          <View className="mb-5">
            <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
              <View className="flex-row items-center">
                <Clock size={22} color="#6B7280" />
                <Text className="ml-3 text-gray-700 text-base">
                  Estimated time
                </Text>
              </View>
              <Text className="font-bold text-gray-900 text-base">
                {estimatedTime ? `${estimatedTime} mins` : "Calculating..."}
              </Text>
            </View>

            <View className="flex-row items-center justify-between py-3">
              <View className="flex-row items-center">
                <MapPin size={22} color="#6B7280" />
                <Text className="ml-3 text-gray-700 text-base">Distance</Text>
              </View>
              <Text className="font-semibold text-gray-900 text-base">
                {distance ? `${distance} km` : "Calculating..."}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity
            onPress={handleGetDirections}
            className="bg-blue-600 py-4 rounded-xl mb-3 flex-row items-center justify-center"
            activeOpacity={0.7}
          >
            <Navigation size={20} color="white" />
            <Text className="text-white text-center font-bold text-base ml-2">
              Get Directions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleChangeLocation}
            className="bg-white border-2 border-blue-600 py-4 rounded-xl mb-3"
            activeOpacity={0.7}
          >
            <Text className="text-blue-600 text-center font-bold text-base">
              Change Station ({policeStations.length} nearby)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleMoreDetails}
            className="bg-white border border-gray-200 py-4 rounded-xl"
            activeOpacity={0.7}
          >
            <Text className="text-gray-900 text-center font-semibold text-base">
              More details
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* More Details Modal */}
      <Modal
        visible={showDetailsModal}
        transparent
        animationType="none"
        onRequestClose={closeDetailsModal}
      >
        <TouchableWithoutFeedback onPress={closeDetailsModal}>
          <View className="flex-1 bg-black/50">
            <TouchableWithoutFeedback>
              <Animated.View
                style={{
                  transform: [{ translateY: slideAnim }],
                  height: height - 120,
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "white",
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                }}
              >
                {/* Modal Header */}
                <View className="flex-row items-center justify-between px-6 pt-6 pb-4">
                  <TouchableOpacity
                    onPress={closeDetailsModal}
                    className="w-10 h-10 items-center justify-center"
                  >
                    <X size={24} color="#000" />
                  </TouchableOpacity>
                </View>

                {/* Vertical Scroll */}
                <ScrollView
                  nestedScrollEnabled={true}
                  contentContainerStyle={{ paddingBottom: 20 }}
                >
                  {/* Top Info Row */}
                  <View className="flex-row items-center px-6 mb-4">
                    <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mr-3">
                      <View className="w-14 h-14 bg-blue-900 rounded-full items-center justify-center">
                        <Shield size={28} color="white" />
                      </View>
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-bold text-gray-900 mb-1">
                        {nearestHelp.name}
                      </Text>
                      <Text className="text-sm font-semibold text-gray-700">
                        {nearestHelp.address}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={handleEmergencyCall}
                      className="p-2 border border-gray-300 rounded-lg mr-2"
                    >
                      <Phone size={20} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleSendMessage}
                      className="p-2 border border-gray-300 rounded-lg"
                    >
                      <MessageSquare size={20} color="#000" />
                    </TouchableOpacity>
                  </View>

                  {/* Estimated Time */}
                  <View className="flex-row items-center px-6 py-3 border-b border-gray-200">
                    <Clock size={20} color="#6B7280" />
                    <Text className="ml-3 text-sm text-gray-700">
                      Estimated time
                    </Text>
                    <Text className="ml-auto font-semibold text-gray-900">
                      {estimatedTime} mins
                    </Text>
                  </View>

                  {/* Contact Information */}
                  <View className="mx-6 my-4 p-4 border border-black rounded-xl bg-white flex-row">
                    {/* Vertical Step Line & Circles */}
                    <View className="items-center mr-6" style={{ width: 20 }}>
                      {/* Vertical connecting line */}
                      <View
                        style={{
                          width: 2,
                          position: "absolute",
                          top: 10,
                          bottom: 10,
                          backgroundColor: "#D1D5DB",
                        }}
                      />
                      {/* Top circle */}
                      <View
                        className="rounded-full bg-gray-100 border-2 border-white"
                        style={{ width: 20, height: 20, zIndex: 10 }}
                      />
                      <View style={{ flex: 1 }} />
                      {/* Bottom circle */}
                      <View
                        className="rounded-full bg-gray-100 border-2 border-white"
                        style={{ width: 20, height: 20, zIndex: 10 }}
                      />
                    </View>

                    {/* Details */}
                    <View className="flex-1">
                      <View className="mb-6">
                        <Text className="text-base font-semibold text-black mb-1">
                          Police Station
                        </Text>
                        <Text className="text-sm font-medium text-black">
                          {nearestHelp.name}
                        </Text>
                        <Text className="text-sm text-gray-700">
                          {nearestHelp.address}
                        </Text>
                        <Text className="text-sm text-gray-700 mt-1">
                          Phone: {nearestHelp.phone}
                        </Text>
                        {nearestHelp.email !== "N/A" && (
                          <Text className="text-sm text-gray-700">
                            Email: {nearestHelp.email}
                          </Text>
                        )}
                        {nearestHelp.opening_hours && (
                          <Text className="text-sm text-gray-700">
                            Hours: {nearestHelp.opening_hours}
                          </Text>
                        )}
                      </View>

                      <View>
                        <Text className="text-base font-semibold text-black mb-1">
                          Officer in Charge
                        </Text>
                        <Text className="text-sm text-gray-700">
                          {nearestHelp.officer}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Distance */}
                  <View className="flex-row items-center px-6 py-3 border-b border-gray-200">
                    <MapPin size={20} color="#6B7280" />
                    <Text className="ml-3 text-sm text-gray-700">Distance</Text>
                    <Text className="ml-auto font-semibold text-gray-900">
                      {distance} km
                    </Text>
                  </View>

                  {/* Services Offered */}
                  <View className="px-6 py-4">
                    <Text className="text-sm font-semibold text-black mb-3">
                      Services Offered
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      decelerationRate="fast"
                      snapToAlignment="start"
                      snapToInterval={112}
                      contentContainerStyle={{
                        paddingHorizontal: 0,
                      }}
                    >
                      {[
                        { icon: FileText, label: "Report Filing" },
                        { icon: Search, label: "Investigation" },
                        { icon: Car, label: "Patrol" },
                        { icon: Users, label: "Community Programs" },
                        { icon: Mail, label: "Email Support" },
                        { icon: Phone, label: "Emergency Call" },
                        { icon: User, label: "Officer Assistance" },
                        { icon: Shield, label: "Security Guidance" },
                      ].map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                          <View
                            key={index}
                            className="items-center bg-gray-100 rounded-2xl p-3 mr-4"
                            style={{ width: 96 }}
                          >
                            <IconComponent size={28} color="#000" />
                            <Text
                              className="text-xs text-center text-black mt-2"
                              numberOfLines={2}
                            >
                              {service.label}
                            </Text>
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>
                </ScrollView>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default NearestHelpScreen;
