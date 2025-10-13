import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ChevronRight = () => (
  <Ionicons name="chevron-forward-outline" size={20} color="#9ca3af" />
);

const MenuItem = ({ icon, title, onPress }) => (
  <TouchableOpacity
    className="flex-row items-center justify-between py-4 px-5 rounded-xl mb-3 mx-3 shadow-sm"
    style={{ backgroundColor: "#DEEBF8" }}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View className="flex-row items-center gap-3">
      <Ionicons name={icon} size={20} color="#374151" />
      <Text className="text-gray-800 text-base">{title}</Text>
    </View>
    <ChevronRight />
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["left", "right"]}>
      <StatusBar barStyle="dark-content" />

      {/* Gradient Header */}
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
          <Ionicons name="arrow-back-outline" size={26} color="#fff" />
        </Pressable>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "600",
            letterSpacing: 0.5,
          }}
        >
          Profile
        </Text>
      </LinearGradient>

      <ScrollView className="flex-1 bg-white">
        {/* Profile Card */}
        <View className="items-center pt-10 pb-4">
          <View className="w-36 h-36 rounded-full overflow-hidden mb-3 shadow-md">
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
          <Text className="text-blue-500 text-sm mt-1">Admin</Text>
        </View>

        {/* Menu Section */}
        <View className="mt-4 mx-2 bg-white rounded-2xl overflow-hidden">
          <Text className="text-gray-900 font-semibold text-base px-5 py-3">
            General
          </Text>

          <MenuItem
            icon="person-outline"
            title="My Account"
            onPress={() => router.push("/myaccount")}
          />
          <MenuItem
            icon="calendar-outline"
            title="My Appointments"
            onPress={() => router.push("/myappointments")}
          />
          <MenuItem
            icon="card-outline"
            title="Payment"
            onPress={() => router.push("/payment")}
          />
          <MenuItem
            icon="location-outline"
            title="Addresses"
            onPress={() => router.push("/addresses")}
          />
          <MenuItem
            icon="cube-outline"
            title="Track Requests"
            onPress={() => router.push("/trackrequests")}
          />
          <MenuItem
            icon="settings-outline"
            title="Settings"
            onPress={() => router.push("/settings")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
