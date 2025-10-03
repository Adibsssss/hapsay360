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

export default function SignupScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    console.log("Signup pressed");
    // Add your Signup logic here
    console.log({ firstName, lastName, email, password });
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
        <View className="bg-[#1a1a4a] items-center justify-center pt-20 pb-20">
          <Image
            source={require("../assets/images/icon.png")}
            style={{ width: 80, height: 80 }}
            contentFit="contain"
          />
          <Text className="text-white text-2xl font-bold tracking-wider">
            HAPSAY360
          </Text>
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

          {/* Password Input */}
          <TextInput
            className="bg-gray-100 rounded-lg px-4 py-4 mb-6 text-gray-700 text-base"
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password"
          />

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
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text className="text-blue-600 text-sm font-semibold underline">
                  Log In
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
