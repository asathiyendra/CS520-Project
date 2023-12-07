import { Stack } from "expo-router";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { AuthProvider } from "../components/AuthContext";
import { DataProvider } from "../components/dataContext";

export default function Layout() {
  return (
    <GluestackUIProvider config={config}>
      <AuthProvider>
        <DataProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </DataProvider>
      </AuthProvider>
    </GluestackUIProvider>
  );
}
