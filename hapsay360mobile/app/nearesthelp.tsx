// NearestHelpScreen.js
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
import GradientHeader from "./components/GradientHeader";

const { height } = Dimensions.get("window");

const NearestHelpScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState(null);
  const [distance, setDistance] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? "#1a1f4d" : "#ffffff";

  // Real Police Stations in Cagayan de Oro City
  const policeStations = [
    {
      id: 1,
      name: "Police Station 1 (Centro)",
      latitude: 8.4829,
      longitude: 124.6503,
      address: "Corrales Avenue, Centro, Cagayan de Oro City",
      phone: "(088) 858-1403",
      landline: "xxx-xxx-xxx",
      mobile: "09xxxxxxxxx",
      email: "ps1@gmail.com",
      officer: "P/Capt. Juan Dela Cruz",
    },
    {
      id: 2,
      name: "Police Station 2 (Carmen)",
      latitude: 8.4947,
      longitude: 124.6419,
      address: "Carmen, Cagayan de Oro City",
      phone: "(088) 858-1404",
      landline: "xxx-xxx-xxx",
      mobile: "09xxxxxxxxx",
      email: "ps2@gmail.com",
      officer: "P/Capt. Maria Santos",
    },
    {
      id: 3,
      name: "Police Station 3 (Lapasan)",
      latitude: 8.5089,
      longitude: 124.6247,
      address: "Lapasan, Cagayan de Oro City",
      phone: "(088) 858-1405",
      landline: "xxx-xxx-xxx",
      mobile: "09xxxxxxxxx",
      email: "ps3@gmail.com",
      officer: "P/Capt. Pedro Reyes",
    },
    {
      id: 4,
      name: "Police Station 4 (Nazareth)",
      latitude: 8.4589,
      longitude: 124.6278,
      address: "Nazareth, Cagayan de Oro City",
      phone: "(088) 858-1406",
      landline: "xxx-xxx-xxx",
      mobile: "09xxxxxxxxx",
      email: "ps4@gmail.com",
      officer: "P/Capt. Rosa Garcia",
    },
    {
      id: 5,
      name: "Police Station 5 (Gusa)",
      latitude: 8.4831,
      longitude: 124.6108,
      address: "Gusa, Cagayan de Oro City",
      phone: "(088) 858-1407",
      landline: "xxx-xxx-xxx",
      mobile: "09xxxxxxxxx",
      email: "ps5@gmail.com",
      officer: "P/Capt. Carlos Mendoza",
    },
    {
      id: 6,
      name: "Police Station 6 (Kauswagan)",
      latitude: 8.4503,
      longitude: 124.6186,
      address: "Kauswagan, Cagayan de Oro City",
      phone: "(088) 858-1408",
      landline: "xxx-xxx-xxx",
      mobile: "09xxxxxxxxx",
      email: "ps6@gmail.com",
      officer: "P/Capt. Ana Lopez",
    },
    {
      id: 7,
      name: "Police Station 7 (Bulua)",
      latitude: 8.517,
      longitude: 124.647,
      address: "Bulua, Cagayan de Oro City",
      phone: "(088) 858-1409",
      landline: "xxx-xxx-xxx",
      mobile: "09xxxxxxxxx",
      email: "ps7@gmail.com",
      officer: "P/Capt. Juan Dela Cruz",
    },
  ];

  const [nearestHelp, setNearestHelp] = useState(policeStations[6]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      findNearestStation();
    }
  }, [currentLocation]);

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
    if (!currentLocation) return;

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
    Alert.alert("Emergency Call", `Call ${nearestHelp.name} now?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Call Now",
        onPress: () => {
          const phoneNumber = nearestHelp.phone.replace(/[^0-9]/g, "");
          Linking.openURL(`tel:${phoneNumber}`);
        },
      },
    ]);
  };

  const handleSendMessage = () => {
    const phoneNumber = nearestHelp.phone.replace(/[^0-9]/g, "");
    Linking.openURL(`sms:${phoneNumber}`);
  };

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${nearestHelp.latitude},${nearestHelp.longitude}`;
    Linking.openURL(url);
  };

  const handleChangeLocation = () => {
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

  if (loading || !currentLocation) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#DC2626" />
          <Text className="mt-4 text-gray-600 text-base">
            Finding nearest help...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const routeCoordinates = [currentLocation, nearestHelp];

  const services = [
    { icon: FileText, label: "Report Filing", color: "#2563EB" },
    { icon: Search, label: "Investigation", color: "#2563EB" },
    { icon: Car, label: "Patrol", color: "#2563EB" },
    { icon: Users, label: "Community Pr.", color: "#2563EB" },
  ];

  return (
    <SafeAreaView
      className="flex-1"
      edges={["left", "right"]}
      style={{ backgroundColor: bgColor }}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <GradientHeader title="Nearest Help" onBack={() => console.log("Back")} />
      <ScrollView className="flex-1">
        {/* Map Section */}
        <View className="h-96">
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

            <Marker
              coordinate={nearestHelp}
              title={nearestHelp.name}
              description={nearestHelp.address}
            >
              <View className="items-center">
                <View className="bg-blue-900 w-14 h-14 rounded-full items-center justify-center shadow-lg border-4 border-white">
                  <Shield size={24} color="white" />
                </View>
              </View>
            </Marker>

            <Polyline
              coordinates={routeCoordinates}
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
              className="w-12 h-12 items-center justify-center mr-2"
              style={{
                backgroundColor: "#ffffff",
                borderWidth: 1,
                borderColor: "#808080",
                borderRadius: 8,
              }}
              activeOpacity={0.6}
            >
              <MessageSquare size={22} color="#000000" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleEmergencyCall}
              className="w-12 h-12 items-center justify-center"
              style={{
                backgroundColor: "#ffffff",
                borderWidth: 1,
                borderColor: "#808080",
                borderRadius: 8,
              }}
              activeOpacity={0.6}
            >
              <Phone size={22} color="#000000" />
            </TouchableOpacity>
          </View>

          {/* Trip Details */}
          <View className="space-y-3 mb-5">
            <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
              <View className="flex-row items-center">
                <Clock size={22} color="#6B7280" />
                <Text className="ml-3 text-gray-700 text-base">
                  Estimated time
                </Text>
              </View>
              <Text className="font-bold text-gray-900 text-base">
                {estimatedTime ? `${estimatedTime}mins` : "Calculating..."}
              </Text>
            </View>

            <View className="flex-row items-center justify-between py-3">
              <View className="flex-row items-center">
                <MapPin size={22} color="#6B7280" />
                <Text className="ml-3 text-gray-700 text-base">Distance</Text>
              </View>
              <Text className="font-semibold text-gray-900 text-base">
                {distance ? `${distance}km` : "Calculating..."}
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
              Change Station
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

      {/* More Details */}
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
                }}
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl"
              >
                {/* Modal Header */}
                <View className="flex-row items-center justify-between px-6 pt-6 pb-20">
                  <TouchableOpacity
                    onPress={closeDetailsModal}
                    className="absolute left-6 top-6 w-10 h-10 items-center justify-center"
                  >
                    <X size={24} color="#000" />
                  </TouchableOpacity>
                </View>

                {/* Vertical Scroll */}
                <ScrollView
                  nestedScrollEnabled={true} // Enable nested scroll for Android
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{ paddingBottom: 20 }}
                  overScrollMode="never"
                >
                  {/* Top Info Row */}
                  <View className="flex-row items-center px-6 mb-4">
                    <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mr-3">
                      <View className="w-14 h-14 bg-blue-900 rounded-full items-center justify-center">
                        <Shield size={28} color="white" />
                      </View>
                    </View>
                    <View className="flex-1">
                      <Text className="text-sg font-bold text-gray-900 mb-1">
                        {nearestHelp.name}
                      </Text>
                      <Text className="text-sm font-semibold text-gray-700">
                        {nearestHelp.address}
                      </Text>
                    </View>
                    <TouchableOpacity className="p-2 border border-gray-300 rounded-lg mr-2">
                      <Phone size={20} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 border border-gray-300 rounded-lg">
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
                    <View className="mr-4 items-center justify-between">
                      <View className="w-1 bg-gray-100 flex-1 relative">
                        <View className="absolute top-2 -translate-y-1/2 w-6 h-6 bg-gray-100 rounded-full left-1/2 -translate-x-1/2" />
                        <View className="absolute bottom-2 translate-y-1/2 w-6 h-6 bg-gray-100 rounded-full left-1/2 -translate-x-1/2" />
                      </View>
                    </View>

                    <View className="flex-1">
                      <Text className="text-sm text-black mb-2 font-semibold">
                        {nearestHelp.name}
                      </Text>
                      <Text className="text-sm text-black mb-2 font-semibold">
                        Contact Information
                      </Text>
                      <View className="mt-2 space-y-1">
                        <Text className="text-sm font-bold text-black">
                          Landline: {nearestHelp.landline}
                        </Text>
                        <Text className="text-sm font-bold text-black">
                          Mobile: {nearestHelp.mobile}
                        </Text>
                        <Text className="text-sm font-bold text-black">
                          Email: {nearestHelp.email}
                        </Text>
                        <Text className="text-lg text-black mt-4 font-bold">
                          Officer-in-Charge: {nearestHelp.officer}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Distance */}
                  <View className="flex-row items-center px-6 py-3 border-gray-200">
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
                      contentContainerStyle={{ paddingHorizontal: 16 }}
                      overScrollMode="never"
                      keyboardShouldPersistTaps="handled"
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
                            className="w-24 items-center bg-gray-100 rounded-2xl p-3 mr-4"
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
