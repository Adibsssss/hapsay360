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
import { Home, Calendar, FileText, Grid, User } from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import BottomNav from "./components/bottomnav";
import GradientHeader from "./components/GradientHeader";

export default function BookPoliceClearanceScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? "#1a1f4d" : "#ffffff";
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("sophiacarter@gmail.com");
  const [birthday, setBirthday] = useState("01/10/2004");
  const [sex, setSex] = useState("Female");
  const [address, setAddress] = useState("Baliuag, Cagayan de Oro City");

  const handleToggleEdit = () => {
    if (isEditing) {
      console.log("Saved:", { email, birthday, sex, address });
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
      {/* Reusable Gradient Header */}
      <GradientHeader title="Book Appointment" onBack={() => router.back()} />

      <ScrollView className="flex-1 bg-white">
        {/* Profile Section */}
        <View className="items-center pt-10 pb-4">
          <View className="w-36 h-36 rounded-full overflow-hidden mb-3">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
              }}
              className="w-full h-full"
            />
          </View>
          <Text className="text-gray-900 text-xl font-semibold">
            Sophia Carter
          </Text>
        </View>

        {/* Editable Info Fields arranged label-left, box-right */}
        <View className="px-6 py-4 rounded-2xl mt-2">
          {/* Email row */}
          <View className="flex-row items-center mb-3">
            <Text className="w-28 text-gray-700 text-sm font-medium text-left">
              Email:
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              editable={isEditing}
              placeholder="Email"
              keyboardType="email-address"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-base text-gray-900"
              style={{ backgroundColor: "#DEEBF8" }}
            />
          </View>

          {/* Birthday row */}
          <View className="flex-row items-center mb-3">
            <Text className="w-28 text-gray-700 text-sm font-medium text-left">
              Birthday:
            </Text>
            <TextInput
              value={birthday}
              onChangeText={setBirthday}
              editable={isEditing}
              placeholder="MM/DD/YYYY"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-base text-gray-900"
              style={{ backgroundColor: "#DEEBF8" }}
            />
          </View>

          {/* Sex row */}
          <View className="flex-row items-center mb-3">
            <Text className="w-28 text-gray-700 text-sm font-medium text-left">
              Sex:
            </Text>
            <TextInput
              value={sex}
              onChangeText={setSex}
              editable={isEditing}
              placeholder="Sex"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-base text-gray-900"
              style={{ backgroundColor: "#DEEBF8" }}
            />
          </View>

          {/* Address row */}
          <View className="flex-row items-start">
            <Text className="w-28 text-gray-700 text-sm font-medium text-left mt-2">
              Address:
            </Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              editable={isEditing}
              placeholder="Address"
              multiline
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-base text-gray-900"
              style={{ backgroundColor: "#DEEBF8" }}
            />
          </View>
        </View>

        {/* Action Buttons - spaced vertically */}
        <View className="mt-6 mb-8 px-6">
          <TouchableOpacity
            onPress={handleToggleEdit}
            style={{ backgroundColor: "#3234AB", marginBottom: 16 }}
            className="rounded-lg py-4 items-center"
          >
            <Text className="text-white font-semibold text-base">
              {isEditing ? "Save" : "Edit profile"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/bookpoliceclearance")}
            style={{ backgroundColor: "#3234AB", marginBottom: 16 }}
            className="rounded-lg py-4 items-center"
          >
            <Text className="text-white font-semibold text-base">
              Clearance application
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/myappointments")}
            style={{ backgroundColor: "#3234AB" }}
            className="rounded-lg py-4 items-center"
          >
            <Text className="text-white font-semibold text-base">
              Transactions
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav activeRoute="/(tabs)/clearance" />
    </SafeAreaView>
  );
}
