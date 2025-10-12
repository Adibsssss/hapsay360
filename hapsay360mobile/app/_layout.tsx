import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SignupScreen"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="appointment"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="applicationform"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="bookpoliceclearancescreen"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="bookpoliceclearance"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="policeclearancepayment"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="policeclearancesummary"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="policeclearanceconfirmation"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="nearesthelp"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
