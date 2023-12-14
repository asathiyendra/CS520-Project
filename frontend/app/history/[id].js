import { useContext, useEffect, useState } from "react";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { Box, FlatList, Text } from "@gluestack-ui/themed";

import Screen from "../../components/Screen";
import ResponseCard from "../../components/ResponseCard";
import { DataContext } from "../../components/dataContext";

export default function previousPrompt() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { getResponsesByPromptId, getPrompt } = useContext(DataContext);
  const [prompt, setPrompt] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPrompt(id, (error, promptData) => {
      if (error) {
        alert(error);
      } else {
        console.log(promptData);
        setPrompt(promptData);
        navigation.setOptions({
          title: `Prompt ${promptData.promptid}`,
        });
        getResponsesByPromptId(id, (error, data) => {
          setLoading(false);
          if (error) {
            alert(error);
          } else {
            setResponses(data);
          }
        });
      }
    });
  }, []);

  const renderTop = () => {
    return (
      <Box>
        <Text size="lg" textAlign="center" mb="$5">
          {prompt?.text}
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
        data={responses}
        ListEmptyComponent={
          <Text textAlign="center">
            {loading ? "Loading..." : "No responses found."}
          </Text>
        }
        renderItem={({ item, index }) => (
          <ResponseCard key={index} index={index} response={item.text} />
        )}
      />
    </Screen>
  );
}
