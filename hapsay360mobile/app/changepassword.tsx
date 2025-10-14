import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  StatusBar,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import {
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  Shield,
  Navigation,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import BottomNav from "./components/bottomnav";
import GradientHeader from "./components/GradientHeader";

const NearestHelpScreen = () => {
  const router = useRouter();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState(null);

  const nearestHelp = {
    latitude: 8.517,
    longitude: 124.647,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
    name: "Police station 7",
    address: "Bulua, Cagayan de Oro City",
    distance: "2.5 km",
    phone: "(088) XXX-XXXX",
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

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
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
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
    Alert.alert("Emergency Call", "Call Police Station 7 now?", [
      { text: "Cancel", style: "cancel" },
      { text: "Call Now", onPress: () => console.log("Calling...") },
    ]);
  };

  const handleSendMessage = () => {
    Alert.alert("Send Message", "Opening chat with police station...");
  };

  const handleGetDirections = () => {
    Alert.alert("Navigation", "Opening directions to Police Station 7");
  };

  const handleChangeLocation = () => {
    Alert.alert("Change Location", "Search for help in a different area");
  };

  const handleMoreDetails = () => {
    Alert.alert(
      "Station Details",
      `Name: ${nearestHelp.name}\nAddress: ${nearestHelp.address}\nDistance: ${nearestHelp.distance}\nEstimated arrival: 30 mins`
    );
  };

  if (loading || !currentLocation) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#DC2626" />
        <Text className="mt-4 text-gray-600 text-base">
          Finding nearest help...
        </Text>
      </View>
    );
  }

  const routeCoordinates = [currentLocation, nearestHelp];

  return (
    <SafeAreaView
      className="flex-1 bg-gray-100"
      edges={["top", "left", "right"]}
    >
      <StatusBar barStyle="dark-content" />

      {/* Gradient Header */}
      <GradientHeader title="Nearest Help" onBack={() => router.back()} />

      <ScrollView className="flex-1">
        {/* Map Container */}
        <View className="h-80">
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion={region}
            showsUserLocation
            showsMyLocationButton
          >
            {/* Current Location Marker */}
            <Marker coordinate={currentLocation} title="You are here" />

            {/* Nearest Help Marker */}
            <Marker coordinate={nearestHelp} title={nearestHelp.name} />

            {/* Route Line */}
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#2563EB"
              strokeWidth={4}
            />
          </MapView>

          {/* Emergency Button */}
          <TouchableOpacity
            onPress={handleEmergencyCall}
            className="absolute top-4 left-4 bg-red-600 px-4 py-2 rounded-lg shadow"
          >
            <Text className="text-white font-bold text-sm">EMERGENCY</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Card */}
        <View className="bg-white rounded-t-3xl shadow-2xl px-6 py-6 mt-4">
          {/* Station Info */}
          <View className="flex-row items-center mb-6">
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
                {nearestHelp.distance} away
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleSendMessage}
              className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center mr-2"
            >
              <MessageSquare size={22} color="#374151" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleEmergencyCall}
              className="w-12 h-12 bg-red-100 rounded-full items-center justify-center"
            >
              <Phone size={22} color="#DC2626" />
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
              <Text className="font-bold text-gray-900 text-base">30mins</Text>
            </View>

            <View className="flex-row items-center justify-between py-3">
              <View className="flex-row items-center">
                <MapPin size={22} color="#6B7280" />
                <Text className="ml-3 text-gray-700 text-base">From</Text>
              </View>
              <Text className="font-semibold text-gray-900 text-base">
                Home
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity
            onPress={handleGetDirections}
            className="bg-blue-600 py-4 rounded-xl mb-3 flex-row items-center justify-center"
          >
            <Navigation size={20} color="white" />
            <Text className="text-white text-center font-bold text-base ml-2">
              Get Directions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleChangeLocation}
            className="bg-white border-2 border-blue-600 py-4 rounded-xl mb-3"
          >
            <Text className="text-blue-600 text-center font-bold text-base">
              Change Location
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleMoreDetails}
            className="bg-white border border-gray-200 py-4 rounded-xl"
          >
            <Text className="text-gray-900 text-center font-semibold text-base">
              More details
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Bottom Navigation */}
      <BottomNav activeRoute="/(tabs)/profile" />
    </SafeAreaView>
  );
};

export default NearestHelpScreen;
