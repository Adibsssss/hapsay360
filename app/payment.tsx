import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  StatusBar,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ChevronDown, Home, Search, FileText, User } from "lucide-react-native";
import GradientHeader from "./components/GradientHeader";
import BottomNav from "./components/bottomnav";

const defaultPayment = ["Mastercard - Sophia Carter"];

const otherPayments = [
  "Visa - Sophia Carter",
  "PayPal - Sophia Carter",
  "Gcash - Sophia Carter",
  "Cash on Delivery (COD)",
];

export default function Payments() {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState("");
  const [showDefaultDropdown, setShowDefaultDropdown] = useState(false);

  const handleAddPayment = () => {
    if (!selectedPayment) {
      Alert.alert(
        "Missing Information",
        "Please select a default payment first."
      );
      return;
    }
    router.push("/addpayment");
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["left", "right"]}>
      <StatusBar barStyle="light-content" />

      {/* Reusable Gradient Header */}
      <GradientHeader title="Payment" onBack={() => router.back()} />

      {/* Payment Section */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Default Payment */}
        <View className="mb-4 mt-2">
          <Text className="text-gray-700 font-medium text-sm mb-2 mt-2">
            Default
          </Text>
          <TouchableOpacity
            className="border border-gray-200 rounded-xl p-4 flex-row justify-between items-center"
            style={{ backgroundColor: "#DEEBF8" }}
            onPress={() => setShowDefaultDropdown(true)}
            activeOpacity={0.7}
          >
            <Text
              className={selectedPayment ? "text-gray-900" : "text-gray-400"}
            >
              {selectedPayment || "Select default payment"}
            </Text>
            <ChevronDown size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Separator Line */}
        <View
          style={{
            height: 1,
            backgroundColor: "#E5E7EB",
            marginBottom: 30,
            marginTop: 10,
          }}
        />

        {/* Other Payment Methods (Individual Boxes) */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium text-sm mb-3">
            Other Payment Methods
          </Text>

          {otherPayments.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="border border-gray-200 rounded-xl p-4 mb-3"
              style={{ backgroundColor: "#DEEBF8" }}
              activeOpacity={0.7}
              onPress={() => {
                if (!selectedPayment) {
                  Alert.alert(
                    "Default Payment Required",
                    "Please select a default payment first."
                  );
                  return;
                }
                router.push({
                  pathname: "/addpayment",
                  params: { method: item },
                });
              }}
            >
              <Text className="text-gray-900 text-base">{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add Payment Button */}
        <TouchableOpacity
          className="bg-indigo-600 mt-4 mb-10 px-8 py-3 rounded-xl"
          onPress={handleAddPayment}
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold text-base text-center">
            Add Payment Method
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav activeRoute="/(tabs)/profile" />

      {/* Default Payment Dropdown */}
      <Modal visible={showDefaultDropdown} transparent animationType="fade">
        <Pressable
          className="flex-1 bg-black/50 justify-center items-center"
          onPress={() => setShowDefaultDropdown(false)}
        >
          <View className="bg-white rounded-2xl w-4/5 max-h-96 overflow-hidden">
            <ScrollView>
              {defaultPayment.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="p-4 border-b border-gray-100 active:bg-gray-50"
                  onPress={() => {
                    setSelectedPayment(item);
                    setShowDefaultDropdown(false);
                  }}
                >
                  <Text className="text-gray-900 text-base">{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
