import React from "react";
import { Box, HStack, Icon, Text } from "@gluestack-ui/themed";
import { ArrowRight } from "lucide-react-native";

const ResponseCard = ({ index, username, response, responseLength = 40 }) => {
  return (
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
  );
};

export default ResponseCard;
