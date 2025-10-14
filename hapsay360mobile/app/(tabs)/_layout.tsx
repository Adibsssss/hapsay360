import React from "react";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { Home, Search, FileText, User } from "lucide-react-native";

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
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="inquire"
        options={{
          tabBarLabel: "Inquire",
          tabBarIcon: ({ color }) => <Search size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="clearance"
        options={{
          tabBarLabel: "Clearance",
          tabBarIcon: ({ color }) => <FileText size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
