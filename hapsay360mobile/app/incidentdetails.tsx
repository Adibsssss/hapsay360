import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Shield } from "lucide-react-native";
import GradientHeader from "./components/GradientHeader";

export default function IncidentDetails() {
  const router = useRouter();
  const [incidentType, setIncidentType] = useState("Theft");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Separate state for incident location and user location
  const [incidentLocation, setIncidentLocation] = useState({
    latitude: 8.4542,
    longitude: 124.6319,
  });
  const [userLocation, setUserLocation] = useState(null);

  const [description, setDescription] = useState("");
  const [locationLoaded, setLocationLoaded] = useState(false);

  const [attachments, setAttachments] = useState({
    photos: [],
    videos: [],
    documents: [],
  });

  const MAX_ATTACHMENTS = 5;

  // Police Stations Data
  const policeStations = [
    {
      id: 1,
      name: "Police Station 1 (Centro)",
      latitude: 8.4829,
      longitude: 124.6503,
      address: "Corrales Avenue, Centro, Cagayan de Oro City",
    },
    {
      id: 2,
      name: "Police Station 2 (Carmen)",
      latitude: 8.4947,
      longitude: 124.6419,
      address: "Carmen, Cagayan de Oro City",
    },
    {
      id: 3,
      name: "Police Station 3 (Lapasan)",
      latitude: 8.5089,
      longitude: 124.6247,
      address: "Lapasan, Cagayan de Oro City",
    },
    {
      id: 4,
      name: "Police Station 4 (Nazareth)",
      latitude: 8.4589,
      longitude: 124.6278,
      address: "Nazareth, Cagayan de Oro City",
    },
    {
      id: 5,
      name: "Police Station 5 (Gusa)",
      latitude: 8.4831,
      longitude: 124.6108,
      address: "Gusa, Cagayan de Oro City",
    },
    {
      id: 6,
      name: "Police Station 6 (Kauswagan)",
      latitude: 8.4503,
      longitude: 124.6186,
      address: "Kauswagan, Cagayan de Oro City",
    },
    {
      id: 7,
      name: "Police Station 7 (Bulua)",
      latitude: 8.517,
      longitude: 124.647,
      address: "Bulua, Cagayan de Oro City",
    },
  ];

  const [selectedStation, setSelectedStation] = useState(null);
  const [stationDistance, setStationDistance] = useState(null);
  const [stationTime, setStationTime] = useState(null);

  // Calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Find and select nearest station
  const findNearestStation = () => {
    if (!locationLoaded) return;

    let nearest = policeStations[0];
    let minDistance = calculateDistance(
      incidentLocation.latitude,
      incidentLocation.longitude,
      policeStations[0].latitude,
      policeStations[0].longitude
    );

    policeStations.forEach((station) => {
      const dist = calculateDistance(
        incidentLocation.latitude,
        incidentLocation.longitude,
        station.latitude,
        station.longitude
      );
      if (dist < minDistance) {
        minDistance = dist;
        nearest = station;
      }
    });

    setSelectedStation(nearest);
    setStationDistance(minDistance.toFixed(1));
    const estimatedTime = Math.round((minDistance / 30) * 60);
    setStationTime(estimatedTime);
  };

  // Location Permission
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Location permission is required to show your current position."
          );
          return;
        }
        const currentLocation = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        };

        // Set both user location and initial incident location to current position
        setUserLocation(coords);
        setIncidentLocation(coords);
        setLocationLoaded(true);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // Auto-select nearest station when location loads
  useEffect(() => {
    if (locationLoaded) {
      findNearestStation();
    }
  }, [locationLoaded]);

  // Request Camera & Media Permissions
  const requestCameraPermissions = async () => {
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    const mediaLibraryStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus.status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Camera permission is required to take photos or videos."
      );
      return false;
    }
    if (mediaLibraryStatus.status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Media library permission is required to select photos or videos."
      );
      return false;
    }
    return true;
  };

  // Upload Handlers
  const handlePhotoUpload = async (fromCamera = false) => {
    if (attachments.photos.length >= MAX_ATTACHMENTS) {
      Alert.alert("Limit Reached", "You can upload a maximum of 5 photos.");
      return;
    }
    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) return;

    try {
      const result = fromCamera
        ? await ImagePicker.launchCameraAsync({
            mediaTypes: "Images",
            quality: 0.7,
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images",
            quality: 0.7,
          });
      if (!result.canceled) {
        setAttachments((prev) => ({
          ...prev,
          photos: [...prev.photos, result.assets[0].uri],
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleVideoUpload = async (fromCamera = false) => {
    if (attachments.videos.length >= MAX_ATTACHMENTS) {
      Alert.alert("Limit Reached", "You can upload a maximum of 5 videos.");
      return;
    }
    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) return;

    try {
      const result = fromCamera
        ? await ImagePicker.launchCameraAsync({
            mediaTypes: "Videos",
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Videos",
          });
      if (!result.canceled) {
        setAttachments((prev) => ({
          ...prev,
          videos: [...prev.videos, result.assets[0].uri],
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDocumentUpload = async () => {
    if (attachments.documents.length >= MAX_ATTACHMENTS) {
      Alert.alert("Limit Reached", "You can upload a maximum of 5 documents.");
      return;
    }
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const document = result.assets[0];
        setAttachments((prev) => ({
          ...prev,
          documents: [
            ...prev.documents,
            { uri: document.uri, name: document.name },
          ],
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Show Upload Options
  const showUploadOptions = (type) => {
    const buttons = [];

    if (type === "photo") {
      buttons.push(
        {
          text: "Use Camera",
          onPress: () => handlePhotoUpload(true),
        },
        {
          text: "Browse Files",
          onPress: () => handlePhotoUpload(false),
        }
      );
    } else if (type === "video") {
      buttons.push(
        {
          text: "Use Camera",
          onPress: () => handleVideoUpload(true),
        },
        {
          text: "Browse Files",
          onPress: () => handleVideoUpload(false),
        }
      );
    } else if (type === "document") {
      buttons.push({
        text: "Browse Files",
        onPress: () => handleDocumentUpload(),
      });
    }

    buttons.push({ text: "Cancel", style: "cancel" });

    Alert.alert(
      `Upload ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      "Choose an option",
      buttons
    );
  };

  const handleNext = () => {
    if (!incidentType || !date || !time || !description) {
      alert("Please fill out all fields before proceeding.");
      return;
    }
    if (!selectedStation) {
      alert("Please select a police station before proceeding.");
      return;
    }

    router.push({
      pathname: "/submitincident",
      params: {
        incidentType,
        date,
        time,
        description,
        latitude: incidentLocation.latitude,
        longitude: incidentLocation.longitude,
        stationName: selectedStation.name,
        stationAddress: selectedStation.address,
        stationDistance,
        stationTime,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["left", "right"]}>
      <GradientHeader title="File Blotter" onBack={() => router.back()} />
      <ScrollView className="px-4 py-6 bg-white">
        {/* Title */}
        <View className="items-center pt-4 pb-6">
          <Text className="text-blue-900 text-3xl font-bold">
            Incident Details
          </Text>
        </View>

        {/* Incident Type Dropdown */}
        <Text className="mb-2 text-gray-700 font-medium">Incident Type</Text>
        <TouchableOpacity
          onPress={() => setDropdownOpen(!dropdownOpen)}
          className="border border-gray-300 rounded-lg px-3 py-2 mb-2 bg-white flex-row justify-between items-center"
        >
          <Text>{incidentType}</Text>
          <Text style={{ fontSize: 16 }}>▼</Text>
        </TouchableOpacity>
        {dropdownOpen && (
          <View className="border border-gray-300 rounded-lg mb-4 bg-white">
            {["Theft", "Assault", "Accident", "Other"].map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => {
                  setIncidentType(type);
                  setDropdownOpen(false);
                }}
                className="px-3 py-2 hover:bg-gray-100"
              >
                <Text>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Date & Time */}
        <Text className="mb-2 text-gray-700 font-medium">Date of Incident</Text>
        <TextInput
          placeholder="e.g. 15-10-2025"
          value={date}
          onChangeText={setDate}
          className="border border-gray-300 rounded-lg px-3 py-2 mb-4 bg-white"
        />
        <Text className="mb-2 text-gray-700 font-medium">Time of Incident</Text>
        <TextInput
          placeholder="e.g. 03:30 PM"
          value={time}
          onChangeText={setTime}
          className="border border-gray-300 rounded-lg px-3 py-2 mb-4 bg-white"
        />

        {/* Location Map - Incident Location */}
        <Text className="mb-2 text-gray-700 font-medium">
          Incident Location (Drag to adjust)
        </Text>
        {locationLoaded ? (
          <Text className="mb-2 text-gray-600 text-sm">
            Lat: {incidentLocation.latitude.toFixed(6)}, Lng:{" "}
            {incidentLocation.longitude.toFixed(6)}
          </Text>
        ) : (
          <Text className="mb-2 text-gray-600">
            Loading current location...
          </Text>
        )}
        <View className="h-64 mb-6 rounded-xl overflow-hidden">
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            region={{
              latitude: incidentLocation.latitude,
              longitude: incidentLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation
            showsMyLocationButton
          >
            {/* Draggable Incident Location Marker */}
            <Marker
              coordinate={incidentLocation}
              draggable
              onDragEnd={(e) => {
                setIncidentLocation(e.nativeEvent.coordinate);
                // Auto-update nearest station when incident location changes
                setTimeout(() => findNearestStation(), 100);
              }}
              title="Incident Location"
              description="Drag to adjust location"
            >
              <View className="items-center">
                <View className="bg-red-600 w-12 h-12 rounded-full items-center justify-center shadow-lg border-4 border-white">
                  <View className="w-3 h-3 bg-white rounded-full" />
                </View>
              </View>
            </Marker>
          </MapView>
        </View>

        {/* Description */}
        <Text className="mb-2 text-gray-700 font-medium">Description</Text>
        <TextInput
          placeholder="Enter detailed description"
          value={description}
          onChangeText={setDescription}
          multiline
          className="border border-gray-300 rounded-lg px-3 py-4 mb-6 bg-white h-40 text-base"
        />

        {/* Attachments Section */}
        <Text className="mb-2 text-gray-700 font-medium">
          Attachments / Evidence (3-5)
        </Text>
        <View className="flex-row justify-between mb-4">
          <TouchableOpacity
            onPress={() => showUploadOptions("photo")}
            className="flex-1 bg-indigo-600 border border-indigo-600 rounded-lg py-3 mr-2 items-center shadow-sm"
          >
            <Text className="text-white font-medium">📸 Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showUploadOptions("video")}
            className="flex-1 bg-indigo-600 border border-indigo-600 rounded-lg py-3 mx-1 items-center shadow-sm"
          >
            <Text className="text-white font-medium">🎥 Video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showUploadOptions("document")}
            className="flex-1 bg-indigo-600 border border-indigo-600 rounded-lg py-3 ml-2 items-center shadow-sm"
          >
            <Text className="text-white font-medium">📄 Document</Text>
          </TouchableOpacity>
        </View>

        {/* Uploaded Attachments */}
        {attachments.photos.length > 0 && (
          <View className="mb-4">
            <Text className="text-gray-600 font-medium mb-2">Photos</Text>
            <FlatList
              horizontal
              data={attachments.photos}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={{
                    width: 100,
                    height: 100,
                    marginRight: 8,
                    borderRadius: 8,
                  }}
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}

        {attachments.videos.length > 0 && (
          <View className="mb-4">
            <Text className="text-gray-600 font-medium mb-2">Videos</Text>
            <FlatList
              horizontal
              data={attachments.videos}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View
                  className="bg-gray-100 px-3 py-2 mr-2 rounded-lg items-center justify-center"
                  style={{ minWidth: 100 }}
                >
                  <Text className="text-blue-600 underline">
                    {item.split("/").pop()}
                  </Text>
                </View>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}

        {attachments.documents.length > 0 && (
          <View className="mb-6">
            <Text className="text-gray-600 font-medium mb-2">Documents</Text>
            {attachments.documents.map((item, index) => (
              <View
                key={index}
                className="bg-gray-100 px-3 py-2 mb-2 rounded-lg"
              >
                <Text className="text-blue-600 underline">{item.name}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Select Police Station */}
        <Text className="mb-2 text-gray-700 font-medium text-lg">
          Select Police Station
        </Text>

        {selectedStation && (
          <View className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <View className="flex-row items-start mb-3">
              <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-3">
                <View className="w-10 h-10 bg-blue-900 rounded-full items-center justify-center">
                  <Shield size={20} color="white" />
                </View>
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-gray-900 mb-1">
                  {selectedStation.name}
                </Text>
                <Text className="text-sm text-gray-600">
                  {selectedStation.address}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between border-t border-blue-200 pt-3">
              <View className="flex-1">
                <Text className="text-xs text-gray-500 mb-1">
                  Estimated time
                </Text>
                <Text className="text-sm font-semibold text-gray-900">
                  {stationTime} mins
                </Text>
              </View>
              <View className="flex-1 items-end">
                <Text className="text-xs text-gray-500 mb-1">Distance</Text>
                <Text className="text-sm font-semibold text-gray-900">
                  {stationDistance} km
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Police Station Map */}
        <View className="h-80 mb-4 rounded-xl overflow-hidden">
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            region={{
              latitude: incidentLocation.latitude,
              longitude: incidentLocation.longitude,
              latitudeDelta: 0.15,
              longitudeDelta: 0.15,
            }}
            showsUserLocation
            showsMyLocationButton
          >
            {/* User Location Marker (if available) */}
            {userLocation && (
              <Marker
                coordinate={userLocation}
                title="Your Current Location"
                description="You are here"
              >
                <View className="items-center">
                  <View className="bg-blue-500 w-10 h-10 rounded-full items-center justify-center shadow-lg border-4 border-white">
                    <View className="w-2 h-2 bg-white rounded-full" />
                  </View>
                </View>
              </Marker>
            )}

            {/* Incident Location Marker */}
            <Marker
              coordinate={incidentLocation}
              title="Incident Location"
              description="Location of the incident"
            >
              <View className="items-center">
                <View className="bg-red-600 w-12 h-12 rounded-full items-center justify-center shadow-lg border-4 border-white">
                  <View className="w-3 h-3 bg-white rounded-full" />
                </View>
              </View>
            </Marker>

            {/* Police Station Markers */}
            {policeStations.map((station) => (
              <Marker
                key={station.id}
                coordinate={{
                  latitude: station.latitude,
                  longitude: station.longitude,
                }}
                title={station.name}
                description={station.address}
                onPress={() => {
                  setSelectedStation(station);
                  const dist = calculateDistance(
                    incidentLocation.latitude,
                    incidentLocation.longitude,
                    station.latitude,
                    station.longitude
                  );
                  setStationDistance(dist.toFixed(1));
                  const estimatedTime = Math.round((dist / 30) * 60);
                  setStationTime(estimatedTime);
                }}
              >
                <View className="items-center">
                  <View
                    className={`w-14 h-14 rounded-full items-center justify-center shadow-lg border-4 border-white ${
                      selectedStation?.id === station.id
                        ? "bg-blue-900"
                        : "bg-gray-600"
                    }`}
                  >
                    <Shield size={24} color="white" />
                  </View>
                </View>
              </Marker>
            ))}
          </MapView>
        </View>

        <TouchableOpacity
          onPress={findNearestStation}
          className="bg-white border-2 border-indigo-600 rounded-xl py-3 mb-6"
        >
          <Text className="text-indigo-600 text-center font-semibold text-base">
            Find Nearest Station
          </Text>
        </TouchableOpacity>

        {/* Submit */}
        <TouchableOpacity
          onPress={handleNext}
          className="bg-indigo-600 rounded-xl py-4 mb-6"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Submit
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
