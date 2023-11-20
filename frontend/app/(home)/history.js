import { Box, FlatList, HStack, Icon, Text } from "@gluestack-ui/themed";

import Screen from "../../components/Screen";
import { ArrowRightIcon } from "lucide-react-native";

const PREVIOUS_PROMPTS = [
  {
    id: 1,
    prompt: "Prompt 1",
    date: "2021-05-01",
    numResponses: 10,
  },
  {
    id: 2,
    prompt: "Prompt 2",
    date: "2021-05-02",
    numResponses: 8,
  },
  {
    id: 3,
    prompt: "Prompt 3",
    date: "2021-05-03",
    numResponses: 5,
  },
];

export default function history() {
  return (
    <Screen justifyContent="flex-start">
      <FlatList
        data={PREVIOUS_PROMPTS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Box p="$4" bg={index % 2 == 0 ? "$pink100" : "$pink50"}>
            <HStack alignItems="center" justifyContent="space-between">
              <Box>
                <Text fontWeight="bold">{item.date}</Text>
                <Text>{item.prompt}</Text>
              </Box>
              <Icon as={ArrowRightIcon} size="lg" />
            </HStack>
          </Box>
        )}
      />
    </Screen>
  );
}
