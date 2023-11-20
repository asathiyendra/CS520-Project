import { Icon, Pressable } from "@gluestack-ui/themed";
import { Stack, useNavigation } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

export default function Layout() {
  const navigation = useNavigation();
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerLeft: ({ canGoBack }) => {
            if (canGoBack) {
              return (
                <Pressable
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Icon as={ArrowLeft} size="lg" />
                </Pressable>
              );
            }
          },
        }}
      />
    </Stack>
  );
}
