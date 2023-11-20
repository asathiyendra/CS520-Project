import {
  Box,
  Icon,
  Text,
  HStack,
  ScrollView,
  FlatList,
} from "@gluestack-ui/themed";

import Screen from "../../components/Screen";
import { ArrowRight } from "lucide-react-native";
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
  {
    id: 4,
    user: {
      id: 4,
      name: "Jane Doe 4",
      avatar: "https://picsum.photos/200/300",
    },
    response: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 5,
    user: {
      id: 5,
      name: "John Doe 5",
      avatar: "https://picsum.photos/200/300",
    },
    response: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 6,
    user: {
      id: 6,
      name: "Jane Doe 6",
      avatar: "https://picsum.photos/200/300",
    },
    response: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 7,
    user: {
      id: 7,
      name: "John Doe 7",
      avatar: "https://picsum.photos/200/300",
    },
    response: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 8,
    user: {
      id: 8,
      name: "Jane Doe 8",
      avatar: "https://picsum.photos/200/300",
    },
    response: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export default function responses() {
  return (
    <Screen>
      <FlatList
        data={RESPONSES}
        renderItem={({ item, index }) => (
          <ResponseCard
            key={item.id}
            index={index}
            username={item.user.name}
            avatar={item.user.avatar}
            response={item.response}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </Screen>
  );
}
