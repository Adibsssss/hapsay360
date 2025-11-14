import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import GradientHeader from "./components/GradientHeader";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const maskedEmail = "u***@email.com";

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(20);
  const [isVerified, setIsVerified] = useState(false);
  const hiddenInputRef = useRef(null);

  useEffect(() => {
    handleSendOtp();
  }, []);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (otp.length === 6) {
      handleVerifyOtp();
    }
  }, [otp]);

  const handleSendOtp = async () => {
    setIsLoading(true);
    try {
      setTimeout(() => {
        setIsLoading(false);
        setTimer(20);
        setIsVerified(false);
        Alert.alert("OTP Sent", `Verification code sent to ${maskedEmail}`);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", "Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 6) return;
    setIsLoading(true);
    try {
      setTimeout(() => {
        setIsLoading(false);
        setIsVerified(true);
        Alert.alert("Success", "OTP verified. You can now continue.");
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      setIsVerified(false);
      Alert.alert("Error", "Invalid OTP. Please try again.");
    }
  };

  const handlePressOtpBoxes = () => {
    hiddenInputRef.current?.focus();
  };

  const handleContinue = () => {
    if (isVerified) {
      router.push("/newpassword");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["left", "right"]}>
      <StatusBar barStyle="light-content" />
      <GradientHeader title="Forgot Password" onBack={() => router.back()} />

      <ScrollView className="flex-1 bg-white">
        <View className="px-6 py-6 mt-2">
          {/* Title */}
          <Text className="text-4xl font-bold text-gray-900">Forgot your</Text>
          <Text className="text-4xl font-bold text-gray-900 mb-3">
            password
          </Text>

          {/* Subtitle */}
          <Text className="text-2x1 text-gray-600 mb-8">
            Enter the verification code sent to your email{" "}
            <Text className="font-semibold text-gray-800">{maskedEmail}</Text>
          </Text>

          {/* OTP Boxes */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={handlePressOtpBoxes}
            className="flex-row justify-between mb-4"
          >
            {[...Array(6)].map((_, index) => (
              <View
                key={index}
                className={`w-12 h-14 border-2 rounded-xl items-center justify-center ${
                  otp.length === index ? "border-blue-500" : "border-blue-300"
                }`}
              >
                <Text className="text-2xl font-semibold text-gray-800">
                  {otp[index] || ""}
                </Text>
              </View>
            ))}
          </TouchableOpacity>

          {/* Hidden Input */}
          <TextInput
            ref={hiddenInputRef}
            value={otp}
            onChangeText={(text) =>
              setOtp(text.replace(/[^0-9]/g, "").slice(0, 6))
            }
            keyboardType="number-pad"
            maxLength={6}
            className="absolute opacity-0"
            autoFocus
          />

          {/* Resend Section */}
          <View className="flex-row justify-center items-center mb-20">
            <Text className="text-gray-600 mr-2">Didn’t receive the code?</Text>
            {timer > 0 ? (
              <Text className="text-gray-500 font-medium">
                00:{timer.toString().padStart(2, "0")}
              </Text>
            ) : (
              <TouchableOpacity onPress={handleSendOtp}>
                <Text className="text-blue-500 font-semibold">Resend</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            disabled={!isVerified || isLoading}
            onPress={handleContinue}
            style={{
              backgroundColor: isVerified && !isLoading ? "#3234AB" : "#A5A6F6",
              borderRadius: 9999,
            }}
            className="py-4 items-center"
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold text-base">
                Continue
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
