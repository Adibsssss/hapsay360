import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Clock,
  MapPin,
  CreditCard,
  Check,
} from "lucide-react-native";

export default function PoliceClearanceConfirmation() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["left", "right"]}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <LinearGradient
        colors={["#3b3b8a", "#141545"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          paddingHorizontal: 16,
          paddingTop: 55,
          paddingBottom: 18,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          className="mr-4"
          style={{ padding: 4 }}
          onPress={() => router.back()}
        >
          <ArrowLeft color="#ffffff" size={24} />
        </Pressable>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "600",
            letterSpacing: 0.5,
          }}
        >
          Book Appointment
        </Text>
      </LinearGradient>

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
            <Text className="text-sm text-gray-700 flex-1 ml-4">
              Police station
            </Text>
            <Text className="text-sm text-gray-900 font-medium">
              PS 7 Bulua, CDO
            </Text>
          </View>

          <View className="flex-row items-center">
            <CreditCard color="#4b5563" size={20} />
            <Text className="text-sm text-gray-700 flex-1 ml-4">
              Amount paid
            </Text>
            <Text className="text-sm text-gray-900 font-medium">₱250.00</Text>
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
            onPress={() => router.push("/bookpoliceclearancescreen")}
          >
            <Text className="text-indigo-700 font-semibold text-base">
              Check appointments
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
