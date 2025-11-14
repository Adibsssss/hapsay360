import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  useColorScheme,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import GradientHeader from "./components/GradientHeader";

export default function ReportetInfo() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? "#1a1f4d" : "#ffffff";

  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleNext = () => {
    if (!fullName || !contactNumber || !address) {
      alert("Please fill out all fields before proceeding.");
      return;
    }
    router.push("/incidentdetails");
  };

  return (
    <SafeAreaView
      className="flex-1"
      edges={["left", "right"]}
      style={{ backgroundColor: bgColor }}
    >
      <StatusBar barStyle="light-content" />

      {/* Reusable Gradient Header */}
      <GradientHeader title="File Blotter" onBack={() => router.back()} />

      <ScrollView className="flex-1 bg-white">
        {/* Title */}
        <View className="items-center pt-4 pb-6">
          <Text className="text-blue-900 text-3xl font-bold">
            Reporters Information
          </Text>
        </View>

        {/* Editable Info Fields */}
        <View className="px-6 py-4 rounded-2xl mt-2">
          {/* Full Name */}
          <View className="mb-4">
            <Text className="text-gray-700 text-sm font-medium mb-1">
              Full Name
            </Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              className="border border-gray-300 rounded-lg px-3 py-3 text-base text-gray-900"
              style={{ backgroundColor: "#DEEBF8" }}
            />
          </View>

          {/* Contact Number */}
          <View className="mb-4">
            <Text className="text-gray-700 text-sm font-medium mb-1">
              Contact Number
            </Text>
            <TextInput
              value={contactNumber}
              onChangeText={setContactNumber}
              placeholder="Enter your contact number"
              keyboardType="phone-pad"
              className="border border-gray-300 rounded-lg px-3 py-3 text-base text-gray-900"
              style={{ backgroundColor: "#DEEBF8" }}
            />
          </View>

          {/* Home Address */}
          <View className="mb-4">
            <Text className="text-gray-700 text-sm font-medium mb-1">
              Home Address
            </Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder="Enter your address"
              multiline
              className="border border-gray-300 rounded-lg px-3 py-3 text-base text-gray-900"
              style={{ backgroundColor: "#DEEBF8" }}
            />
          </View>

          {/*Next Button */}
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.8}
            className="mt-6 bg-indigo-600 rounded-xl py-4"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
              elevation: 4,
            }}
          >
            <Text className="text-center text-white text-lg font-semibold">
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
