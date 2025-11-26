import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  StatusBar,
  useColorScheme,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { X, Shield, Phone, MessageSquare } from "lucide-react-native";
import GradientHeader from "../components/GradientHeader";

// STATIC NI WALA NI PULOS

// Track request akong gi gamit na file.

export default function TrackActivity() {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const dividerColor = isDark ? "#4b5563" : "#d1d5db";

  const { height } = Dimensions.get("window");
  const slideAnim = useRef(new Animated.Value(height)).current;

  const openDetailsModal = () => {
    setShowDetailsModal(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeDetailsModal = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowDetailsModal(false));
  };

  const handleMessageOfficer = () => {
    Alert.alert(
      "Officer Details",
      "Phone: 0917-555-6789\nEmail: maria.cruz@police.gov.ph\nLandline: (088) 222-7890",
      [{ text: "OK" }]
    );
  };

  const handleCallStation = () => {
    Alert.alert(
      "Station Details",
      "Phone: (088) 123-4567\nEmail: lapasan@police.gov.ph\nLandline: (088) 555-0000",
      [{ text: "OK" }]
    );
  };

  const handleRequestUpdate = () => {
    Alert.alert(
      "Request Sent",
      "An email would be sent shortly after your request. Thank you!",
      [{ text: "OK" }]
    );
  };

  const Divider = ({ color }: { color: string }) => (
    <View
      style={{
        height: 1,
        backgroundColor: color,
        marginVertical: 2,
      }}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["left", "right"]}>
      <StatusBar barStyle="light-content" />
      <GradientHeader
        title="Track Your Activity"
        onBack={() => router.back()}
      />

      {/* --- MAIN CONTENT --- */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="border border-gray-200 rounded-2xl overflow-hidden mt-4 mb-8 shadow-sm bg-white">
          <View className="p-5">
            <Text className="text-lg font-bold text-gray-900 mb-3">
              Police Blotter
            </Text>

            <Divider color={dividerColor} />

            {/* Vertical Step Indicator */}
            <View className="flex-row mt-4">
              <View className="w-4" />

              <View className="items-center">
                <View className="w-0.5 flex-1 bg-gray-300 absolute top-0 bottom-0" />

                <View className="w-5 h-5 rounded-full bg-green-500 border-2 border-white z-10" />
                <View className="flex-1" />
                <View className="w-5 h-5 rounded-full bg-blue-500 border-2 border-white z-10" />
                <View className="flex-1" />
                <View className="w-5 h-5 rounded-full bg-blue-500 border-2 border-white z-10" />
              </View>

              <View className="flex-1 ml-5">
                <View className="mb-6">
                  <Text className="text-gray-900 font-medium text-base">
                    Report Submitted
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    Oct 14, 10:45 AM
                  </Text>
                </View>

                <View className="mb-6">
                  <Text className="text-gray-900 font-medium text-base">
                    Incident Type
                  </Text>
                  <Text className="text-gray-600 text-sm">Theft/Robbery</Text>
                </View>

                <View>
                  <Text className="text-gray-900 font-medium text-base">
                    Location
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    Lapasan Bridge, CDO
                  </Text>
                </View>
              </View>
            </View>

            {/* Reference Number + Button */}
            <View className="flex-row items-center justify-between mt-6">
              <Text className="text-sm font-semibold text-gray-700">
                Reference #: <Text className="text-indigo-600">BLT-092345</Text>
              </Text>

              <TouchableOpacity
                onPress={openDetailsModal}
                activeOpacity={0.8}
                className="bg-indigo-600 py-3 px-6 rounded-xl"
              >
                <Text className="text-white font-semibold text-base">
                  Check Details
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* --- DETAILS MODAL --- */}
      <Modal visible={showDetailsModal} transparent animationType="none">
        <View className="flex-1 bg-black/50 justify-end">
          {/* Background touch to close */}
          <TouchableWithoutFeedback onPress={closeDetailsModal}>
            <View className="absolute top-0 left-0 right-0 bottom-0" />
          </TouchableWithoutFeedback>

          <Animated.View
            style={{
              transform: [{ translateY: slideAnim }],
              maxHeight: height * 0.85,
            }}
            className="bg-white rounded-t-3xl overflow-hidden"
          >
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 pt-6 pb-4">
              <TouchableOpacity
                onPress={closeDetailsModal}
                className="w-10 h-10 items-center justify-center"
              >
                <X size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Scrollable Content */}
            <ScrollView
              nestedScrollEnabled
              contentContainerStyle={{ paddingBottom: 40 }}
              showsVerticalScrollIndicator={false}
            >
              <View className="px-6">
                {/* --- Police Blotter Info --- */}
                <Text className="text-2xl font-bold text-gray-900 mb-1">
                  Police Blotter
                </Text>
                <Text className="text-sm text-gray-500 mb-3">
                  Reference No:{" "}
                  <Text className="font-semibold text-gray-700">
                    BLT-092345
                  </Text>
                </Text>

                <View className="h-[1px] bg-gray-300 mb-4" />

                <Text className="font-bold text-gray-900 mb-1">
                  Incident Type:{" "}
                  <Text className="font-normal">Theft / Robbery</Text>
                </Text>
                <Text className="font-bold text-gray-900 mb-1">
                  Date & Time:{" "}
                  <Text className="font-normal">Oct 14, 2025 - 10:45 AM</Text>
                </Text>
                <Text className="font-bold text-gray-900 mb-1">
                  Location:{" "}
                  <Text className="font-normal">Lapasan Bridge, CDO</Text>
                </Text>
                <Text className="font-bold text-gray-900 mb-1">
                  Description:{" "}
                  <Text className="font-normal">
                    "My phone was stolen while waiting at the bus stop."
                  </Text>
                </Text>
                <Text className="font-bold text-gray-900 mb-1">
                  Assigned Officer:{" "}
                  <Text className="font-normal">P/Cpl. Maria Dea Cruz</Text>
                </Text>
                <Text className="font-bold text-gray-900 mb-1">
                  Police Station:{" "}
                  <Text className="font-normal">Lapasan Police Station</Text>
                </Text>
                <Text className="font-bold text-gray-900 mb-6">
                  Contact: <Text className="font-normal">(088) 123-4567</Text>
                </Text>

                <View className="h-[1px] bg-gray-300 mb-4" />

                {/* --- Status Timeline --- */}
                <Text className="text-xl font-bold text-gray-900 mb-3">
                  Status Timeline
                </Text>

                <View className="border border-gray-300 rounded-2xl p-4 mb-6">
                  <View className="flex-row">
                    <View className="items-center mr-4">
                      <View className="w-0.5 flex-1 bg-gray-300 absolute top-0 bottom-0" />
                      <View className="w-5 h-5 rounded-full bg-green-500 border-2 border-white z-10" />
                      <View className="flex-1" />
                      <View className="w-5 h-5 rounded-full bg-yellow-400 border-2 border-white z-10" />
                      <View className="flex-1" />
                      <View className="w-5 h-5 rounded-full bg-orange-500 border-2 border-white z-10" />
                      <View className="flex-1" />
                      <View className="w-5 h-5 rounded-full bg-red-500 border-2 border-white z-10" />
                    </View>

                    <View className="flex-1">
                      <View className="mb-6">
                        <Text className="font-semibold text-gray-900">
                          Report Submitted
                        </Text>
                        <Text className="text-sm text-gray-600">
                          Oct 13, 10:45 AM
                        </Text>
                      </View>
                      <View className="mb-6">
                        <Text className="font-semibold text-gray-900">
                          Officer Assigned
                        </Text>
                        <Text className="text-sm text-gray-600">
                          Oct 14, 11:05 AM
                        </Text>
                      </View>
                      <View className="mb-6">
                        <Text className="font-semibold text-gray-900">
                          Investigation Ongoing
                        </Text>
                        <Text className="text-sm text-gray-600">
                          Oct 14, 1:30 PM
                        </Text>
                      </View>
                      <View>
                        <Text className="font-semibold text-gray-900">
                          Awaiting Feedback
                        </Text>
                        <Text className="text-sm text-gray-600">
                          Oct 15, 09:00 AM
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View className="h-[1px] bg-gray-300 mb-4" />

                {/* --- Attachments --- */}
                <Text className="text-xl font-bold text-gray-900 mb-3">
                  Attachments & Evidence
                </Text>
                <View className="mb-4">
                  <View className="w-full h-40 bg-gray-200 rounded-xl mb-2 items-center justify-center">
                    <Text className="text-gray-500">Photo Placeholder</Text>
                  </View>
                  <Text className="text-sm text-gray-600">
                    Attached image of the location where the incident occurred.
                  </Text>
                </View>

                <View className="h-[1px] bg-gray-300 mb-4" />

                {/* --- Communication Options --- */}
                <Text className="text-xl font-bold text-gray-900 mb-3">
                  Communication Options
                </Text>

                <View className="space-y-3 mb-10">
                  <TouchableOpacity onPress={handleMessageOfficer}>
                    <Text className="text-blue-700 text-base">
                      • Message Officer
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleCallStation}>
                    <Text className="text-blue-700 text-base">
                      • Call Station
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleRequestUpdate}>
                    <Text className="text-blue-700 text-base">
                      • Request Update
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
