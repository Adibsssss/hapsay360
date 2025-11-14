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
import { ChevronDown } from "lucide-react-native";
import BottomNav from "./components/bottomnav";
import GradientHeader from "./components/GradientHeader";

const defaultAddresses = ["Home - 123 Main St, Springfield"];
const otherAddresses = [
  "Work - 456 Office Rd, Springfield",
  "Parents - 789 Elm St, Shelbyville",
  "Vacation House - 12 Palm Grove, Miami",
];

export default function Addresses() {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState("");
  const [showDefaultDropdown, setShowDefaultDropdown] = useState(false);

  const handleAddAddress = () => {
    if (!selectedAddress) {
      Alert.alert(
        "Missing Information",
        "Please select a default address first."
      );
      return;
    }
    router.push("/addaddress");
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["left", "right"]}>
      <StatusBar barStyle="light-content" />

      {/* Reusable Gradient Header */}
      <GradientHeader title="Address" onBack={() => router.back()} />

      {/* Address Section */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Default Address */}
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
              className={selectedAddress ? "text-gray-900" : "text-gray-400"}
            >
              {selectedAddress || "Select default address"}
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

        {/* Other Addresses */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium text-sm mb-3">
            Other Addresses
          </Text>

          {otherAddresses.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="border border-gray-200 rounded-xl p-4 mb-3"
              style={{ backgroundColor: "#DEEBF8" }}
              activeOpacity={0.7}
              onPress={() => {
                if (!selectedAddress) {
                  Alert.alert(
                    "Default Address Required",
                    "Please select a default address first."
                  );
                  return;
                }
                router.push({
                  pathname: "/addaddress",
                  params: { method: item },
                });
              }}
            >
              <Text className="text-gray-900 text-base">{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add Address Button */}
        <TouchableOpacity
          className="bg-indigo-600 mt-4 mb-10 px-8 py-3 rounded-xl"
          onPress={handleAddAddress}
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold text-base text-center">
            Add Address
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav activeRoute="/(tabs)/profile" />

      {/* Default Address Dropdown */}
      <Modal visible={showDefaultDropdown} transparent animationType="fade">
        <Pressable
          className="flex-1 bg-black/50 justify-center items-center"
          onPress={() => setShowDefaultDropdown(false)}
        >
          <View className="bg-white rounded-2xl w-4/5 max-h-96 overflow-hidden">
            <ScrollView>
              {defaultAddresses.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="p-4 border-b border-gray-100 active:bg-gray-50"
                  onPress={() => {
                    setSelectedAddress(item);
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
