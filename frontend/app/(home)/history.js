import React, { useEffect, useState } from "react";

import {
  Box,
  FlatList,
  HStack,
  Icon,
  Pressable,
  Text,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import { ArrowRightIcon } from "lucide-react-native";

import { getAllPreviousPrompts } from "../../components/apiCalls";
import Screen from "../../components/Screen";

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
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllPreviousPrompts().then((prompts) => {
      setLoading(false);
      setPrompts(prompts);
    });
  });
  return (
    <Screen justifyContent="flex-start">
      <FlatList
        data={prompts}
        ListEmptyComponent={
          <Text textAlign="center">
            {loading ? "Loading..." : "No previous propmts found."}
          </Text>
        }
        keyExtractor={(item) => item.promptid.toString()}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => router.push(`/history/${item.promptid}`)}
            p="$4"
            bg={index % 2 == 0 ? "$pink100" : "$pink50"}
          >
            <HStack alignItems="center" justifyContent="space-between">
              <Box>
                <Text fontWeight="bold">{item.date}</Text>
                <Text>{item.text}</Text>
              </Box>
              <Icon as={ArrowRightIcon} size="lg" />
            </HStack>
          </Pressable>
        )}
      />
    </Screen>
  );
}
