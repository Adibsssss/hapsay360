import React from "react";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const tabBarBaseStyle = {
    backgroundColor: isDark ? "#1a1f4d" : "#ffffff",
    borderTopWidth: 1,
    borderTopColor: isDark ? "#2a2f55" : "#e5e7eb",
    height: 85,
    paddingBottom: 20,
    paddingTop: 10,
    elevation: 0,
    shadowOpacity: 0,
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: tabBarBaseStyle,
        tabBarActiveTintColor: "#312E81",
        tabBarInactiveTintColor: "#64748b",
        tabBarLabelStyle: { fontSize: 12, marginTop: 2, fontWeight: "500" },
        tabBarIconStyle: { marginBottom: -2 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="nearesthelp"
        options={{
          tabBarLabel: "Nearest Help",
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color }) => (
            <Ionicons name="navigate-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="trackactivity"
        options={{
          tabBarLabel: "Track Activity",
          tabBarIcon: ({ color }) => (
            <Ionicons name="trending-up-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
