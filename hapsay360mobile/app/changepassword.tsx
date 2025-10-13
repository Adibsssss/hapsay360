import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  useColorScheme,
  TextInput,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Home, FileText, User } from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function ChangePassword() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? "#1a1f4d" : "#ffffff";

  // password states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // visibility toggles
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <SafeAreaView
      className="flex-1"
      edges={["left", "right"]}
      style={{ backgroundColor: bgColor }}
    >
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <LinearGradient
        colors={["#3b3b8a", "#141545"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          paddingHorizontal: 16,
          paddingTop: 55,
          paddingBottom: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          className="mr-4"
          onPress={() => router.back()}
          style={{ padding: 4 }}
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
          Change Password
        </Text>
      </LinearGradient>

      <ScrollView className="flex-1 bg-white">
        <View className="px-6 py-6 rounded-2xl mt-2">
          {/* Old Password */}
          <View className="mb-4">
            <Text className="text-gray-700 text-sm font-medium mb-1">
              Old Password
            </Text>
            <View
              className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2"
              style={{ backgroundColor: "#DEEBF8" }}
            >
              <TextInput
                value={oldPassword}
                onChangeText={setOldPassword}
                placeholder="Enter old password"
                secureTextEntry={!showOld}
                className="flex-1 text-base text-gray-900"
              />
              <TouchableOpacity onPress={() => setShowOld(!showOld)}>
                <Ionicons
                  name={showOld ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#374151"
                />
              </TouchableOpacity>
            </View>
          </View>

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

          {/* Save Button */}
          <TouchableOpacity
            onPress={() => router.push("/myaccount")}
            style={{ backgroundColor: "#3234AB" }}
            className="rounded-lg py-4 items-center"
          >
            <Text className="text-white font-semibold text-base">Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="bg-white border-t border-gray-200 flex-row justify-around py-6">
        <TouchableOpacity className="items-center">
          <Home size={24} color="#9CA3AF" />
          <Text className="text-xs text-indigo-900 mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <FileText size={24} color="#9CA3AF" />
          <Text className="text-xs text-gray-500 mt-1">Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <FileText size={24} color="#9CA3AF" />
          <Text className="text-xs text-gray-500 mt-1">Clearance</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <User size={24} color="#312E81" />
          <Text className="text-xs text-gray-500 mt-1">Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
