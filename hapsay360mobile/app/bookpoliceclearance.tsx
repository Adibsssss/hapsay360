import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { ChevronDown, Home, Search, FileText, User } from "lucide-react-native";

const purposes = [
  "Employment",
  "Visa Application",
  "Loan Application",
  "Scholarship",
  "Travel Abroad",
  "Business Permit",
  "School Requirements",
  "Immigration",
  "Adoption",
  "Others",
];

const policeStations = [
  "PS 1 Balut, Cagayan de Oro City",
  "PS 2 Carmen, Cagayan de Oro City",
  "PS 3 Gusa, Cagayan de Oro City",
  "PS 4 Lapasan, Cagayan de Oro City",
  "PS 5 Macasandig, Cagayan de Oro City",
  "PS 6 Puerto, Cagayan de Oro City",
  "PS 7 Kauswagan, Cagayan de Oro City",
  "Cagayan de Oro City Police Station",
];

const today = new Date();
const dates = Array.from({ length: 9 }, (_, i) => {
  const date = new Date();
  date.setDate(today.getDate() + i);
  return {
    day: date.getDate(),
    label: date.toLocaleDateString("en-US", { weekday: "short" }),
  };
});

const timeSlots = {
  morning: ["7:00", "9:00", "10:00", "11:00"],
  afternoon: ["1:00", "3:00", "4:00", "5:00"],
};

export default function BookingPoliceClearance() {
  const router = useRouter();
  const [purpose, setPurpose] = useState("");
  const [station, setStation] = useState("");
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [selectedTime, setSelectedTime] = useState("1:30");
  const [timeSlot, setTimeSlot] = useState("P.M");
  const [showPurposeDropdown, setShowPurposeDropdown] = useState(false);
  const [showStationDropdown, setShowStationDropdown] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleProceed = () => {
    if (!purpose || !station) {
      alert("Please select purpose and police station");
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    setShowSuccess(true);
  };

  const handleGoToPayment = () => {
    setShowSuccess(false);
    router.push("/policeclearancepayment");
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["left", "right"]}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <LinearGradient
        colors={["#3b3b8a", "#141545"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          paddingHorizontal: 16,
          paddingTop: 55,
          paddingBottom: 16,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          className="mr-4"
          style={{ padding: 4 }}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "600",
            letterSpacing: 0.5,
          }}
        >
          Book Appointment
        </Text>
      </LinearGradient>

      {/* Steps */}
      <View className="bg-white px-6 py-5">
        <View className="flex-row items-center justify-between">
          <View className="items-center" style={{ width: 70 }}>
            <View className="w-10 h-10 rounded-full bg-indigo-600 items-center justify-center mb-2">
              <Text className="text-white font-bold">1</Text>
            </View>
            <Text className="text-xs text-gray-900 font-medium">Book date</Text>
          </View>
          <View
            className="flex-1 h-px bg-gray-300 mx-2"
            style={{ marginTop: -20 }}
          />
          <View className="items-center" style={{ width: 70 }}>
            <View className="w-10 h-10 rounded-full bg-gray-300 items-center justify-center mb-2">
              <Text className="text-white font-bold">2</Text>
            </View>
            <Text className="text-xs text-gray-500">Payment</Text>
          </View>
          <View
            className="flex-1 h-px bg-gray-300 mx-2"
            style={{ marginTop: -20 }}
          />
          <View className="items-center" style={{ width: 70 }}>
            <View className="w-10 h-10 rounded-full bg-gray-300 items-center justify-center mb-2">
              <Text className="text-white font-bold">3</Text>
            </View>
            <Text className="text-xs text-gray-500">Save</Text>
          </View>
        </View>
      </View>

      {/* Booking Form */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Purpose */}
        <View className="mb-4">
          <Text className="text-gray-700 font-medium text-sm mb-2">
            Purpose
          </Text>
          <TouchableOpacity
            className="border border-gray-200 rounded-xl p-4 flex-row justify-between items-center"
            style={{ backgroundColor: "#DEEBF8" }}
            onPress={() => setShowPurposeDropdown(true)}
            activeOpacity={0.7}
          >
            <Text className={purpose ? "text-gray-900" : "text-gray-400"}>
              {purpose || "Select purpose"}
            </Text>
            <ChevronDown size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Police Station */}
        <View className="mb-4">
          <Text className="text-gray-700 font-medium text-sm mb-2">
            Select police station
          </Text>
          <TouchableOpacity
            className="border border-gray-200 rounded-xl p-4 flex-row justify-between items-center"
            style={{ backgroundColor: "#DEEBF8" }}
            onPress={() => setShowStationDropdown(true)}
            activeOpacity={0.7}
          >
            <Text
              className={
                station ? "text-gray-900 flex-1" : "text-gray-400 flex-1"
              }
              numberOfLines={1}
            >
              {station || "Select police station"}
            </Text>
            <ChevronDown size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Appointment Date */}
        <View className="mb-5">
          <Text className="text-gray-700 font-medium text-sm mb-2">
            Appointment date
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dates.map((date) => (
              <TouchableOpacity
                key={date.day}
                className={`mr-3 px-5 py-3 rounded-xl border ${
                  selectedDate === date.day
                    ? "bg-indigo-600 border-indigo-600"
                    : "bg-white border-gray-200"
                }`}
                onPress={() => setSelectedDate(date.day)}
                activeOpacity={0.7}
              >
                <Text
                  className={`text-lg font-semibold ${
                    selectedDate === date.day ? "text-white" : "text-gray-900"
                  }`}
                >
                  {date.day}
                </Text>
                <Text
                  className={`text-xs ${
                    selectedDate === date.day ? "text-white" : "text-gray-500"
                  }`}
                >
                  {date.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Time Slots */}
        <View className="mb-4">
          <Text className="text-gray-700 font-medium text-sm mb-2">
            Morning
          </Text>
          <View className="flex-row flex-wrap">
            {timeSlots.morning.map((time) => (
              <TouchableOpacity
                key={time}
                className={`mr-2 mb-2 px-6 py-3 rounded-xl border ${
                  selectedTime === time && timeSlot === "A.M"
                    ? "bg-indigo-600 border-indigo-600"
                    : "bg-white border-gray-200"
                }`}
                onPress={() => {
                  setSelectedTime(time);
                  setTimeSlot("A.M");
                }}
                activeOpacity={0.7}
              >
                <Text
                  className={
                    selectedTime === time && timeSlot === "A.M"
                      ? "text-white font-medium"
                      : "text-gray-700"
                  }
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 font-medium text-sm mb-2">
            Afternoon
          </Text>
          <View className="flex-row flex-wrap">
            {timeSlots.afternoon.map((time) => (
              <TouchableOpacity
                key={time}
                className={`mr-2 mb-2 px-6 py-3 rounded-xl border ${
                  selectedTime === time && timeSlot === "P.M"
                    ? "bg-indigo-600 border-indigo-600"
                    : "bg-white border-gray-200"
                }`}
                onPress={() => {
                  setSelectedTime(time);
                  setTimeSlot("P.M");
                }}
                activeOpacity={0.7}
              >
                <Text
                  className={
                    selectedTime === time && timeSlot === "P.M"
                      ? "text-white font-medium"
                      : "text-gray-700"
                  }
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Price and Proceed */}
        <View
          className="flex-row items-center justify-between mb-8 pb-4 rounded-2xl px-4 py-4"
          style={{ backgroundColor: "#DEEBF8", zIndex: 20 }}
        >
          <Text className="text-2xl font-bold text-gray-900">₱250.00</Text>
          <TouchableOpacity
            className="bg-indigo-600 rounded-xl px-12 py-4 shadow-md z-20"
            onPress={handleProceed}
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold text-base">Proceed</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="bg-white border-t border-gray-200 flex-row justify-around py-3">
        <TouchableOpacity className="items-center">
          <Home size={24} color="#9CA3AF" />
          <Text className="text-xs text-gray-500 mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Search size={24} color="#9CA3AF" />
          <Text className="text-xs text-gray-500 mt-1">Inquire</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <FileText size={24} color="#312E81" />
          <Text className="text-xs text-indigo-900 mt-1">Clearance</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <User size={24} color="#9CA3AF" />
          <Text className="text-xs text-gray-500 mt-1">Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Purpose Dropdown */}
      <Modal visible={showPurposeDropdown} transparent animationType="fade">
        <Pressable
          className="flex-1 bg-black/50 justify-center items-center"
          onPress={() => setShowPurposeDropdown(false)}
        >
          <View className="bg-white rounded-2xl w-4/5 max-h-96 overflow-hidden">
            <ScrollView>
              {purposes.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="p-4 border-b border-gray-100 active:bg-gray-50"
                  onPress={() => {
                    setPurpose(item);
                    setShowPurposeDropdown(false);
                  }}
                >
                  <Text className="text-gray-900 text-base">{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>

      {/* Station Dropdown */}
      <Modal visible={showStationDropdown} transparent animationType="fade">
        <Pressable
          className="flex-1 bg-black/50 justify-center items-center"
          onPress={() => setShowStationDropdown(false)}
        >
          <View className="bg-white rounded-2xl w-4/5 max-h-96 overflow-hidden">
            <ScrollView>
              {policeStations.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="p-4 border-b border-gray-100 active:bg-gray-50"
                  onPress={() => {
                    setStation(item);
                    setShowStationDropdown(false);
                  }}
                >
                  <Text className="text-gray-900 text-base">{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmation}
        transparent
        animationType="slide"
        onRequestClose={() => setShowConfirmation(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white rounded-t-3xl p-6 items-center">
            <View className="items-center pb-2 mb-10">
              <View className="w-40 h-2 bg-gray-200 rounded-full" />
            </View>
            <Text className="text-lg font-semibold mb-3">
              Confirm Appointment
            </Text>
            <Text className="text-gray-700 text-center mb-1">
              {`10/${selectedDate}/2025 ${
                dates.find((d) => d.day === selectedDate)?.label
              }`}
            </Text>
            <Text className="text-indigo-900 text-lg font-bold mb-1">
              {`${selectedTime} ${timeSlot}`}
            </Text>
            <Text className="text-gray-700 text-center mb-6">{station}</Text>

            <TouchableOpacity
              className="bg-indigo-600 px-8 py-3 rounded-xl mb-10"
              onPress={handleConfirm}
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold text-base">
                Confirm and Proceed
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal
        visible={showSuccess}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSuccess(false)}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white rounded-t-3xl p-6 items-center">
            <View className="items-center pb-2 mb-10">
              <View className="w-40 h-2 bg-gray-200 rounded-full" />
            </View>
            <Text className="text-lg font-semibold mb-3">
              Appointment Saved
            </Text>
            <Text className="text-gray-700 text-center mb-6">
              Your appointment has been successfully booked. Continue to
              payment.
            </Text>
            <TouchableOpacity
              className="bg-indigo-600 px-8 py-3 mb-10 rounded-xl"
              onPress={handleGoToPayment}
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold text-base">
                Continue to Payment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
