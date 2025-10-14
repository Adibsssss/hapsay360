import React from "react";
import { View, TouchableOpacity, Text, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // <-- Use Ionicons
import { useRouter, usePathname } from "expo-router";

const tabs = [
  { name: "Home", icon: "home-outline", route: "/(tabs)" },
  {
    name: "Nearest Help",
    icon: "navigate-outline",
    route: "/(tabs)/nearesthelp",
  },
  {
    name: "Track Activity",
    icon: "trending-up-outline",
    route: "/(tabs)/trackactivity",
  },
  { name: "Profile", icon: "person-outline", route: "/(tabs)/profile" },
];

export default function BottomNav({ activeRoute }) {
  const router = useRouter();
  const pathname = usePathname() || "";
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const bgColor = isDark ? "#1a1f4d" : "#ffffff";
  const borderColor = isDark ? "#2a2f55" : "#e5e7eb";
  const activeColor = "#312E81";
  const inactiveColor = isDark ? "#8891b8" : "#64748b";

  return (
    <View
      style={{
        backgroundColor: bgColor,
        borderTopWidth: 1,
        borderTopColor: borderColor,
        flexDirection: "row",
        justifyContent: "space-around",
        height: 85,
        paddingBottom: 20,
        paddingTop: 10,
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeRoute
          ? activeRoute === tab.route
          : pathname.startsWith(tab.route);

        return (
          <TouchableOpacity
            key={tab.name}
            style={{ alignItems: "center" }}
            onPress={() => router.replace(tab.route)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={tab.icon}
              size={24}
              color={isActive ? activeColor : inactiveColor}
            />
            <Text
              style={{
                fontSize: 12,
                marginTop: 4,
                fontWeight: "500",
                color: isActive ? activeColor : inactiveColor,
              }}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
