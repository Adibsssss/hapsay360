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
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Example
      if (email === "admin@gmail.com" && password === "admin123") {
        console.log("Login successful");
        router.replace("./(tabs)");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      console.log("Google login pressed");
    } catch (err) {
      Alert.alert("Login Error", "Failed to login with Google.");
    }
  };

  const handleFacebookLogin = async () => {
    try {
      console.log("Facebook login pressed");
      // Add Facebook login logic here
    } catch (err) {
      Alert.alert("Login Error", "Failed to login with Facebook.");
    }
  };

  const handleForgotPassword = () => {
    try {
      console.log("Forgot password pressed");
      router.push("/forgotpassword");
    } catch (err) {
      Alert.alert("Error", "Unable to navigate to password reset.");
    }
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
            <Image
              source={require("../assets/images/icon.png")}
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
            />
            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: "bold",
                letterSpacing: 2,
                marginTop: 10,
              }}
            >
              HAPSAY360
            </Text>
          </LinearGradient>
        </View>

        {/* Form Section */}
        <View className="flex-1 bg-white px-8 pt-8">
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
          />

          {/* Error Message */}
          {error ? (
            <Text className="text-red-500 text-sm mb-4 text-center">
              {error}
            </Text>
          ) : null}

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={handleForgotPassword}
            className="self-end mb-6"
            activeOpacity={0.7}
          >
            <Text className="text-gray-600 text-sm">Forgot Your Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            className={`${
              loading ? "bg-gray-400" : "bg-[#4338ca]"
            } rounded-full py-4 items-center mb-6`}
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold text-base">
              {loading ? "Logging in..." : "Log in"}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-gray-500 text-sm">Or</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Social Login Buttons */}
          <View className="flex-row justify-center mb-8 gap-4">
            <TouchableOpacity
              onPress={handleGoogleLogin}
              className="w-12 h-12 rounded-full bg-white border border-gray-300 items-center justify-center shadow-sm"
              activeOpacity={0.7}
            >
              <Text className="text-lg font-bold text-red-500">G</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleFacebookLogin}
              className="w-12 h-12 rounded-full bg-white border border-gray-300 items-center justify-center shadow-sm"
              activeOpacity={0.7}
            >
              <Text className="text-xl font-bold text-blue-600">f</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center items-center">
            <Text className="text-gray-600 text-sm">
              Don't have an account?{" "}
            </Text>
            <Link href="/SignupScreen" asChild>
              <TouchableOpacity>
                <Text className="text-blue-600 text-sm font-semibold underline">
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
