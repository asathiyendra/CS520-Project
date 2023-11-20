import React, { useEffect } from "react";
import { useNavigation, useLocalSearchParams } from "expo-router";
import {
  Box,
  Button,
  ButtonText,
  FlatList,
  HStack,
  Icon,
  Text,
} from "@gluestack-ui/themed";
import { User } from "lucide-react-native";

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
      id: 1,
      name: "John Doe 1",
      avatar: "https://picsum.photos/200/300",
    },
    response: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    user: {
      id: 1,
      name: "John Doe 1",
      avatar: "https://picsum.photos/200/300",
    },
    response: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export default function friend() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: `User ${id}`,
    });
  }, []);

  const renderTop = () => {
    return (
      <Box>
        <HStack justifyContent="space-between" mb="$5">
          <Text></Text>
          <Button action={"negative"} variant="solid" my="$5">
            <ButtonText>Unfriend</ButtonText>
          </Button>
        </HStack>
        <Icon as={User} alignSelf="center" size={80} mb="$5" />
        <Text fontWeight="bold" mb="$3">
          Responses
        </Text>
      </Box>
    );
  };

  return (
    <Screen justifyContent="flex-start">
      <FlatList
        ListHeaderComponent={renderTop}
        data={RESPONSES}
        ListEmptyComponent={<Text>No responses found.</Text>}
        renderItem={({ item, index }) => (
          <ResponseCard
            key={index}
            index={index}
            response={item.response}
            username={item.user.name}
          />
        )}
      />
    </Screen>
  );
}
