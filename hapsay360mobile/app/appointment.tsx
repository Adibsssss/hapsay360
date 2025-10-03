import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Reusable Divider
interface DividerProps {
  color: string;
}

const Divider: React.FC<DividerProps> = ({ color }) => (
  <View style={{ height: 1, backgroundColor: color, marginBottom: 24 }} />
);

// Reusable Section Title
interface SectionTitleProps {
  children: React.ReactNode;
  color: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, color }) => (
  <Text className="text-center text-base font-bold mb-3" style={{ color }}>
    {children}
  </Text>
);

// Reusable Paragraph Text
interface ParagraphProps {
  children: React.ReactNode;
  color: string;
  mb?: number;
}

const Paragraph: React.FC<ParagraphProps> = ({ children, color, mb = 4 }) => (
  <Text className={`text-center text-sm leading-5 mb-${mb}`} style={{ color }}>
    {children}
  </Text>
);

// Reusable Bullet Point
interface BulletPointProps {
  children: React.ReactNode;
  color: string;
}

const BulletPoint: React.FC<BulletPointProps> = ({ children, color }) => (
  <View className="flex-row mb-2">
    <Text className="text-sm mr-2" style={{ color }}>
      •
    </Text>
    <Text className="text-sm flex-1 leading-5" style={{ color }}>
      {children}
    </Text>
  </View>
);

// Reusable Forward Icon Item
interface ForwardItemProps {
  children: React.ReactNode;
  color: string;
}

const ForwardItem: React.FC<ForwardItemProps> = ({ children, color }) => (
  <View className="flex-row items-start mb-2">
    <Ionicons
      name="arrow-forward"
      size={16}
      color={color}
      style={{ marginTop: 2, marginRight: 8 }}
    />
    <Text className="text-sm flex-1 leading-5" style={{ color }}>
      {children}
    </Text>
  </View>
);

// Reusable Check Item (for lists with checkmark icons)
interface CheckItemProps {
  children: React.ReactNode;
  color: string;
}

const CheckItem: React.FC<CheckItemProps> = ({ children, color }) => (
  <View className="flex-row items-start mb-2">
    <Ionicons
      name="checkmark"
      size={16}
      color={color}
      style={{ marginTop: 2, marginRight: 8 }}
    />
    <Text className="text-sm flex-1 leading-5" style={{ color }}>
      {children}
    </Text>
  </View>
);

export default function AppointmentTermsScreen() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? "#1a1f4d" : "#ffffff";
  const textPrimary = isDark ? "#ffffff" : "#1f2937";
  const textSecondary = isDark ? "#d1d5db" : "#4b5563";
  const dividerColor = textSecondary;
  const specialBg = isDark ? "#1a1f4d" : "#DEEBF8";
  const buttonBg = isDark ? "#3b82f6" : "#1a1f4d";
  const handleProceed = () => {
    if (accepted) {
      router.push("/applicationform");
    }
  };

  return (
    <SafeAreaView
      className="flex-1"
      edges={["top", "left", "right"]}
      style={{ backgroundColor: bgColor }}
    >
      {/* Header */}
      <View
        className="flex-row items-center px-4 py-4"
        style={{ backgroundColor: "#1a1f4d" }}
      >
        <Pressable className="mr-4" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </Pressable>
        <Text className="text-white text-xl font-semibold">
          Book appointment
        </Text>
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1"
        style={{ backgroundColor: bgColor }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
      >
        {/* Title */}
        <Text
          className="text-center text-xl font-bold mb-6"
          style={{ color: textPrimary }}
        >
          Terms & Conditions
        </Text>

        <Divider color={dividerColor} />

        {/* Validity of Clearance */}
        <SectionTitle color={textPrimary}>Validity of Clearance</SectionTitle>
        <Paragraph color={textSecondary}>
          The National Police Clearance issued will be valid for six (6) months.
        </Paragraph>

        <Divider color={dividerColor} />

        {/* Renewal */}
        <SectionTitle color={textPrimary}>Renewal</SectionTitle>
        <Paragraph color={textSecondary}>
          The National Police Clearance may be renewed without appearance for
          three years from the last appearance, provided that the following
          steps are undertaken by the applicant:
        </Paragraph>

        <View className="mb-6 px-4">
          <BulletPoint color={textSecondary}>
            Update your record details in the NPCs applicant account;
          </BulletPoint>
          <BulletPoint color={textSecondary}>
            Upload six picture with white background; and
          </BulletPoint>
          <BulletPoint color={textSecondary}>
            Take a selfie holding your valid government issued ID.
          </BulletPoint>
        </View>

        <Divider color={dividerColor} />

        {/* Valid IDs */}
        <SectionTitle color={textPrimary}>
          Valid IDs in Applying National Police Clearance
        </SectionTitle>
        <Paragraph color={textSecondary}>
          On the day of your appointment, proceed to the chosen Police Station
          and you will be required to present one (1) valid ID.
        </Paragraph>
        <Paragraph color={textSecondary}>IDs to be valid must be:</Paragraph>

        <View className="px-2 mb-6">
          <ForwardItem color={textSecondary}>not expired,</ForwardItem>
          <ForwardItem color={textSecondary}>
            original and not photocopied
          </ForwardItem>
          <ForwardItem color={textSecondary}>
            with clear photo and signature of the applicant
          </ForwardItem>
          <ForwardItem color={textSecondary}>bear full name</ForwardItem>
        </View>

        <Divider color={dividerColor} />

        {/* New Section: Examples of Valid Government-Issued IDs */}
        <SectionTitle color={textPrimary}>
          Examples of Valid Government-Issued IDs
        </SectionTitle>
        <Paragraph color={textSecondary}>
          The following are examples of acceptable valid IDs. Please ensure you
          bring the original document.
        </Paragraph>

        {/* Two-Column List with Checkmarks */}
        <View className="flex-row justify-between mb-6 px-2">
          {/* Left Column */}
          <View className="flex-1 pr-2">
            <CheckItem color={textSecondary}>AFP ID</CheckItem>
            <CheckItem color={textSecondary}>
              Certificate of Registration
            </CheckItem>
            <CheckItem color={textSecondary}>BFP ID</CheckItem>
            <CheckItem color={textSecondary}>BJMP ID</CheckItem>
            <CheckItem color={textSecondary}>
              Barangay Residence Certification
            </CheckItem>
            <CheckItem color={textSecondary}>Birth Certificate</CheckItem>
            <CheckItem color={textSecondary}>GSIS UMID</CheckItem>
            <CheckItem color={textSecondary}>BPI ID</CheckItem>
            <CheckItem color={textSecondary}>LTO Driver's License</CheckItem>
            <CheckItem color={textSecondary}>LTOPF ID</CheckItem>
            <CheckItem color={textSecondary}>OFW ID</CheckItem>
            <CheckItem color={textSecondary}>PAG-IBIG ID</CheckItem>
            <CheckItem color={textSecondary}>PCG ID</CheckItem>
          </View>

          {/* Right Column */}
          <View className="flex-1 pl-2">
            <CheckItem color={textSecondary}>PNP ID</CheckItem>
            <CheckItem color={textSecondary}>PRC License</CheckItem>
            <CheckItem color={textSecondary}>PWD ID</CheckItem>
            <CheckItem color={textSecondary}>Passport</CheckItem>
            <CheckItem color={textSecondary}>Philhealth ID</CheckItem>
            <CheckItem color={textSecondary}>
              Philippine Identification (PhilID)
            </CheckItem>
            <CheckItem color={textSecondary}>Postal ID</CheckItem>
            <CheckItem color={textSecondary}>SSS ID / SSS UMID</CheckItem>
            <CheckItem color={textSecondary}>
              School ID with Registration Form
            </CheckItem>
            <CheckItem color={textSecondary}>Marina ID</CheckItem>
            <CheckItem color={textSecondary}>Senior Citizen's ID</CheckItem>
            <CheckItem color={textSecondary}>TIN ID</CheckItem>
            <CheckItem color={textSecondary}>Voter's ID</CheckItem>
          </View>
        </View>
      </ScrollView>

      {/*Acceptance Checkbox and Proceed Button */}
      <View className="px-6 py-4" style={{ backgroundColor: specialBg }}>
        <Pressable
          className="flex-row items-center mb-4"
          onPress={() => setAccepted(!accepted)}
          style={{ opacity: accepted ? 1 : 0.7 }}
        >
          <Ionicons
            name={accepted ? "checkmark-circle" : "ellipse-outline"}
            size={24}
            color={accepted ? buttonBg : textSecondary}
            style={{ marginRight: 12 }}
          />
          <Text className="text-base flex-1" style={{ color: textPrimary }}>
            I accept the terms and conditions
          </Text>
        </Pressable>

        {/* Proceed Button */}
        <Pressable
          className="py-4 rounded-lg items-center justify-center"
          onPress={handleProceed}
          disabled={!accepted}
          style={{
            backgroundColor: accepted ? buttonBg : textSecondary,
            opacity: accepted ? 1 : 0.5,
          }}
        >
          <Text className="text-white text-base font-semibold">
            Proceed to Book Appointment
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
