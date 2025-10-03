import { StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const tabBarBaseStyle = {
    backgroundColor: isDark ? "#1a1f4d" : "#F7FAFC",
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    height: 85,
    paddingBottom: 20,
    paddingTop: 10,
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: tabBarBaseStyle,
        tabBarActiveTintColor: isDark ? "#ffffff" : "#1a1f4d",
        tabBarInactiveTintColor: isDark ? "#8891b8" : "#64748b",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginTop: 4,
        },
      }}
    >
      {/* Main Tabs */}
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          headerShown: false,
          tabBarLabel: "Reports",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "bar-chart" : "bar-chart-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="blotter"
        options={{
          headerShown: false,
          tabBarLabel: "Blotter",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "document-text" : "document-text-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="appointment"
        options={{
          headerShown: false,
          tabBarLabel: "Appointment",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="nearesthelp"
        options={{
          headerShown: false,
          tabBarLabel: "Nearest Help",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "navigate" : "navigate-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
