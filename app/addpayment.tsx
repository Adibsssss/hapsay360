import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import GradientHeader from "./components/GradientHeader";

export default function AddPayment() {
  const router = useRouter();
  const { method } = useLocalSearchParams();

  const [isDefault, setIsDefault] = useState(false);
  const [cardholder, setCardholder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleConfirm = () => {
    if (!cardholder || !cardNumber || !expiry || !cvv) {
      alert("Please fill in all fields.");
      return;
    }
    alert("Payment method saved successfully!");
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["left", "right"]}>
      <StatusBar barStyle="light-content" />

      {/* Reusable Gradient Header */}
      <GradientHeader title="Add Payment" onBack={() => router.back()} />

      <ScrollView className="flex-1 px-6 mt-4">
        <Text className="text-gray-700 mb-4 text-base">
          {method ? `Adding ${method}` : "Add a new payment method"}
        </Text>

        {/* Set as Default */}
        <View
          className="flex-row justify-between items-center mb-6 rounded-xl px-4 py-3"
          style={{ backgroundColor: "#DEEBF8" }}
        >
          <Text className="text-gray-900 font-medium text-base">
            Set as Default
          </Text>
          <Switch
            value={isDefault}
            onValueChange={setIsDefault}
            thumbColor={isDefault ? "#3b3b8a" : "#f4f3f4"}
            trackColor={{ false: "#d1d5db", true: "#a5b4fc" }}
          />
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

        {/* Cardholder Name */}
        <View className="mb-4">
          <Text className="text-gray-700 font-medium mb-2">
            Cardholder Name
          </Text>
          <TextInput
            className="border border-gray-300 rounded-xl p-3"
            style={{ backgroundColor: "#DEEBF8" }}
            placeholder="Enter cardholder name"
            value={cardholder}
            onChangeText={setCardholder}
          />
        </View>

        {/* Card Number */}
        <View className="mb-4">
          <Text className="text-gray-700 font-medium mb-2">Card Number</Text>
          <TextInput
            className="border border-gray-300 rounded-xl p-3"
            style={{ backgroundColor: "#DEEBF8" }}
            placeholder="Enter card number"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={setCardNumber}
          />
        </View>

        {/* Expiration Date */}
        <View className="mb-4">
          <Text className="text-gray-700 font-medium mb-2">
            Expiration Date
          </Text>
          <TextInput
            className="border border-gray-300 rounded-xl p-3"
            style={{ backgroundColor: "#DEEBF8" }}
            placeholder="MM/YY"
            keyboardType="numeric"
            value={expiry}
            onChangeText={setExpiry}
          />
        </View>

        {/* CVV */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">CVV</Text>
          <TextInput
            className="border border-gray-300 rounded-xl p-3"
            style={{ backgroundColor: "#DEEBF8" }}
            placeholder="***"
            keyboardType="numeric"
            secureTextEntry
            value={cvv}
            onChangeText={setCvv}
          />
        </View>

        {/* Confirm Button */}
        <TouchableOpacity
          className="bg-indigo-600 py-3 rounded-xl mb-10"
          onPress={handleConfirm}
          activeOpacity={0.8}
        >
          <Text className="text-white text-center font-semibold text-base">
            Confirm
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
