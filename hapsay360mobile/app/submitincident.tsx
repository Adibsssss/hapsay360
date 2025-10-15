import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import GradientHeader from "./components/GradientHeader";

export default function SubmitIncident() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { incidentType, date, time, description, stationName } = params;

  const handleConfirm = () => {
    alert("Incident Submitted!");
    router.push("/blotterconfirmation");
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["left", "right"]}>
      <GradientHeader title="File Blotter" onBack={() => router.back()} />

      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 16 }}
      >
        {/* Single Card with All Info */}
        <View className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Blotter Details Header */}
          <View className="p-5 items-center bg-gray-50">
            <Text className="text-2xl font-bold text-gray-900">
              Blotter Details
            </Text>
          </View>

          <View className="h-px bg-gray-200" />

          {/* Reporter Info */}
          <View className="p-5 items-center">
            <Text className="text-lg font-bold text-gray-900 mb-1">
              Reporter Info
            </Text>
            {/* Name is now big */}
            <Text className="text-2xl text-gray-900 mb-1">John Doe</Text>
            <Text className="text-gray-900 mb-1">0917-123-4567</Text>
            <Text className="text-gray-900">Lapasan, CDO</Text>
          </View>

          <View className="h-px bg-gray-200" />

          {/* Incident Details */}
          <View className="p-5 items-center">
            <Text className="text-xl font-bold text-gray-900 mb-4 text-center">
              Incident Details
            </Text>
            <View className="w-full">
              <Text className="text-gray-900 mb-1">
                <Text className="font-bold">Incident Type: </Text>
                {incidentType} / Robbery
              </Text>
              <Text className="text-gray-900 mb-1">
                <Text className="font-bold">Date & Time: </Text>
                {date} - {time}
              </Text>
              <Text className="text-gray-900 mb-1">
                <Text className="font-bold">Location: </Text>Lapasan Bridge, CDO
              </Text>
              <Text className="text-gray-900">
                <Text className="font-bold">Description: </Text>
                {description}
              </Text>
            </View>
          </View>

          <View className="h-px bg-gray-200" />

          {/* Attachments */}
          <View className="p-5 items-center">
            <Text className="text-lg font-bold text-gray-900 mb-2 text-center">
              Attachments
            </Text>
            <TouchableOpacity onPress={() => router.push("/incidentdetails")}>
              <Text className="text-indigo-600 font-medium underline">
                View Uploaded Attachments
              </Text>
            </TouchableOpacity>
          </View>

          <View className="h-px bg-gray-200" />

          {/* Police Station Info */}
          <View className="p-5 items-center">
            <Text className="text-lg font-bold text-gray-900 mb-2 text-center">
              Location
            </Text>
            <View className="w-full">
              <Text className="text-gray-900 mb-1">
                <Text className="font-bold">Police Station: </Text>
                {stationName || "Agusan Police Station 10"}
              </Text>
              <Text className="text-gray-900">
                <Text className="font-bold">Contact: </Text>123-4567
              </Text>
            </View>
          </View>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity
          className="bg-indigo-600 rounded-xl py-4 items-center mt-6 mb-8"
          onPress={handleConfirm}
        >
          <Text className="text-white font-semibold text-base">
            Confirm Submission
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
