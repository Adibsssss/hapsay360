import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    console.log("Login pressed");
    // TODO: validate login credentials first
    router.replace("./(tabs)");
  };

  const handleGoogleLogin = () => {
    console.log("Google login pressed");
    // Add Google OAuth logic
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login pressed");
    // Add Facebook OAuth logic
  };

  const handleForgotPassword = () => {
    console.log("Forgot password pressed");
    // Navigate to forgot password screen
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
            className="bg-[#4338ca] rounded-full py-4 items-center mb-6"
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold text-base">Log in</Text>
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
              Dont have an account?{" "}
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
