import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useLocalSearchParams } from "expo-router";
import {
  CloseIcon,
  Heading,
  Box,
  Button,
  ButtonText,
  FlatList,
  HStack,
  Icon,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Text,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
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

  const [showUnfriendModal, setShowUnfriendModal] = useState(false);
  const modalRef = useRef();

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
          <Button
            onPress={() => setShowUnfriendModal(true)}
            ref={modalRef}
            action={"negative"}
            variant="solid"
            my="$5"
          >
            <ButtonText>Unfriend</ButtonText>
          </Button>
        </HStack>
        <Icon as={User} alignSelf="center" size={80} mb="$5" />
        {/* unfriend modal */}
        <Modal
          isOpen={showUnfriendModal}
          onClose={() => setShowUnfriendModal(false)}
          ref={modalRef}
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Heading>Unfriend?</Heading>
              <ModalCloseButton>
                <Icon as={CloseIcon} />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <Text>
                Are you certain you wish to remove this friend from your list?
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button
                onPress={() => setShowUnfriendModal(false)}
                action={"negative"}
                variant="solid"
                mr="$3"
                size="sm"
              >
                <ButtonText>Yes</ButtonText>
              </Button>
              <Button
                onPress={() => setShowUnfriendModal(false)}
                action={"secondary"}
                variant="solid"
                size="sm"
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
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
