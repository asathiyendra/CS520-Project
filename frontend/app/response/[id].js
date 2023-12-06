import {
  Badge,
  BadgeText,
  Box,
  Button,
  ButtonText,
  FlatList,
  HStack,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Text,
  Heading,
  ModalCloseButton,
  Icon,
  CloseIcon,
  ModalBody,
  FormControl,
  Textarea,
  TextareaInput,
} from "@gluestack-ui/themed";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { getResponseById } from "../../components/apiCalls";
import Screen from "../../components/Screen";
import { useEffect, useRef, useState } from "react";

const COMMENTS = [
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

export default function response() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const [response, setResponse] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    getResponseById(id).then((data) => setResponse(data));
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: `Prompt ID ${id}`,
    });
  }, []);

  const renderTop = () => {
    return (
      <Box>
        <Text size="lg" textAlign="center" mb="$5">
          {response ? response.text : "Loading..."}
        </Text>
        <HStack justifyContent="space-around" my="$5">
          <Button size="sm">
            <ButtonText>Likes </ButtonText>
            {response && (
              <Badge size="sm" borderRadius="$full" action="muted">
                <BadgeText>{response.likes_count}</BadgeText>
              </Badge>
            )}
          </Button>
          <Button
            onPress={() => setShowCommentModal(true)}
            ref={modalRef}
            size="sm"
            bg={"$green500"}
          >
            <ButtonText>Comments </ButtonText>
            {response && (
              <Badge size="sm" borderRadius="$full" action="muted">
                <BadgeText>{response.comments_count}</BadgeText>
              </Badge>
            )}
          </Button>
          <Button size="sm" bg="$yellow500">
            <ButtonText>Share</ButtonText>
          </Button>
          <Button size="sm" bg="$red500">
            <ButtonText>Report</ButtonText>
          </Button>
        </HStack>
        <Text fontWeight="bold" mb="$3">
          Comments
        </Text>
        {/* comment modal */}
        <Modal
          isOpen={showCommentModal}
          onClose={() => setShowCommentModal(false)}
          ref={modalRef}
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Heading>Comment</Heading>
              <ModalCloseButton>
                <Icon as={CloseIcon} />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <FormControl>
                <Textarea isInvalid={false} isDisabled={false}>
                  <TextareaInput
                    placeholder="Your text goes here..."
                    autoFocus={true}
                  />
                </Textarea>
              </FormControl>
              <Button
                action="primary"
                onPress={() => setShowCommentModal(false)}
                my="$5"
              >
                <ButtonText>Submit</ButtonText>
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    );
  };

  return (
    <Screen justifyContent="flex-start">
      <FlatList
        ListHeaderComponent={renderTop}
        data={response ? response.comments : []}
        ListEmptyComponent={<Text>No comments for this post.</Text>}
        renderItem={({ item, index }) => (
          <Box p="$4" bg={index % 2 == 0 ? "$pink100" : "$pink50"}>
            <Text fontWeight="bold">UserID: {item.userid}</Text>
            <Text>{item.text}</Text>
          </Box>
        )}
      ></FlatList>
    </Screen>
  );
}
