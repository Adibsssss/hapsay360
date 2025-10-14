import React from "react";
import {
  Alert,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import GradientHeader from "../components/GradientHeader";

const ChevronRight = () => (
  <Ionicons name="chevron-forward-outline" size={20} color="#6B7280" />
);

const MenuItem = ({ icon, title, onPress }) => (
  <TouchableOpacity
    className="flex-row items-center justify-between py-4 px-5 rounded-xl mb-3 mx-3"
    style={{
      backgroundColor: "#DEEBF8",
      borderWidth: 1,
      borderColor: "#E5E7EB",
    }}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View className="flex-row items-center gap-3">
      <Ionicons name={icon} size={20} color="#1E3A8A" />
      <Text className="text-gray-900 text-base font-medium">{title}</Text>
    </View>
    <ChevronRight />
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />

      {/* Reusable Gradient Header */}
      <GradientHeader title="Profile" onBack={() => router.back()} />

      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Info */}
        <View className="items-center pt-6 pb-4">
          <View
            className="w-36 h-36 rounded-full overflow-hidden mb-3 border-4"
            style={{ borderColor: "#E0E7FF" }}
          >
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
          <Text className="text-indigo-700 text-sm mt-1 font-medium">User</Text>
        </View>

        {/* Section Title */}
        <View className="mt-2 mx-2 bg-white rounded-2xl overflow-hidden">
          <Text className="text-gray-900 font-semibold text-base px-5 py-3">
            General
          </Text>

          {/* Menu Items */}
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
            onPress={() => router.push("/address")}
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
          <MenuItem
            icon="log-out-outline"
            title="Log Out"
            onPress={() => {
              Alert.alert("Log Out", "Are you sure you want to log out?", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Log Out",
                  style: "destructive",
                  onPress: () => router.replace("/logout"),
                },
              ]);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
