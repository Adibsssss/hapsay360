import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Svg, { Defs, RadialGradient, Stop, Circle } from "react-native-svg";
import GradientHeader from "./components/GradientHeader";

export default function SOSEmergencyScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Animation refs
  const pulse1 = useRef(new Animated.Value(0)).current;
  const pulse2 = useRef(new Animated.Value(0)).current;
  const pulse3 = useRef(new Animated.Value(0)).current;
  const opacity1 = useRef(new Animated.Value(1)).current;
  const opacity2 = useRef(new Animated.Value(1)).current;
  const opacity3 = useRef(new Animated.Value(1)).current;

  const createPulseAnimation = (animValue, opacityValue, delay) => {
    const animate = () => {
      animValue.setValue(0);
      opacityValue.setValue(1);
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(animValue, {
            toValue: 1,
            duration: 2000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacityValue, {
            toValue: 0,
            duration: 2000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => animate());
    };
    animate();
  };

  useEffect(() => {
    createPulseAnimation(pulse1, opacity1, 0);
    createPulseAnimation(pulse2, opacity2, 400);
    createPulseAnimation(pulse3, opacity3, 800);
  }, []);

  const scale1 = pulse1.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });
  const scale2 = pulse2.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });
  const scale3 = pulse3.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });

  return (
    <SafeAreaView
      className="flex-1"
      edges={["left", "right"]}
      style={{ backgroundColor: isDark ? "#1a1f4d" : "#ffffff" }}
    >
      {/* Header */}
      <GradientHeader title="SOS" onBack={() => router.back()} />

      {/* Title & Description */}
      <View className="mt-10 mb-10 px-6 flex-none">
        <Text
          className="text-4xl font-extrabold text-center mb-4 tracking-tight"
          style={{ color: isDark ? "#ffffff" : "#111827" }}
        >
          Calling Emergency...
        </Text>
        <Text
          className="text-base text-center leading-6 font-medium"
          style={{ color: isDark ? "#d1d5db" : "#4b5563" }}
        >
          Please stand by, we are currently requesting for help. Your emergency
          contacts and nearby rescue services would see your call for help.
        </Text>
      </View>

      {/* Centered SOS Animation */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: -40,
        }}
      >
        <View
          className="items-center justify-center"
          style={{ height: 320, width: 320 }}
        >
          {/* Animated Pulse Rings */}
          <Animated.View
            className="absolute rounded-full border-2 border-dashed border-blue-400"
            style={{
              width: 280,
              height: 280,
              transform: [{ scale: scale3 }],
              opacity: opacity3,
            }}
          />
          <Animated.View
            className="absolute rounded-full border-2 border-dashed border-blue-400"
            style={{
              width: 240,
              height: 240,
              transform: [{ scale: scale2 }],
              opacity: opacity2,
            }}
          />
          <Animated.View
            className="absolute rounded-full border-2 border-dashed border-blue-400"
            style={{
              width: 200,
              height: 200,
              transform: [{ scale: scale1 }],
              opacity: opacity1,
            }}
          />

          {/* Static inner rings */}
          <View className="absolute w-44 h-44 rounded-full border-2 border-dashed border-blue-400" />
          <View className="absolute w-36 h-36 rounded-full border-2 border-dashed border-blue-400" />

          {/* Center circle (Gradient SOS button) */}
          <View
            style={{
              width: 144,
              height: 144,
              borderRadius: 72,
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 6,
              elevation: 5,
            }}
          >
            <Svg
              width={144}
              height={144}
              style={{ position: "absolute", top: 0, left: 0 }}
            >
              <Defs>
                <RadialGradient
                  id="grad"
                  cx="50%"
                  cy="50%"
                  r="50%"
                  fx="50%"
                  fy="50%"
                >
                  <Stop offset="0%" stopColor="#3AB4E6" stopOpacity="1" />
                  <Stop offset="100%" stopColor="#013971" stopOpacity="1" />
                </RadialGradient>
              </Defs>
              <Circle cx="72" cy="72" r="72" fill="url(#grad)" />
            </Svg>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text className="text-white text-2xl font-bold tracking-wider">
                SOS
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
