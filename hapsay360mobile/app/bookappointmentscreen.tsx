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
import { Home, Calendar, Grid, User } from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function BookAppointmentScreen() {
  const router = useRouter();
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
          Book Appointment
        </Text>
      </LinearGradient>

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
      <View className="bg-white border-t border-gray-200 flex-row justify-around py-3">
        <TouchableOpacity className="items-center flex-1">
          <Home color="#9CA3AF" size={24} />
          <Text className="text-gray-400 text-xs mt-1">Home</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center flex-1">
          <Calendar color="#9CA3AF" size={24} />
          <Text className="text-gray-400 text-xs mt-1">Reports</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center flex-1">
          <Grid color="#141545" size={24} />
          <Text className="text-[#141545] text-xs mt-1 font-semibold">
            Stories
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center flex-1">
          <User color="#9CA3AF" size={24} />
          <Text className="text-gray-400 text-xs mt-1">Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
