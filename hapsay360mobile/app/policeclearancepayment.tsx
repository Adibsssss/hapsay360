import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  StatusBar,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Home, FileText, User } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function PoliceClearancePayment() {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState("mastercard");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const paymentMethods = [
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: require("../assets/images/cod.jpg"),
    },
    { id: "gcash", name: "Gcash", icon: require("../assets/images/gcash.jpg") },
    {
      id: "mastercard",
      name: "Mastercard",
      icon: require("../assets/images/mastercard.jpg"),
    },
    { id: "visa", name: "Visa", icon: require("../assets/images/visa.jpg") },
    {
      id: "paymaya",
      name: "Paymaya",
      icon: require("../assets/images/paymaya.jpg"),
    },
  ];

  const handleNext = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    router.push("/policeclearancesummary");
  };

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

          {/* Line between Step 1 → 2 (highlighted) */}
          <View
            className="flex-1 h-px mx-2"
            style={{
              marginTop: -20,
              backgroundColor: "#4F46E5", // Indigo line here
            }}
          />

          {/* Step 2 */}
          <View className="items-center" style={{ width: 70 }}>
            <View className="w-10 h-10 rounded-full bg-indigo-600 items-center justify-center mb-2">
              <Text className="text-white font-bold">2</Text>
            </View>
            <Text className="text-xs text-gray-900 font-semibold">Payment</Text>
          </View>

          {/* Line between Step 2 → 3 (gray) */}
          <View
            className="flex-1 h-px mx-2"
            style={{
              marginTop: -20,
              backgroundColor: "#D1D5DB", // gray line
            }}
          />

          {/* Step 3 */}
          <View className="items-center" style={{ width: 70 }}>
            <View className="w-10 h-10 rounded-full bg-gray-300 items-center justify-center mb-2">
              <Text className="text-white font-bold">3</Text>
            </View>
            <Text className="text-xs text-gray-500">Save</Text>
          </View>
        </View>
      </View>

      {/* Payment Methods */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <Text className="text-gray-700 font-medium text-sm mb-4">
          Select payment method
        </Text>

        <View className="space-y-3">
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              onPress={() => setSelectedPayment(method.id)}
              className="rounded-2xl p-4 flex-row items-center border"
              style={{
                backgroundColor:
                  selectedPayment === method.id ? "#E0E7FF" : "#F9FAFB",
                borderColor:
                  selectedPayment === method.id ? "#4F46E5" : "#E5E7EB",
              }}
              activeOpacity={0.7}
            >
              <View className="w-10 h-10 rounded-xl items-center justify-center mr-3 bg-white shadow-sm">
                <Image
                  source={method.icon}
                  style={{ width: 32, height: 32, resizeMode: "contain" }}
                />
              </View>
              <Text className="flex-1 text-base font-medium text-gray-900">
                {method.name}
              </Text>
              <View className="w-5 h-5 rounded-full border-2 border-gray-400 items-center justify-center">
                {selectedPayment === method.id && (
                  <View className="w-3 h-3 rounded-full bg-indigo-600" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity
          className="bg-indigo-600 rounded-xl py-4 items-center mt-10 mb-8"
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold text-base">Next</Text>
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

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmation}
        transparent
        animationType="slide"
        onRequestClose={() => setShowConfirmation(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white rounded-t-3xl p-6 items-center">
            <View className="items-center pb-2 mb-10">
              <View className="w-40 h-2 bg-gray-200 rounded-full" />
            </View>
            <Text className="text-lg font-semibold mb-3">Confirmation</Text>
            <Text className="text-gray-700 text-center mb-6">
              Selected payment method:{" "}
              <Text className="font-semibold text-indigo-700">
                {paymentMethods.find((m) => m.id === selectedPayment)?.name}
              </Text>
            </Text>
            <TouchableOpacity
              className="bg-indigo-600 px-8 py-3 mb-10 rounded-xl"
              onPress={handleConfirm}
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold text-base">
                Confirm and proceed
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
