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
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function SignupScreen() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    // Here you can call your backend API to create an account
    console.log({ firstName, lastName, email, password });

    // After signup, navigate to another page (e.g., Welcome page)
    router.push("/(tabs)");
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

          {/* First Name Input */}
          <TextInput
            className="bg-gray-100 rounded-lg px-4 py-4 mb-4 text-gray-700 text-base"
            placeholder="First Name"
            placeholderTextColor="#9CA3AF"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
          />

          {/* Last Name Input */}
          <TextInput
            className="bg-gray-100 rounded-lg px-4 py-4 mb-4 text-gray-700 text-base"
            placeholder="Last Name"
            placeholderTextColor="#9CA3AF"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
          />

          {/* Password Input with Show/Hide */}
          <View className="mb-6 relative">
            <TextInput
              className="bg-gray-100 rounded-lg px-4 py-4 text-gray-700 text-base pr-12"
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoComplete="password"
            />
            <TouchableOpacity
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onPress={() => setShowPassword(!showPassword)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={24}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          {/* Signup Button */}
          <TouchableOpacity
            onPress={handleSignup}
            className="bg-[#4338ca] rounded-full py-4 items-center mb-6"
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold text-base">Sign Up</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center items-center">
            <Text className="text-gray-600 text-sm">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/")}>
              <Text className="text-blue-600 text-sm font-semibold underline">
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
