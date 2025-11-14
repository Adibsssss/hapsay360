import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  useColorScheme,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import GradientHeader from "./components/GradientHeader";

export default function NewPassword() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? "#1a1f4d" : "#ffffff";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidLength = newPassword.length >= 8;
  const canContinue =
    isValidLength &&
    confirmPassword.length >= 8 &&
    newPassword === confirmPassword;

  const handleContinue = () => {
    if (!canContinue) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/myaccount");
    }, 1000);
  };

  return (
    <SafeAreaView
      className="flex-1"
      edges={["left", "right"]}
      style={{ backgroundColor: bgColor }}
    >
      <StatusBar barStyle="light-content" />
      <GradientHeader title="Change Password" onBack={() => router.back()} />

      <ScrollView className="flex-1 bg-white">
        <View className="px-6 py-6 rounded-2xl mt-2">
          {/* Title */}
          <Text className="text-4xl font-bold text-gray-900">Forgot your</Text>
          <Text className="text-4xl font-bold text-gray-900 mb-3">
            password
          </Text>

          {/* Subtitle */}
          <Text className="text-base text-gray-600 mb-8">
            Enter a new password and try not to forget it.
          </Text>

          {/* New Password */}
          <View className="mb-4">
            <Text className="text-gray-700 text-sm font-medium mb-1">
              New Password
            </Text>
            <View
              className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2"
              style={{ backgroundColor: "#DEEBF8" }}
            >
              <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                secureTextEntry={!showNew}
                className="flex-1 text-base text-gray-900"
              />
              <TouchableOpacity onPress={() => setShowNew(!showNew)}>
                <Ionicons
                  name={showNew ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#374151"
                />
              </TouchableOpacity>
            </View>

            {/* Always visible instruction */}
            <Text
              className={`text-sm mt-2 ${
                isValidLength ? "text-green-600" : "text-gray-500"
              }`}
            >
              {isValidLength
                ? "✅ Good! Your password meets the requirement."
                : "Your password must be at least 8 characters long."}
            </Text>
          </View>

          {/* Confirm Password */}
          <View className="mb-6">
            <Text className="text-gray-700 text-sm font-medium mb-1">
              Confirm Password
            </Text>
            <View
              className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2"
              style={{ backgroundColor: "#DEEBF8" }}
            >
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
                secureTextEntry={!showConfirm}
                className="flex-1 text-base text-gray-900"
              />
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                <Ionicons
                  name={showConfirm ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#374151"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            disabled={!canContinue || isLoading}
            onPress={handleContinue}
            style={{
              backgroundColor: canContinue ? "#3234AB" : "#A5A6F6",
              borderRadius: 9999,
            }}
            className="py-4 items-center"
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold text-base">
                Continue
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
