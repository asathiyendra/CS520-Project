import { Box, HStack, Icon, Pressable, Text } from "@gluestack-ui/themed";
import { ArrowRight } from "lucide-react-native";

import { router } from "expo-router";

const ResponseCard = ({ index, username, response, responseLength = 40 }) => {
  return (
    <Pressable onPress={() => router.push(`/response/${username}`)}>
      <HStack
        alignItems="center"
        bg={index % 2 == 0 ? "$pink100" : "$pink50"}
        p="$4"
        key={index}
      >
        <Box textAlign="center" flexGrow={1}>
          <Text fontSize={20} fontWeight="bold">
            {username}
          </Text>
          <Text>
            {response.length > responseLength
              ? response.substring(0, responseLength) + "..."
              : response}
          </Text>
        </Box>
        <Icon as={ArrowRight} mr="$2" />
      </HStack>
    </Pressable>
  );
};

export default ResponseCard;
