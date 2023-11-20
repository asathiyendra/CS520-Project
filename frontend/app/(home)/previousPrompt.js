import { Box, FlatList, Text, HStack, Icon } from "@gluestack-ui/themed";
import { ArrowRight } from "lucide-react-native";

import Screen from "../../components/Screen";
import ResponseCard from "../../components/ResponseCard";

const RESPONSES = [
  {
    id: 1,
    user: {
      id: 1,
      name: "John Doe 1",
      avatar: "https://picsum.photos/200/300",
    },
    response: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    user: {
      id: 2,
      name: "Jane Doe 2",
      avatar: "https://picsum.photos/200/300",
    },
    response: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    user: {
      id: 3,
      name: "John Doe 3",
      avatar: "https://picsum.photos/200/300",
    },
    response: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export default function previousPrompt() {
  const renderTop = () => {
    return (
      <Box>
        <Text size="lg" textAlign="center" my="$5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        <Text fontWeight="bold" mb="$3">
          Responses
        </Text>
      </Box>
    );
  };
  return (
    <Screen>
      <FlatList
        ListHeaderComponent={renderTop}
        data={RESPONSES}
        renderItem={({ item, index }) => (
          <ResponseCard
            index={index}
            username={item.user.name}
            response={item.response}
          />
        )}
      />
    </Screen>
  );
}
