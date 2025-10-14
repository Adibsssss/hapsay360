import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const GradientHeader = ({ title = "Header", onBack }) => {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#3b3b8a", "#141545"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <SafeAreaView edges={["top"]}>
        <View className="px-4 py-4 flex-row items-center relative">
          {/* Back button */}
          <TouchableOpacity
            className="p-1"
            onPress={onBack ? onBack : () => router.back()}
          >
            <Ionicons name="arrow-back" size={28} color="#ffffff" />
          </TouchableOpacity>

          {/* Title */}
          <Text
            className="text-white text-2xl font-bold tracking-[0.5px] absolute left-0 right-0 text-center"
            pointerEvents="none"
          >
            {title}
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default GradientHeader;
