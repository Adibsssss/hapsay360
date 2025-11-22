import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import GradientHeader from "./components/GradientHeader";
import index from "./(tabs)/index";

export default function SubmitIncident() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const {
    blotterNumber,
    incidentType,
    date,
    time,
    description,
    location,
    stationName,
    reporterName,
    reporterContact,
    status,
  } = params;

  const handleConfirm = () => {
    router.push("/blotterconfirmation");
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["left", "right"]}>
      <GradientHeader
        title="Blotter Confirmation"
        onBack={() => router.back()}
      />

      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 16 }}
      >
        {/* Details Card */}
        <View className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm mb-6">
          {/* Reporter Info */}
          <View className="p-5 bg-gray-50">
            <Text className="text-lg font-bold text-gray-900 mb-3">
              Reporter Information
            </Text>
            <View className="space-y-2">
              <View className="flex-row">
                <Text className="text-gray-600 w-24">Name:</Text>
                <Text className="text-gray-900 font-medium flex-1">
                  {reporterName || "N/A"}
                </Text>
              </View>
              <View className="flex-row">
                <Text className="text-gray-600 w-24">Contact:</Text>
                <Text className="text-gray-900 font-medium flex-1">
                  {reporterContact || "N/A"}
                </Text>
              </View>
              <View className="flex-row">
                <Text className="text-gray-600 w-24">Address:</Text>
                <Text className="text-gray-900 font-medium flex-1">
                  {location || "N/A"}
                </Text>
              </View>
            </View>
          </View>

          <View className="h-px bg-gray-200" />

          {/* Incident Details */}
          <View className="p-5">
            <Text className="text-lg font-bold text-gray-900 mb-3">
              Incident Details
            </Text>
            <View className="space-y-2">
              <View className="flex-row">
                <Text className="text-gray-600 w-24">Type:</Text>
                <Text className="text-gray-900 font-medium flex-1">
                  {incidentType || "N/A"}
                </Text>
              </View>
              <View className="flex-row">
                <Text className="text-gray-600 w-24">Date:</Text>
                <Text className="text-gray-900 font-medium flex-1">
                  {date || "N/A"}
                </Text>
              </View>
              <View className="flex-row">
                <Text className="text-gray-600 w-24">Time:</Text>
                <Text className="text-gray-900 font-medium flex-1">
                  {time || "N/A"}
                </Text>
              </View>
              <View className="flex-row">
                <Text className="text-gray-600 w-24">Location:</Text>
                <Text className="text-gray-900 font-medium flex-1">
                  {location || "N/A"}
                </Text>
              </View>
              <View className="mt-2">
                <Text className="text-gray-600 mb-1">Description:</Text>
                <Text className="text-gray-900">{description || "N/A"}</Text>
              </View>
            </View>
          </View>

          <View className="h-px bg-gray-200" />

          {/* Police Station Info */}
          <View className="p-5 bg-gray-50">
            <Text className="text-lg font-bold text-gray-900 mb-3">
              Assigned Police Station
            </Text>
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-blue-900 rounded-full items-center justify-center mr-3">
                <Text className="text-white font-bold">🛡️</Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 font-semibold">
                  {stationName || "N/A"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View>
          <TouchableOpacity
            className="bg-indigo-600 rounded-xl py-4 items-center mb-3"
            onPress={handleConfirm}
          >
            <Text className="text-white font-semibold text-base">Done</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white border-2 border-indigo-600 rounded-xl py-4 items-center mb-3"
            onPress={() => router.push("/myappointments")}
          >
            <Text className="text-indigo-600 font-semibold text-base">
              Track My Blotter
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white border border-gray-300 rounded-xl py-4 items-center"
            onPress={() => router.push("/(tabs)")}
          >
            <Text className="text-gray-700 font-semibold text-base">
              Return to Home
            </Text>
          </TouchableOpacity>
        </View>

        {/* Help Text */}
        <View className="mt-8 p-4 bg-blue-50 rounded-lg">
          <Text className="text-blue-900 font-semibold mb-2">
            What happens next?
          </Text>
          <Text className="text-blue-800 text-sm">
            • Your blotter has been forwarded to{" "}
            {stationName || "the police station"}
            {"\n"}• You will be contacted if additional information is needed
            {"\n"}• Track your blotter status anytime using your blotter number
            {"\n"}• Keep your blotter number safe for future reference
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
