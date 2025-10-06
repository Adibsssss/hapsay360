import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

// Reusable Components
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

const Divider = ({ color }: { color: string }) => (
  <View style={{ height: 1, backgroundColor: color, marginVertical: 16 }} />
);

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
        color: color,
      }}
    />
  </View>
);

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

export default function applicationform() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? "#1a1f4d" : "#ffffff";
  const textColor = isDark ? "#ffffff" : "#1f2937";
  const dividerColor = isDark ? "#4b5563" : "#d1d5db";
  const buttonColor = isDark ? "#3b82f6" : "#1a1f4d";

  // Personal Info
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

  // Contact / Address
  const [houseNo, setHouseNo] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [barangay, setBarangay] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [telephone, setTelephone] = useState("");

  // Other Info
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [complexion, setComplexion] = useState("");
  const [identifyingMarks, setIdentifyingMarks] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [religion, setReligion] = useState("");
  const [education, setEducation] = useState("");
  const [occupation, setOccupation] = useState("");

  // Family
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

  const handleSaveProfile = () => {
    const profile = {
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
      houseNo,
      province,
      city,
      barangay,
      email,
      mobile,
      telephone,
      height,
      weight,
      complexion,
      identifyingMarks,
      bloodType,
      religion,
      education,
      occupation,
      fatherGiven,
      fatherMiddle,
      fatherSurname,
      fatherQualifier,
      fatherBirthPlace,
      fatherOtherCountry,
      motherGiven,
      motherMiddle,
      motherSurname,
      motherQualifier,
      motherBirthPlace,
      motherOtherCountry,
      spouseGiven,
      spouseMiddle,
      spouseSurname,
      spouseQualifier,
    };
    console.log(profile);
    router.push("/(tabs)");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: bgColor }}
      edges={["left", "right"]}
    >
      {/* Header */}
      <LinearGradient
        colors={["#3b3b8a", "#141545"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          paddingHorizontal: 16,
          paddingTop: 55,
          paddingBottom: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          className="mr-4"
          onPress={() => router.back()}
          style={{ padding: 4 }}
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
          Application Form
        </Text>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Section: Personal Info */}
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
        <InputField
          label="Qualifier"
          value={qualifier}
          onChangeText={setQualifier}
          color={textColor}
        />
        <InputField
          label="Sex"
          value={sex}
          onChangeText={setSex}
          color={textColor}
        />
        <InputField
          label="Civil Status"
          value={civilStatus}
          onChangeText={setCivilStatus}
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

        {/* Other Information */}
        <SectionTitle color={textColor}>Other Information</SectionTitle>

        {/* Two-column: Height & Weight */}
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
        {/* Father */}
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

        {/* Mother */}
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

        {/* Spouse */}
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

        {/* Save Profile Button */}
        <Button
          label="Save Profile"
          onPress={handleSaveProfile}
          bgColor={buttonColor}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
