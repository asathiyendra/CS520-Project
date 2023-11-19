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
        name="responses"
        options={{
          tabBarLabel: "Responses",
          tabBarIcon: ({ color, size }) => {
            return <Icon as={MessageCircle} color={color} size={size} />;
          },
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          tabBarLabel: "Friends",
          tabBarIcon: ({ color, size }) => {
            return <Icon as={Users} color={color} size={size} />;
          },
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarLabel: "history",
          tabBarIcon: ({ color, size }) => {
            return <Icon as={History} color={color} size={size} />;
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "profile",
          tabBarIcon: ({ color, size }) => {
            return <Icon as={Settings} color={color} size={size} />;
          },
        }}
      />
    </Tabs>
  );
}
