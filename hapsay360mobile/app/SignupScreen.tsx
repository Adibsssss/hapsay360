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
<<<<<<< HEAD
  ActivityIndicator,
=======
>>>>>>> c6534c29bccdb0edf444c79a0d1b2df8e88f374f
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const API_BASE = "http://192.168.1.6:3000"; // Replace with your PC LAN IP

export default function SignupScreen() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
<<<<<<< HEAD
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Email and password are required");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
=======
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    setError("");

    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
>>>>>>> c6534c29bccdb0edf444c79a0d1b2df8e88f374f
      return;
    }

    if (password.length < 6) {
<<<<<<< HEAD
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          firstName: firstName || null,
          lastName: lastName || null,
          phone_number: phone_number || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Registration Failed", data.message || "Unknown error");
        return;
      }

      Alert.alert("Success", "Account created successfully. Please log in.");
      router.push("/");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to connect to server");
      console.error("Signup error:", error);
=======
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log({ firstName, lastName, email, password });

      router.push("/(tabs)");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again later.");
>>>>>>> c6534c29bccdb0edf444c79a0d1b2df8e88f374f
    } finally {
      setLoading(false);
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
<<<<<<< HEAD
        {/* Header Section */}
        <View style={{ height: 250, width: "100%" }}>
=======
        {/* Header Gradient */}
        <View style={{ height: 300, width: "100%" }}>
>>>>>>> c6534c29bccdb0edf444c79a0d1b2df8e88f374f
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
              Create Your Account
            </Text>
          </LinearGradient>
        </View>

        {/* Form Section */}
        <View className="flex-1 bg-white px-8 pt-8 pb-8">
          <Text className="text-2xl font-bold text-gray-800 mb-2">Sign Up</Text>
          <Text className="text-gray-600 text-sm mb-6">
            Fill in your information to get started
          </Text>

          {/* First Name Input */}
          <TextInput
            className="bg-gray-100 rounded-lg px-4 py-4 mb-4 text-gray-700 text-base"
            placeholder="First Name (Optional)"
            placeholderTextColor="#9CA3AF"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
            editable={!loading}
          />

          {/* Last Name Input */}
          <TextInput
            className="bg-gray-100 rounded-lg px-4 py-4 mb-4 text-gray-700 text-base"
            placeholder="Last Name (Optional)"
            placeholderTextColor="#9CA3AF"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
            editable={!loading}
          />

          {/* Email Input */}
          <TextInput
            className="bg-gray-100 rounded-lg px-4 py-4 mb-4 text-gray-700 text-base"
            placeholder="Email *"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            editable={!loading}
          />

          {/* Phone Number Input */}
          <TextInput
            className="bg-gray-100 rounded-lg px-4 py-4 mb-4 text-gray-700 text-base"
            placeholder="Phone Number (Optional)"
            placeholderTextColor="#9CA3AF"
            value={phone_number}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            editable={!loading}
          />

          {/* Password Input with Show/Hide */}
          <View className="mb-4 relative">
            <TextInput
              className="bg-gray-100 rounded-lg px-4 py-4 text-gray-700 text-base pr-12"
              placeholder="Password *"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              editable={!loading}
            />
            <TouchableOpacity
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onPress={() => setShowPassword(!showPassword)}
              activeOpacity={0.7}
              disabled={loading}
            >
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={24}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

<<<<<<< HEAD
          {/* Confirm Password Input */}
          <View className="mb-6 relative">
            <TextInput
              className="bg-gray-100 rounded-lg px-4 py-4 text-gray-700 text-base pr-12"
              placeholder="Confirm Password *"
              placeholderTextColor="#9CA3AF"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              editable={!loading}
            />
            <TouchableOpacity
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              activeOpacity={0.7}
              disabled={loading}
            >
              <Ionicons
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={24}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>
=======
          {/* Error Message */}
          {error ? (
            <Text className="text-red-500 text-sm mb-4 text-center">
              {error}
            </Text>
          ) : null}
>>>>>>> c6534c29bccdb0edf444c79a0d1b2df8e88f374f

          {/* Signup Button */}
          <TouchableOpacity
            onPress={handleSignup}
            disabled={loading}
            className={`${
              loading ? "bg-gray-400" : "bg-[#4338ca]"
            } rounded-full py-4 items-center mb-6`}
            activeOpacity={0.8}
            disabled={loading}
          >
<<<<<<< HEAD
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-semibold text-base">
                Create Account
              </Text>
            )}
=======
            <Text className="text-white font-semibold text-base">
              {loading ? "Signing Up..." : "Sign Up"}
            </Text>
>>>>>>> c6534c29bccdb0edf444c79a0d1b2df8e88f374f
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center items-center">
            <Text className="text-gray-600 text-sm">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/")}
              disabled={loading}
            >
              <Text className="text-blue-600 text-sm font-semibold">
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
