import React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Clock, MapPin, CreditCard, Check } from "lucide-react-native";
import GradientHeader from "./components/GradientHeader";

export default function PoliceClearanceConfirmation() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const policeStation = (params.policeStation as string) || "PS 7 Bulua, CDO";
  const amount = (params.amount as string) || "250.00";

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["left", "right"]}>
      <StatusBar barStyle="light-content" />

      <GradientHeader
        title="Appointment Confirmed"
        onBack={() => router.push("/(tabs)")}
      />

      {/* Main Content */}
      <View className="flex-1 bg-white rounded-t-3xl px-7 py-12">
        {/* Success Icon */}
        <View className="w-24 h-24 bg-green-600 rounded-full items-center justify-center self-center mb-8 shadow-md">
          <Check color="white" size={44} strokeWidth={3} />
        </View>

        {/* Success Message */}
        <Text className="text-2xl font-bold text-gray-900 text-center mb-3 leading-snug">
          Yay! Your appointment{"\n"}has been booked!
        </Text>
        <Text className="text-sm text-gray-600 text-center mb-12">
          An email will be sent with the appointment details.
        </Text>

        {/* Appointment Details */}
        <View className="space-y-6 mb-14">
          <View className="flex-row items-center mb-2">
            <Clock color="#4b5563" size={20} />
            <Text className="text-sm text-gray-700 flex-1 ml-4">
              Estimated time
            </Text>
            <Text className="text-sm text-gray-900 font-medium">
              2–3 business days
            </Text>
          </View>

          <View className="flex-row items-center mb-2">
            <MapPin color="#4b5563" size={20} />
            <Text className="text-sm text-gray-700 ml-4">Police station</Text>
            <Text
              className="text-sm text-gray-900 font-medium ml-2"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ flex: 1, textAlign: "right" }}
            >
              {policeStation.split(",")[0]}
            </Text>
          </View>

          <View className="flex-row items-center">
            <CreditCard color="#4b5563" size={20} />
            <Text className="text-sm text-gray-700 flex-1 ml-4">
              Amount paid
            </Text>
            <Text className="text-sm text-gray-900 font-medium">₱{amount}</Text>
          </View>
        </View>

        {/* Information Box */}
        <View className="bg-blue-50 p-4 rounded-xl mb-8 border border-blue-200">
          <Text className="text-blue-900 font-semibold mb-2 text-sm">
            What's Next?
          </Text>
          <Text className="text-blue-800 text-xs leading-5">
            • Check your email for appointment confirmation{"\n"}• Bring a valid
            ID on your appointment date{"\n"}• Arrive 15 minutes before your
            scheduled time{"\n"}• Your clearance will be ready after processing
          </Text>
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
            onPress={() => router.push("/myappointments")}
          >
            <Text className="text-indigo-700 font-semibold text-base">
              View my appointments
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
