import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  useColorScheme,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GradientHeader from "./components/GradientHeader";

// Section Title Component
const SectionTitle = ({
  children,
  color,
}: {
  children: string;
  color: string;
}) => (
  <Text
    style={{
      color,
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
      marginVertical: 12,
    }}
  >
    {children}
  </Text>
);

// Divider Component
const Divider = ({ color }: { color: string }) => (
  <View style={{ height: 1, backgroundColor: color, marginVertical: 16 }} />
);

// Text Input Field
const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  color,
  style,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  color: string;
  style?: object;
}) => (
  <View style={[{ marginBottom: 16, flex: 1 }, style]}>
    <Text style={{ color, marginBottom: 4 }}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={`${color}99`}
      style={{
        borderWidth: 1,
        borderColor: color,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        color,
      }}
    />
  </View>
);

// Checkbox Component
const Checkbox = ({
  label,
  value,
  onToggle,
  color,
}: {
  label: string;
  value: boolean;
  onToggle: () => void;
  color: string;
}) => (
  <Pressable
    onPress={onToggle}
    style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
  >
    <Ionicons
      name={value ? "checkmark-circle" : "ellipse-outline"}
      size={24}
      color={value ? color : "#999"}
      style={{ marginRight: 8 }}
    />
    <Text style={{ color, fontSize: 14 }}>{label}</Text>
  </Pressable>
);

// Button Component
const Button = ({
  label,
  onPress,
  disabled,
  bgColor,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  bgColor: string;
}) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    style={{
      backgroundColor: disabled ? "#999" : bgColor,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: "center",
      marginVertical: 24,
      opacity: disabled ? 0.6 : 1,
    }}
  >
    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
      {label}
    </Text>
  </Pressable>
);

// Option Selector Component
const OptionSelector = ({
  label,
  options,
  selected,
  onSelect,
  color,
}: {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  color: string;
}) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={{ color, marginBottom: 4 }}>{label}</Text>
    {options.map((opt) => (
      <Pressable
        key={opt}
        onPress={() => onSelect(opt)}
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
      >
        <Ionicons
          name={selected === opt ? "checkmark-circle" : "ellipse-outline"}
          size={24}
          color={selected === opt ? color : "#999"}
          style={{ marginRight: 8 }}
        />
        <Text style={{ color }}>{opt}</Text>
      </Pressable>
    ))}
  </View>
);

// Helper to format ISO date to MM/DD/YYYY
const formatDateToLocal = (isoDate: string) => {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
};

export default function ApplicationForm() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? "#1a1f4d" : "#ffffff";
  const textColor = isDark ? "#ffffff" : "#141545";
  const dividerColor = isDark ? "#4b5563" : "#d1d5db";
  const buttonColor = isDark ? "#3b82f6" : "#1a1f4d";

  const [loading, setLoading] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const [hasExistingProfile, setHasExistingProfile] = useState(false);

  // ---------------- Personal Info ----------------
  const [givenName, setGivenName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [surname, setSurname] = useState("");
  const [qualifier, setQualifier] = useState("");
  const [sex, setSex] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [isPWD, setIsPWD] = useState(false);
  const [isFirstTimeJobSeeker, setIsFirstTimeJobSeeker] = useState(false);
  const [nationality, setNationality] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [otherCountry, setOtherCountry] = useState("");

  // ---------------- Contact / Address ----------------
  const [houseNo, setHouseNo] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [barangay, setBarangay] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [telephone, setTelephone] = useState("");

  // ---------------- Other Info ----------------
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [complexion, setComplexion] = useState("");
  const [identifyingMarks, setIdentifyingMarks] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [religion, setReligion] = useState("");
  const [education, setEducation] = useState("");
  const [occupation, setOccupation] = useState("");

  // ---------------- Family ----------------
  const [fatherGiven, setFatherGiven] = useState("");
  const [fatherMiddle, setFatherMiddle] = useState("");
  const [fatherSurname, setFatherSurname] = useState("");
  const [fatherQualifier, setFatherQualifier] = useState("");
  const [fatherBirthPlace, setFatherBirthPlace] = useState("");
  const [fatherOtherCountry, setFatherOtherCountry] = useState("");

  const [motherGiven, setMotherGiven] = useState("");
  const [motherMiddle, setMotherMiddle] = useState("");
  const [motherSurname, setMotherSurname] = useState("");
  const [motherQualifier, setMotherQualifier] = useState("");
  const [motherBirthPlace, setMotherBirthPlace] = useState("");
  const [motherOtherCountry, setMotherOtherCountry] = useState("");

  const [spouseGiven, setSpouseGiven] = useState("");
  const [spouseMiddle, setSpouseMiddle] = useState("");
  const [spouseSurname, setSpouseSurname] = useState("");
  const [spouseQualifier, setSpouseQualifier] = useState("");

  // ---------------- Helper ----------------
  const getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      return token;
    } catch (error) {
      console.error("Error getting auth token:", error);
      return null;
    }
  };

  // ---------------- Load Profile ----------------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = await getAuthToken();
        if (!token) {
          Alert.alert("Error", "Please login again");
          router.push("/login");
          return;
        }

        const res = await fetch(
          "http://192.168.1.48:3000/api/application/get",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          if (res.status === 401) {
            Alert.alert("Session Expired", "Please login again");
            router.push("/login");
            return;
          }
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();

        if (data.profile && data.profile.personal_info?.givenName) {
          setHasExistingProfile(true);
          Alert.alert(
            "Profile Found",
            "Your previously saved information has been loaded. You can edit and update it."
          );

          const p = data.profile;
          setGivenName(p.personal_info?.givenName || "");
          setMiddleName(p.personal_info?.middleName || "");
          setSurname(p.personal_info?.surname || "");
          setQualifier(p.personal_info?.qualifier || "");
          setSex(p.personal_info?.sex || "");
          setCivilStatus(p.personal_info?.civilStatus || "");
          setBirthdate(formatDateToLocal(p.personal_info?.birthdate || ""));
          setIsPWD(p.personal_info?.isPWD || false);
          setIsFirstTimeJobSeeker(
            p.personal_info?.isFirstTimeJobSeeker || false
          );
          setNationality(p.personal_info?.nationality || "");
          setBirthPlace(p.personal_info?.birthPlace || "");
          setOtherCountry(p.personal_info?.otherCountry || "");

          // contact
          setHouseNo(p.address?.houseNo || "");
          setProvince(p.address?.province || "");
          setCity(p.address?.city || "");
          setBarangay(p.address?.barangay || "");
          setEmail(p.address?.email || "");
          setMobile(p.address?.mobile || "");
          setTelephone(p.address?.telephone || "");

          // other info
          setHeight(p.other_info?.height || "");
          setWeight(p.other_info?.weight || "");
          setComplexion(p.other_info?.complexion || "");
          setIdentifyingMarks(p.other_info?.identifyingMarks || "");
          setBloodType(p.other_info?.bloodType || "");
          setReligion(p.other_info?.religion || "");
          setEducation(p.other_info?.education || "");
          setOccupation(p.other_info?.occupation || "");

          // family
          setFatherGiven(p.family?.father?.given || "");
          setFatherMiddle(p.family?.father?.middle || "");
          setFatherSurname(p.family?.father?.surname || "");
          setFatherQualifier(p.family?.father?.qualifier || "");
          setFatherBirthPlace(p.family?.father?.birthPlace || "");
          setFatherOtherCountry(p.family?.father?.otherCountry || "");

          setMotherGiven(p.family?.mother?.given || "");
          setMotherMiddle(p.family?.mother?.middle || "");
          setMotherSurname(p.family?.mother?.surname || "");
          setMotherQualifier(p.family?.mother?.qualifier || "");
          setMotherBirthPlace(p.family?.mother?.birthPlace || "");
          setMotherOtherCountry(p.family?.mother?.otherCountry || "");

          setSpouseGiven(p.family?.spouse?.given || "");
          setSpouseMiddle(p.family?.spouse?.middle || "");
          setSpouseSurname(p.family?.spouse?.surname || "");
          setSpouseQualifier(p.family?.spouse?.qualifier || "");
        } else {
          setHasExistingProfile(false);
        }

        setUserLoaded(true);
      } catch (err: any) {
        console.error(err);
        Alert.alert("Error", "Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ---------------- Save Profile ----------------
  const handleSaveProfile = async () => {
    if (!givenName || !surname || !email) {
      Alert.alert(
        "Validation Error",
        "Please fill in your given name, surname, and email."
      );
      return;
    }

    const profile = {
      personal_info: {
        givenName,
        middleName,
        surname,
        qualifier,
        sex,
        civilStatus,
        birthdate,
        isPWD,
        isFirstTimeJobSeeker,
        nationality,
        birthPlace,
        otherCountry,
      },
      address: { houseNo, province, city, barangay, email, mobile, telephone },
      other_info: {
        height,
        weight,
        complexion,
        identifyingMarks,
        bloodType,
        religion,
        education,
        occupation,
      },
      family: {
        father: {
          given: fatherGiven,
          middle: fatherMiddle,
          surname: fatherSurname,
          qualifier: fatherQualifier,
          birthPlace: fatherBirthPlace,
          otherCountry: fatherOtherCountry,
        },
        mother: {
          given: motherGiven,
          middle: motherMiddle,
          surname: motherSurname,
          qualifier: motherQualifier,
          birthPlace: motherBirthPlace,
          otherCountry: motherOtherCountry,
        },
        spouse: {
          given: spouseGiven,
          middle: spouseMiddle,
          surname: spouseSurname,
          qualifier: spouseQualifier,
        },
      },
    };

    try {
      setLoading(true);
      const token = await getAuthToken();
      if (!token) {
        Alert.alert("Error", "Please login again");
        router.push("/login");
        return;
      }

      const res = await fetch("http://192.168.1.48:3000/api/application/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      if (!res.ok) {
        if (res.status === 401) {
          Alert.alert("Session Expired", "Please login again");
          router.push("/login");
          return;
        }
        const errData = await res.json();
        throw new Error(errData.message || "Server error");
      }

      const result = await res.json();
      Alert.alert(
        "Success",
        hasExistingProfile
          ? "Profile updated successfully!"
          : "Profile saved successfully!",
        [
          {
            text: "OK",
            onPress: () => router.push("/bookpoliceclearancescreen"),
          },
        ]
      );
    } catch (err: any) {
      console.error(err);
      Alert.alert("Error", `Failed to save profile: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!userLoaded) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: textColor, fontSize: 16 }}>
            Loading your profile...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: bgColor }}
      edges={["left", "right"]}
    >
      <GradientHeader title="Application Form" onBack={() => router.back()} />
      <KeyboardAwareScrollView
        style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Personal Info */}
        <SectionTitle color={textColor}>Application Profile</SectionTitle>
        <InputField
          label="Given Name"
          value={givenName}
          onChangeText={setGivenName}
          color={textColor}
        />
        <InputField
          label="Middle Name"
          value={middleName}
          onChangeText={setMiddleName}
          color={textColor}
        />
        <InputField
          label="Surname"
          value={surname}
          onChangeText={setSurname}
          color={textColor}
        />
        <OptionSelector
          label="Qualifier"
          options={["Jr", "Sr", "N/A"]}
          selected={qualifier}
          onSelect={setQualifier}
          color={textColor}
        />
        <OptionSelector
          label="Sex"
          options={["Male", "Female", "Other"]}
          selected={sex}
          onSelect={setSex}
          color={textColor}
        />
        <OptionSelector
          label="Civil Status"
          options={["Single", "Married", "Widowed", "Divorced", "N/A"]}
          selected={civilStatus}
          onSelect={setCivilStatus}
          color={textColor}
        />
        <InputField
          label="Birthdate (MM/DD/YYYY)"
          value={birthdate}
          onChangeText={setBirthdate}
          color={textColor}
          placeholder="MM/DD/YYYY"
        />
        <Checkbox
          label="I am a PWD"
          value={isPWD}
          onToggle={() => setIsPWD(!isPWD)}
          color={textColor}
        />
        <Checkbox
          label="I am a first-time job seeker"
          value={isFirstTimeJobSeeker}
          onToggle={() => setIsFirstTimeJobSeeker(!isFirstTimeJobSeeker)}
          color={textColor}
        />
        <InputField
          label="Nationality"
          value={nationality}
          onChangeText={setNationality}
          color={textColor}
        />
        <InputField
          label="Birth Place"
          value={birthPlace}
          onChangeText={setBirthPlace}
          color={textColor}
        />
        <InputField
          label="If Other Country"
          value={otherCountry}
          onChangeText={setOtherCountry}
          color={textColor}
        />

        <Divider color={dividerColor} />

        {/* Contact / Address */}
        <SectionTitle color={textColor}>Contact / Address</SectionTitle>
        <InputField
          label="House No / Building / Street"
          value={houseNo}
          onChangeText={setHouseNo}
          color={textColor}
        />
        <InputField
          label="Province"
          value={province}
          onChangeText={setProvince}
          color={textColor}
        />
        <InputField
          label="City / Municipality"
          value={city}
          onChangeText={setCity}
          color={textColor}
        />
        <InputField
          label="Barangay"
          value={barangay}
          onChangeText={setBarangay}
          color={textColor}
        />
        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          color={textColor}
          placeholder="example@mail.com"
        />
        <InputField
          label="Mobile Number"
          value={mobile}
          onChangeText={setMobile}
          color={textColor}
          placeholder="+63"
        />
        <InputField
          label="Telephone Number (optional)"
          value={telephone}
          onChangeText={setTelephone}
          color={textColor}
        />

        <Divider color={dividerColor} />

        {/* Other Info */}
        <SectionTitle color={textColor}>Other Information</SectionTitle>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <InputField
            label="Height (cm)"
            value={height}
            onChangeText={setHeight}
            color={textColor}
            style={{ marginRight: 8 }}
          />
          <InputField
            label="Weight (kg)"
            value={weight}
            onChangeText={setWeight}
            color={textColor}
            style={{ marginLeft: 8 }}
          />
        </View>
        <InputField
          label="Complexion"
          value={complexion}
          onChangeText={setComplexion}
          color={textColor}
        />
        <InputField
          label="Identifying Marks"
          value={identifyingMarks}
          onChangeText={setIdentifyingMarks}
          color={textColor}
        />
        <InputField
          label="Blood Type"
          value={bloodType}
          onChangeText={setBloodType}
          color={textColor}
        />
        <InputField
          label="Religion"
          value={religion}
          onChangeText={setReligion}
          color={textColor}
        />
        <InputField
          label="Educational Attainment"
          value={education}
          onChangeText={setEducation}
          color={textColor}
        />
        <InputField
          label="Occupation"
          value={occupation}
          onChangeText={setOccupation}
          color={textColor}
        />

        <Divider color={dividerColor} />

        {/* Family Background */}
        <SectionTitle color={textColor}>Family Background</SectionTitle>
        <InputField
          label="Father's Given Name"
          value={fatherGiven}
          onChangeText={setFatherGiven}
          color={textColor}
        />
        <InputField
          label="Father's Middle Name"
          value={fatherMiddle}
          onChangeText={setFatherMiddle}
          color={textColor}
        />
        <InputField
          label="Father's Surname"
          value={fatherSurname}
          onChangeText={setFatherSurname}
          color={textColor}
        />
        <InputField
          label="Qualifier"
          value={fatherQualifier}
          onChangeText={setFatherQualifier}
          color={textColor}
        />
        <InputField
          label="Father's Birth Place (City/Municipality)"
          value={fatherBirthPlace}
          onChangeText={setFatherBirthPlace}
          color={textColor}
        />
        <InputField
          label="If Other Country"
          value={fatherOtherCountry}
          onChangeText={setFatherOtherCountry}
          color={textColor}
        />

        <InputField
          label="Mother's Maiden Given Name"
          value={motherGiven}
          onChangeText={setMotherGiven}
          color={textColor}
        />
        <InputField
          label="Mother's Maiden Middle Name"
          value={motherMiddle}
          onChangeText={setMotherMiddle}
          color={textColor}
        />
        <InputField
          label="Mother's Maiden Surname"
          value={motherSurname}
          onChangeText={setMotherSurname}
          color={textColor}
        />
        <InputField
          label="Qualifier"
          value={motherQualifier}
          onChangeText={setMotherQualifier}
          color={textColor}
        />
        <InputField
          label="Mother's Birth Place (City/Municipality)"
          value={motherBirthPlace}
          onChangeText={setMotherBirthPlace}
          color={textColor}
        />
        <InputField
          label="If Other Country"
          value={motherOtherCountry}
          onChangeText={setMotherOtherCountry}
          color={textColor}
        />

        <InputField
          label="Spouse Given Name"
          value={spouseGiven}
          onChangeText={setSpouseGiven}
          color={textColor}
        />
        <InputField
          label="Spouse Middle Name"
          value={spouseMiddle}
          onChangeText={setSpouseMiddle}
          color={textColor}
        />
        <InputField
          label="Spouse Surname"
          value={spouseSurname}
          onChangeText={setSpouseSurname}
          color={textColor}
        />
        <InputField
          label="Qualifier"
          value={spouseQualifier}
          onChangeText={setSpouseQualifier}
          color={textColor}
        />

        <Button
          label={
            loading
              ? "Saving..."
              : hasExistingProfile
                ? "Update Profile"
                : "Save Profile"
          }
          onPress={handleSaveProfile}
          disabled={loading}
          bgColor={buttonColor}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
