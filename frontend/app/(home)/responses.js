import { FlatList, Text } from "@gluestack-ui/themed";

import Screen from "../../components/Screen";
import ResponseCard from "../../components/ResponseCard";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../components/dataContext";
import { AuthContext } from "../../components/AuthContext";

export default function responses() {
  const { todayResponses, getMyFriendsResponses } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMyFriendsResponses(user.userid, (error) => {
      setLoading(false);
      if (error) {
        alert(error);
      }
    });
  }, []);

  return (
    <Screen>
      <FlatList
        data={todayResponses}
        ListEmptyComponent={
          <Text textAlign="center">
            {loading ? "Loading..." : "No responses found."}
          </Text>
        }
        renderItem={({ item, index }) => (
          <ResponseCard
            key={item.responseid}
            index={index}
            id={item.responseid}
            response={item.text}
          />
        )}
        keyExtractor={(item) => item.responseid.toString()}
      />
    </Screen>
  );
}
