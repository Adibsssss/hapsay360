import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Home, FileText, User } from "lucide-react-native";
import GradientHeader from "./components/GradientHeader";
import BottomNav from "./components/bottomnav";

export default function MyAppointments() {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["left", "right"]}>
      <StatusBar barStyle="light-content" />

      {/* Reusable Gradient Header */}
      <GradientHeader title="My Appointments" onBack={() => router.back()} />

      {/* Main Content */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* ✅ Police Clearance Expandable Card */}
        <View className="border border-gray-200 rounded-2xl overflow-hidden mt-4 mb-8 shadow-sm bg-white">
          <View className="p-5">
            <Text className="text-lg font-bold text-gray-900 mb-3">
              Police Clearance
            </Text>
            <Text className="text-gray-900 font-medium text-base mb-1">
              10/15/2025 Thursday
            </Text>
            <Text className="text-gray-600 text-sm mb-4">
              PS 7 Bulua, Cagayan de Oro City
            </Text>

            {/* Check Details Button */}
            <TouchableOpacity
              onPress={() => setExpanded(!expanded)}
              activeOpacity={0.8}
              className="bg-indigo-600 py-3 rounded-xl mt-2"
            >
              <Text className="text-white text-center font-semibold text-base">
                {expanded ? "Hide Details" : "Check Details"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* 👇 Expandable Details Section */}
          {expanded && (
            <>
              <View className="h-px bg-gray-200" />
              <View className="p-5 bg-white">
                <Text className="text-lg font-bold text-gray-900 mb-3">
                  Appointment Details
                </Text>
                <Text className="text-gray-900 font-medium text-base mb-1">
                  10/15/2025 Thursday
                </Text>
                <Text className="text-gray-900 font-medium text-base mb-2">
                  1:30 P.M
                </Text>
                <Text className="text-gray-600 text-sm">
                  PS 7 Bulua, Cagayan de Oro City
                </Text>
              </View>

              <View className="h-px bg-gray-200" />

              <View className="p-5 bg-white">
                <Text className="text-lg font-bold text-gray-900 mb-4">
                  Payment Details
                </Text>
                <View className="flex-row items-center mb-3">
                  <View className="flex-row space-x-1 mr-2">
                    <View className="w-3 h-3 bg-red-500 rounded-full" />
                    <View className="w-3 h-3 bg-orange-500 rounded-full -ml-1" />
                  </View>
                  <Text className="text-gray-900 font-medium">Mastercard</Text>
                </View>

                <View className="mb-2">
                  <Text className="text-gray-600 text-sm mb-1">
                    Card number
                  </Text>
                  <Text className="text-gray-900 font-medium text-base">
                    XXX XXX XXX 413
                  </Text>
                </View>

                {/* Change card details button */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowConfirmation(true)}
                >
                  <Text className="text-indigo-600 text-sm font-medium">
                    Change card details
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="h-px bg-gray-200" />

              <View className="p-5 bg-white">
                <Text className="text-gray-900 font-bold text-xl">₱250.00</Text>
                <Text className="text-gray-600 text-sm">1 Item</Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav activeRoute="/(tabs)/profile" />

      {/* Change Card Modal */}
      <Modal
        visible={showConfirmation}
        transparent
        animationType="slide"
        onRequestClose={() => setShowConfirmation(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white rounded-t-3xl p-6 items-center">
            <Text className="text-lg font-semibold mb-3">Change Card</Text>
            <Text className="text-gray-700 text-center mb-6">
              You can select a different payment method on the previous screen.
            </Text>
            <TouchableOpacity
              className="bg-indigo-600 px-8 py-3 rounded-xl"
              onPress={() => {
                setShowConfirmation(false);
                router.push("/policeclearancepayment");
              }}
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold text-base">Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
