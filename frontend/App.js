import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import PromptScreen from "./src/screens/PromptScreen";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      {/* <LoginScreen /> */}
      {/* <SignupScreen /> */}
      {/* <PromptScreen /> */}
      <StatusBar style="auto" />
    </GluestackUIProvider>
  );
}
