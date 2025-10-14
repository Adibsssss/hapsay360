import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import GradientHeader from "./components/GradientHeader";

export default function AddAddress() {
  const router = useRouter();

  const [isDefault, setIsDefault] = useState(false);
  const [guide, setGuide] = useState("");
  const [buildingInfo, setBuildingInfo] = useState("");
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const handleConfirm = () => {
    if (
      !guide ||
      !buildingInfo ||
      !fullName ||
      !contactNumber ||
      !address ||
      !city ||
      !region ||
      !postalCode ||
      !country
    ) {
      Alert.alert("Missing Information", "Please fill in all fields.");
      return;
    }
    Alert.alert("Success", "Address saved successfully!");
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["left", "right"]}>
      <StatusBar barStyle="light-content" />

      {/* Reusable Gradient Header */}
      <GradientHeader title="Add Address" onBack={() => router.back()} />

      <ScrollView className="flex-1 px-6 mt-4">
        <Text className="text-gray-700 mb-4 text-base">
          Add your delivery address details below.
        </Text>

        {/* Set as Default */}
        <View
          className="flex-row justify-between items-center mb-3 rounded-xl px-4 py-3"
          style={{ backgroundColor: "#DEEBF8" }}
        >
          <Text className="text-gray-900 font-medium text-base">
            Set as Default
          </Text>
          <Switch
            value={isDefault}
            onValueChange={setIsDefault}
            thumbColor={isDefault ? "#3b3b8a" : "#f4f3f4"}
            trackColor={{ false: "#d1d5db", true: "#a5b4fc" }}
          />
        </View>

        {/* Separator Line */}
        <View
          style={{
            height: 1,
            backgroundColor: "#E5E7EB",
            marginBottom: 30,
            marginTop: 10,
          }}
        />

        {/* Guide (Home, Work, etc.) */}
        <View className="mb-4">
          <Text className="text-gray-700 font-medium mb-2">
            Address Guide (Home, Work, etc.)
          </Text>
          <TextInput
            className="border border-gray-300 rounded-xl p-3"
            style={{ backgroundColor: "#DEEBF8" }}
            placeholder="Enter address guide"
            value={guide}
            onChangeText={setGuide}
          />
        </View>

        {/* Apartment/Suite/Unit/Building Number */}
        <View className="mb-4">
          <Text className="text-gray-700 font-medium mb-2">
            Apartment, Suite, Unit, or Building Number
          </Text>
          <TextInput
            className="border border-gray-300 rounded-xl p-3"
            style={{ backgroundColor: "#DEEBF8" }}
            placeholder="Enter building info"
            value={buildingInfo}
            onChangeText={setBuildingInfo}
          />
        </View>

        {/* Separator Line */}
        <View
          style={{
            height: 1,
            backgroundColor: "#E5E7EB",
            marginBottom: 30,
            marginTop: 10,
          }}
        />

        {/* Full Name */}
        <View className="mb-4">
          <Text className="text-gray-700 font-medium mb-2">Full Name</Text>
          <TextInput
            className="border border-gray-300 rounded-xl p-3"
            style={{ backgroundColor: "#DEEBF8" }}
            placeholder="Enter full name"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        {/* Contact Number */}
        <View className="mb-4">
          <Text className="text-gray-700 font-medium mb-2">Contact Number</Text>
          <TextInput
            className="border border-gray-300 rounded-xl p-3"
            style={{ backgroundColor: "#DEEBF8" }}
            placeholder="Enter contact number"
            keyboardType="phone-pad"
            value={contactNumber}
            onChangeText={setContactNumber}
          />
        </View>

        {/* Address */}
        <View className="mb-4">
          <Text className="text-gray-700 font-medium mb-2">Address</Text>
          <TextInput
            className="border border-gray-300 rounded-xl p-3"
            style={{ backgroundColor: "#DEEBF8" }}
            placeholder="Enter street address"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        {/* Two Column Layout */}
        <View className="flex-row justify-between mb-4">
          <View className="flex-1 mr-2">
            <Text className="text-gray-700 font-medium mb-2">City</Text>
            <TextInput
              className="border border-gray-300 rounded-xl p-3"
              style={{ backgroundColor: "#DEEBF8" }}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />
          </View>
          <View className="flex-1 ml-2">
            <Text className="text-gray-700 font-medium mb-2">Region</Text>
            <TextInput
              className="border border-gray-300 rounded-xl p-3"
              style={{ backgroundColor: "#DEEBF8" }}
              placeholder="Region"
              value={region}
              onChangeText={setRegion}
            />
          </View>
        </View>

        <View className="flex-row justify-between mb-6">
          <View className="flex-1 mr-2">
            <Text className="text-gray-700 font-medium mb-2">Postal Code</Text>
            <TextInput
              className="border border-gray-300 rounded-xl p-3"
              style={{ backgroundColor: "#DEEBF8" }}
              placeholder="Postal Code"
              keyboardType="numeric"
              value={postalCode}
              onChangeText={setPostalCode}
            />
          </View>
          <View className="flex-1 ml-2">
            <Text className="text-gray-700 font-medium mb-2">Country</Text>
            <TextInput
              className="border border-gray-300 rounded-xl p-3"
              style={{ backgroundColor: "#DEEBF8" }}
              placeholder="Country"
              value={country}
              onChangeText={setCountry}
            />
          </View>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity
          className="bg-indigo-600 py-3 rounded-xl mt-5 mb-10"
          onPress={handleConfirm}
          activeOpacity={0.8}
        >
          <Text className="text-white text-center font-semibold text-base">
            Save Address
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
