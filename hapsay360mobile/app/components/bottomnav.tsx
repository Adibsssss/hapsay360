import React from "react";
import { View, TouchableOpacity, Text, useColorScheme } from "react-native";
import { Home, Search, FileText, User } from "lucide-react-native";
import { useRouter, usePathname } from "expo-router";

const tabs = [
  { name: "Home", icon: Home, route: "/(tabs)/index" },
  { name: "Inquire", icon: Search, route: "/(tabs)/inquire" },
  { name: "Clearance", icon: FileText, route: "/(tabs)/clearance" },
  { name: "Profile", icon: User, route: "/(tabs)/profile" },
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
        const Icon = tab.icon;
        // Determine if the tab should be active
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
            <Icon size={24} color={isActive ? activeColor : inactiveColor} />
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
