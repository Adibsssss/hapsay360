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
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Home, Calendar, FileText, User } from "lucide-react-native";

export default function PoliceClearanceSummary() {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);

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
          paddingBottom: 16,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          className="mr-4"
          style={{ padding: 4 }}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
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

      {/* Stepper */}
      <View className="bg-white px-6 py-5">
        <View className="flex-row items-center justify-between">
          {/* Step 1 */}
          <View className="items-center" style={{ width: 70 }}>
            <View className="w-10 h-10 rounded-full bg-gray-300 items-center justify-center mb-2">
              <Text className="text-white font-bold">1</Text>
            </View>
            <Text className="text-xs text-gray-500">Book date</Text>
          </View>

          {/* Line between 1 and 2 */}
          <View
            className="flex-1 h-px bg-gray-300 mx-2"
            style={{ marginTop: -20 }}
          />

          {/* Step 2 */}
          <View className="items-center" style={{ width: 70 }}>
            <View className="w-10 h-10 rounded-full bg-gray-300 items-center justify-center mb-2">
              <Text className="text-white font-bold">2</Text>
            </View>
            <Text className="text-xs text-gray-500">Payment</Text>
          </View>

          {/* Active line between 2 and 3 */}
          <View
            className="flex-1 h-px bg-indigo-600 mx-2"
            style={{ marginTop: -20 }}
          />

          {/* Step 3 */}
          <View className="items-center" style={{ width: 70 }}>
            <View className="w-10 h-10 rounded-full bg-indigo-600 items-center justify-center mb-2">
              <Text className="text-white font-bold">3</Text>
            </View>
            <Text className="text-xs text-gray-900 font-semibold">Save</Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="border border-gray-200 rounded-2xl overflow-hidden mt-2 mb-8 shadow-sm">
          {/* Appointment Details */}
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

          {/* Payment Details */}
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
              <Text className="text-gray-600 text-sm mb-1">Card number</Text>
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

          {/* Total Section */}
          <View className="p-5 bg-white">
            <Text className="text-gray-900 font-bold text-xl">₱250.00</Text>
            <Text className="text-gray-600 text-sm">1 Item</Text>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          className="bg-indigo-600 rounded-xl py-4 items-center mb-8"
          activeOpacity={0.8}
          onPress={() => router.push("/policeclearanceconfirmation")}
        >
          <Text className="text-white font-semibold text-base">
            Save Appointment
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="bg-white border-t border-gray-200 flex-row justify-around py-3">
        <TouchableOpacity className="items-center">
          <Home size={24} color="#9CA3AF" />
          <Text className="text-xs text-indigo-900 mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <FileText size={24} color="#9CA3AF" />
          <Text className="text-xs text-gray-500 mt-1">Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <FileText size={24} color="#312E81" />
          <Text className="text-xs text-gray-500 mt-1">Clearance</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <User size={24} color="#9CA3AF" />
          <Text className="text-xs text-gray-500 mt-1">Profile</Text>
        </TouchableOpacity>
      </View>

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
