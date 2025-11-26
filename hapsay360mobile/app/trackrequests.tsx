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
  ActivityIndicator,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { X } from "lucide-react-native";
import GradientHeader from "./components/GradientHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 1. MATCHING YOUR WORKING CONFIG
const API_BASE = "http://192.168.100.126:3000";

export default function TrackRequests() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const dividerColor = isDark ? "#4b5563" : "#d1d5db";

  // --- STATE ---
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // --- ANIMATIONS ---
  const { height } = Dimensions.get("window");
  const slideAnim = useRef(new Animated.Value(height)).current;

  // --- FETCH ALL REQUESTS (ON LOAD) ---
  useEffect(() => {
    fetchMyRequests();
  }, []);

  const fetchMyRequests = async () => {
    try {
      // 2. FIX: CHANGED "userToken" TO "authToken" TO MATCH YOUR WORKING FILES
      const token = await AsyncStorage.getItem("authToken");

      if (!token) {
        Alert.alert("Session Expired", "Please log in again.");
        setLoading(false);
        return;
      }

      console.log(`Fetching: ${API_BASE}/api/blotter/my-blotters`);

      const response = await fetch(`${API_BASE}/api/blotter/my-blotters`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Handle response
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        if (response.ok) {
          setRequests(data.blotters);
        } else {
          // If token is invalid, the backend might return a message here
          Alert.alert("Error", data.message || "Could not fetch requests");
        }
      } catch (e) {
        console.error("Server Response Error:", text);
        Alert.alert("Server Error", "Received invalid response from server");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Network error");
    } finally {
      setLoading(false);
    }
  };

  // --- FETCH SINGLE REQUEST DETAILS (FOR MODAL) ---
  const fetchRequestDetails = async (blotterNumber) => {
    setModalLoading(true);
    try {
      // Public endpoint usually doesn't need token, but if your backend requires it, add headers here too
      const response = await fetch(
        `${API_BASE}/api/blotter/track/${blotterNumber}`
      );
      const data = await response.json();

      if (response.ok) {
        setSelectedRequest(data);
        openDetailsModal();
      } else {
        Alert.alert("Error", "Could not fetch details");
      }
    } catch (error) {
      Alert.alert("Error", "Network error");
    } finally {
      setModalLoading(false);
    }
  };

  // --- MODAL HANDLERS ---
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
    }).start(() => {
      setShowDetailsModal(false);
      setSelectedRequest(null);
    });
  };

  // --- HELPER: MAP BACKEND COLOR TO TAILWIND ---
  const getStatusColor = (colorName) => {
    switch (colorName) {
      case "green":
        return "bg-green-500";
      case "blue":
        return "bg-blue-500";
      case "orange":
        return "bg-orange-500";
      case "red":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  const Divider = ({ color }: { color: string }) => (
    <View style={{ height: 1, backgroundColor: color, marginVertical: 2 }} />
  );

  // --- RENDER ---
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["left", "right"]}>
      <StatusBar barStyle="light-content" />
      <GradientHeader
        title="Track Your Activity"
        onBack={() => router.back()}
      />

      {/* --- MAIN LIST --- */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#4f46e5"
            style={{ marginTop: 50 }}
          />
        ) : requests.length === 0 ? (
          <Text className="text-center text-gray-500 mt-10">
            No requests found.
          </Text>
        ) : (
          requests.map((item) => (
            <View
              key={item._id}
              className="border border-gray-200 rounded-2xl overflow-hidden mt-4 mb-4 shadow-sm bg-white"
            >
              <View className="p-5">
                <Text className="text-lg font-bold text-gray-900 mb-3">
                  Police Blotter
                </Text>

                <Divider color={dividerColor} />

                {/* Vertical Step Indicator */}
                <View className="flex-row mt-4">
                  <View className="w-4 mr-5 items-center">
                    <View className="w-0.5 flex-1 bg-gray-300 absolute top-0 bottom-0" />
                    <View
                      className={`w-5 h-5 rounded-full border-2 border-white z-10 ${
                        item.status === "Resolved"
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                    />
                  </View>

                  <View className="flex-1">
                    <View className="mb-2">
                      <Text className="text-gray-900 font-medium text-base">
                        Current Status
                      </Text>
                      <Text className="text-indigo-600 font-bold text-sm">
                        {item.status ? item.status.toUpperCase() : "PENDING"}
                      </Text>
                    </View>

                    <View className="mb-2">
                      <Text className="text-gray-900 font-medium text-base">
                        Incident Type
                      </Text>
                      <Text className="text-gray-600 text-sm">
                        {item.incidentType}
                      </Text>
                    </View>

                    <View>
                      <Text className="text-gray-900 font-medium text-base">
                        Date
                      </Text>
                      <Text className="text-gray-600 text-sm">{item.date}</Text>
                    </View>
                  </View>
                </View>

                {/* Reference Number + Button */}
                <View className="flex-row items-center justify-between mt-6">
                  <Text className="text-sm font-semibold text-gray-700">
                    Ref #:{" "}
                    <Text className="text-indigo-600">
                      {item.blotterNumber}
                    </Text>
                  </Text>

                  <TouchableOpacity
                    onPress={() => fetchRequestDetails(item.blotterNumber)}
                    activeOpacity={0.8}
                    className="bg-indigo-600 py-3 px-6 rounded-xl"
                  >
                    {modalLoading &&
                    selectedRequest?.blotterNumber === item.blotterNumber ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text className="text-white font-semibold text-base">
                        Check Details
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
        <View className="h-8" />
      </ScrollView>

      {/* --- DETAILS MODAL --- */}
      <Modal visible={showDetailsModal} transparent animationType="none">
        <View className="flex-1 bg-black/50 justify-end">
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
            {selectedRequest && (
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
                      {selectedRequest.blotterNumber}
                    </Text>
                  </Text>

                  <View className="h-[1px] bg-gray-300 mb-4" />

                  <Text className="font-bold text-gray-900 mb-1">
                    Incident Type:{" "}
                    <Text className="font-normal">
                      {selectedRequest.incidentType}
                    </Text>
                  </Text>
                  <Text className="font-bold text-gray-900 mb-1">
                    Date & Time:{" "}
                    <Text className="font-normal">
                      {selectedRequest.dateTime}
                    </Text>
                  </Text>
                  <Text className="font-bold text-gray-900 mb-1">
                    Location:{" "}
                    <Text className="font-normal">
                      {selectedRequest.location}
                    </Text>
                  </Text>
                  <Text className="font-bold text-gray-900 mb-1">
                    Description:{" "}
                    <Text className="font-normal">
                      "{selectedRequest.description}"
                    </Text>
                  </Text>
                  <Text className="font-bold text-gray-900 mb-1">
                    Assigned Officer:{" "}
                    <Text className="font-normal">
                      {selectedRequest.assignedOfficer}
                    </Text>
                  </Text>
                  <Text className="font-bold text-gray-900 mb-1">
                    Police Station:{" "}
                    <Text className="font-normal">
                      {selectedRequest.policeStation}
                    </Text>
                  </Text>
                  <Text className="font-bold text-gray-900 mb-6">
                    Contact:{" "}
                    <Text className="font-normal">
                      {selectedRequest.contact}
                    </Text>
                  </Text>

                  <View className="h-[1px] bg-gray-300 mb-4" />

                  {/* --- DYNAMIC STATUS TIMELINE --- */}
                  <Text className="text-xl font-bold text-gray-900 mb-3">
                    Status Timeline
                  </Text>

                  <View className="border border-gray-300 rounded-2xl p-4 mb-6">
                    <View className="flex-row">
                      <View className="items-center mr-4">
                        <View className="w-0.5 flex-1 bg-gray-300 absolute top-0 bottom-0" />
                        {selectedRequest.timeline &&
                          selectedRequest.timeline.map((step, idx) => (
                            <View
                              key={`dot-${idx}`}
                              className="h-full flex-1 justify-start"
                            >
                              <View
                                className={`w-5 h-5 rounded-full border-2 border-white z-10 mb-12 ${getStatusColor(
                                  step.color
                                )}`}
                              />
                            </View>
                          ))}
                      </View>

                      <View className="flex-1">
                        {selectedRequest.timeline &&
                          selectedRequest.timeline.map((step, idx) => (
                            <View
                              key={`text-${idx}`}
                              className="h-[70px] justify-start -mt-1"
                            >
                              <Text className="font-semibold text-gray-900">
                                {step.title}
                              </Text>
                              <Text className="text-sm text-gray-600">
                                {step.date}
                              </Text>
                            </View>
                          ))}
                      </View>
                    </View>
                  </View>

                  <View className="h-[1px] bg-gray-300 mb-4" />

                  {/* --- Attachments --- */}
                  <Text className="text-xl font-bold text-gray-900 mb-3">
                    Attachments & Evidence
                  </Text>
                  <View className="mb-4">
                    <View className="w-full h-40 bg-gray-200 rounded-xl mb-2 items-center justify-center overflow-hidden">
                      {selectedRequest.photoEvidence ? (
                        <Image
                          source={{ uri: selectedRequest.photoEvidence }}
                          style={{ width: "100%", height: "100%" }}
                          resizeMode="cover"
                        />
                      ) : (
                        <Text className="text-gray-500">
                          No Photo Available
                        </Text>
                      )}
                    </View>
                  </View>

                  <View className="h-[1px] bg-gray-300 mb-4" />

                  {/* --- Communication Options --- */}
                  <Text className="text-xl font-bold text-gray-900 mb-3">
                    Communication Options
                  </Text>

                  <View className="space-y-3 mb-10">
                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert("Message", "Feature coming soon")
                      }
                    >
                      <Text className="text-blue-700 text-base">
                        • Message Officer
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert(
                          "Call",
                          `Calling ${selectedRequest.contact}`
                        )
                      }
                    >
                      <Text className="text-blue-700 text-base">
                        • Call Station
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert("Update", "Requesting update...")
                      }
                    >
                      <Text className="text-blue-700 text-base">
                        • Request Update
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            )}
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
