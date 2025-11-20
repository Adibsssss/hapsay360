import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE = "http://192.168.1.6:3000"; // Replace with your PC LAN IP

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
        return;
      }

      // Save token to AsyncStorage
      await AsyncStorage.setItem("authToken", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      Alert.alert("Success", "Login successful");
      router.replace("./(tabs)");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to connect to server");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login pressed");
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login pressed");
  };

  const handleForgotPassword = () => {
    router.push("/forgotpassword");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        className="flex-1"
      >
        {/* Header Section */}
        <View style={{ height: 300, width: "100%" }}>
          <LinearGradient
            colors={["#3b3b8a", "#141545"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <StatusBar style="light" />
            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: "bold",
                letterSpacing: 2,
              }}
            >
              HAPSAY360
            </Text>
            <Text style={{ color: "#9CA3AF", fontSize: 12, marginTop: 5 }}>
              Emergency Response System
            </Text>
          </LinearGradient>
        </View>

        {/* Form Section */}
        <View className="flex-1 bg-white px-8 pt-8 pb-8">
          <Text className="text-2xl font-bold text-gray-800 mb-2">Login</Text>
          <Text className="text-gray-600 text-sm mb-6">
            Enter your credentials to continue
          </Text>

          {/* Email Input */}
          <TextInput
            className="bg-gray-100 rounded-lg px-4 py-4 mb-4 text-gray-700 text-base"
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            editable={!loading}
          />

          {/* Password Input */}
          <TextInput
            className="bg-gray-100 rounded-lg px-4 py-4 mb-2 text-gray-700 text-base"
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password"
            editable={!loading}
          />

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={handleForgotPassword}
            className="self-end mb-6"
            activeOpacity={0.7}
            disabled={loading}
          >
            <Text className="text-blue-600 text-sm font-semibold">
              Forgot Your Password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-[#4338ca] rounded-full py-4 items-center mb-6"
            activeOpacity={0.8}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-semibold text-base">Log In</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-gray-500 text-sm">Or continue with</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Social Login Buttons */}
          <View className="flex-row justify-center mb-8 gap-4">
            <TouchableOpacity
              onPress={handleGoogleLogin}
              className="flex-1 border border-gray-300 rounded-lg py-3 items-center"
              activeOpacity={0.7}
              disabled={loading}
            >
              <Text className="text-gray-700 font-semibold">Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleFacebookLogin}
              className="flex-1 border border-gray-300 rounded-lg py-3 items-center"
              activeOpacity={0.7}
              disabled={loading}
            >
              <Text className="text-gray-700 font-semibold">Facebook</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center items-center">
            <Text className="text-gray-600 text-sm">
              Don't have an account?{" "}
            </Text>
            <Link href="/SignupScreen" asChild>
              <TouchableOpacity disabled={loading}>
                <Text className="text-blue-600 text-sm font-semibold">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
