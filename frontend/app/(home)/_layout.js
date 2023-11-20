import { Icon } from "@gluestack-ui/themed";
import { Tabs } from "expo-router/tabs";
import { History, MessageCircle, Settings, Users } from "lucide-react-native";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="prompt"
        options={{
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        name="response"
        options={{
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        name="previousPrompt"
        options={{
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        name="responses"
        options={{
          headerTitle: "Responses",
          tabBarLabel: "Responses",
          tabBarIcon: ({ color, size }) => {
            return <Icon as={MessageCircle} color={color} size={size} />;
          },
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          headerTitle: "Friends",
          tabBarLabel: "Friends",
          tabBarIcon: ({ color, size }) => {
            return <Icon as={Users} color={color} size={size} />;
          },
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          headerTitle: "History",
          tabBarLabel: "history",
          tabBarIcon: ({ color, size }) => {
            return <Icon as={History} color={color} size={size} />;
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          tabBarLabel: "profile",
          tabBarIcon: ({ color, size }) => {
            return <Icon as={Settings} color={color} size={size} />;
          },
        }}
      />
    </Tabs>
  );
}
