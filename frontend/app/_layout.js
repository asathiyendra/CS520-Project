import { Stack } from "expo-router";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { AuthProvider } from "../components/AuthContext";

export default function Layout() {
  return (
    <GluestackUIProvider config={config}>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </AuthProvider>
    </GluestackUIProvider>
  );
}
