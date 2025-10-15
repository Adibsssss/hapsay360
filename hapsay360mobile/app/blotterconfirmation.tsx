import React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Check } from "lucide-react-native";
import { useRouter } from "expo-router";
import GradientHeader from "./components/GradientHeader";

export default function BlotterConfirmation() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["left", "right"]}>
      <StatusBar barStyle="light-content" />

      {/* Gradient Header */}
      <GradientHeader
        title="Blotter Confirmation"
        onBack={() => router.back()}
      />

      {/* Main Content */}
      <View className="flex-1 bg-white rounded-t-3xl px-7 py-12">
        {/* Success Icon */}
        <View className="w-24 h-24 bg-green-600 rounded-full items-center justify-center self-center mb-8 shadow-md">
          <Check color="white" size={44} strokeWidth={3} />
        </View>

        {/* Success Message */}
        <Text className="text-2xl font-bold text-gray-900 text-center mb-3 leading-snug">
          Success! Your blotter{"\n"}has been submitted!
        </Text>
        <Text className="text-sm text-gray-600 text-center mb-12">
          The police station will review your report. You will be contacted for
          any updates.
        </Text>

        {/* Blotter Submission Details */}
        <View className="space-y-6 mb-14">
          <View className="flex-row items-center mb-2">
            <Text className="text-sm text-gray-700 flex-1 ml-4">
              Submission Date
            </Text>
            <Text className="text-sm text-gray-900 font-medium">
              15 Oct 2025
            </Text>
          </View>

          <View className="flex-row items-center mb-2">
            <Text className="text-sm text-gray-700 flex-1 ml-4">
              Police Station
            </Text>
            <Text className="text-sm text-gray-900 font-medium">
              PS 7 Bulua, CDO
            </Text>
          </View>

          <View className="flex-row items-center">
            <Text className="text-sm text-gray-700 flex-1 ml-4">
              Reference Number
            </Text>
            <Text className="text-sm text-gray-900 font-medium">
              BLT-102345
            </Text>
          </View>
        </View>

        {/* Buttons */}
        <View className="space-y-4 mt-auto mb-10">
          <TouchableOpacity
            className="w-full bg-indigo-600 py-4 rounded-xl mb-4 items-center"
            activeOpacity={0.8}
            onPress={() => router.push("/(tabs)")}
          >
            <Text className="text-white font-semibold text-base">
              Back to home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full bg-indigo-50 py-4 rounded-xl items-center border border-indigo-200"
            activeOpacity={0.8}
            onPress={() => router.push("/submitincident")}
          >
            <Text className="text-indigo-700 font-semibold text-base">
              View submitted blotters
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
