import React, { useState } from "react";
import {
  View,
  Text,
  Image,
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

export default function MyAccount() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? "#1a1f4d" : "#ffffff";

  const [isEditing, setIsEditing] = useState(false);
  const [firstname, setFirstName] = useState("Sophia");
  const [lastname, setLastName] = useState("Carter");
  const [email, setEmail] = useState("sophiacarter@gmail.com");

  const handleToggleEdit = () => {
    if (isEditing) {
      console.log("Saved:", { firstname, lastname, email });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

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
          <Ionicons name="arrow-back" size={26} color="#ffffff" />
        </Pressable>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "600",
            letterSpacing: 0.5,
          }}
        >
          My Account
        </Text>
      </LinearGradient>

      <ScrollView className="flex-1 bg-white">
        {/* Profile Section */}
        <View className="items-center pt-10 pb-6">
          <View className="w-36 h-36 rounded-full overflow-hidden mb-3 shadow-md">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
              }}
              className="w-full h-full"
            />
          </View>
          <Text className="text-gray-900 text-xl font-semibold">
            {firstname} {lastname}
          </Text>
        </View>

        {/* Editable Info Fields */}
        <View className="px-6 py-4 rounded-2xl mt-2">
          {/* First Name */}
          <View className="mb-4">
            <Text className="text-gray-700 text-sm font-medium mb-1">
              First Name
            </Text>
            <TextInput
              value={firstname}
              onChangeText={setFirstName}
              editable={isEditing}
              placeholder="First Name"
              className="border border-gray-300 rounded-lg px-3 py-3 text-base text-gray-900"
              style={{
                backgroundColor: "#DEEBF8",
                opacity: isEditing ? 1 : 0.7,
              }}
            />
          </View>

          {/* Last Name */}
          <View className="mb-4">
            <Text className="text-gray-700 text-sm font-medium mb-1">
              Last Name
            </Text>
            <TextInput
              value={lastname}
              onChangeText={setLastName}
              editable={isEditing}
              placeholder="Last Name"
              className="border border-gray-300 rounded-lg px-3 py-3 text-base text-gray-900"
              style={{
                backgroundColor: "#DEEBF8",
                opacity: isEditing ? 1 : 0.7,
              }}
            />
          </View>

          {/* Email */}
          <View className="mb-4">
            <Text className="text-gray-700 text-sm font-medium mb-1">
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              editable={isEditing}
              placeholder="Email"
              keyboardType="email-address"
              className="border border-gray-300 rounded-lg px-3 py-3 text-base text-gray-900"
              style={{
                backgroundColor: "#DEEBF8",
                opacity: isEditing ? 1 : 0.7,
              }}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View className="mt-6 mb-8 px-6">
          {/* Edit / Save Button */}
          <TouchableOpacity
            onPress={handleToggleEdit}
            style={{ backgroundColor: "#3234AB", marginBottom: 16 }}
            className="rounded-lg py-4 items-center"
          >
            <Text className="text-white font-semibold text-base">
              {isEditing ? "Save" : "Edit Profile"}
            </Text>
          </TouchableOpacity>

          {/* Change Password */}
          <TouchableOpacity
            onPress={() => router.push("/changepassword")}
            style={{ backgroundColor: "#3234AB" }}
            className="rounded-lg py-4 items-center"
          >
            <Text className="text-white font-semibold text-base">
              Change Password
            </Text>
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
