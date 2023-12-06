import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import {
  Button,
  HStack,
  ButtonText,
  FlatList,
  Text,
  Icon,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  CloseIcon,
  ModalBody,
  FormControl,
  Input,
  InputField,
  ButtonIcon,
  Pressable,
  Box,
} from "@gluestack-ui/themed";
import { ArrowRightIcon, User } from "lucide-react-native";

import { getFriends } from "../../components/apiCalls";
import Screen from "../../components/Screen";

const FRIENDS = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe1",
    avatar: "https://i.pravatar.cc/300?img=1",
  },
  {
    id: 2,
    name: "Jane Doe",
    username: "janedoe1",
    avatar: "https://i.pravatar.cc/300?img=2",
  },
  {
    id: 3,
    name: "John Smith",
    username: "johnsmith1",
    avatar: "https://i.pravatar.cc/300?img=3",
  },
  {
    id: 4,
    name: "Jane Smith",
    username: "janesmith1",
    avatar: "https://i.pravatar.cc/300?img=4",
  },
  {
    id: 5,
    name: "John Doe",
    username: "johndoe",
    avatar: "https://i.pravatar.cc/300?img=1",
  },
  {
    id: 6,
    name: "Jane Doe",
    username: "janedoe",
    avatar: "https://i.pravatar.cc/300?img=2",
  },
  {
    id: 7,
    name: "John Smith",
    username: "johnsmith",
    avatar: "https://i.pravatar.cc/300?img=3",
  },
  {
    id: 8,
    name: "Jane Smith",
    username: "janesmith",
    avatar: "https://i.pravatar.cc/300?img=4",
  },
];

export default function friends() {
  const [friends, setFriends] = useState(null);
  const [removeFlag, setRemoveFlag] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const modalRef = useRef(null);

  const removeFriend = (username) => {
    const newFriends = friends.filter((friend) => friend.username != username);
    setFriends(newFriends);
  };

  useEffect(() => {
    getFriends().then((friends) => {
      setFriends(friends);
    });
  });

  const renderTop = () => {
    return (
      <HStack justifyContent="space-between" mb="$5">
        <Button
          onPress={() => setShowAddModal(true)}
          ref={modalRef}
          action={"positive"}
          variant={"solid"}
          isDisabled={false}
        >
          <ButtonText>Add</ButtonText>
        </Button>
        <Button
          onPress={() => setRemoveFlag(!removeFlag)}
          action={"negative"}
          variant={removeFlag ? "outline" : "solid"}
          isDisabled={false}
        >
          <ButtonText>{removeFlag ? "Done" : "Remove"}</ButtonText>
        </Button>
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          ref={modalRef}
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Heading>Add Friend</Heading>
              <ModalCloseButton>
                <Icon as={CloseIcon} />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <FormControl my="$5">
                <Input>
                  <InputField type="text" placeholder="Enter Username" />
                </Input>
              </FormControl>
              <Button action={"positive"} variant={"solid"} isDisabled={false}>
                <ButtonText>Add</ButtonText>
              </Button>
              <Text fontStyle="italic" textAlign="center" my="$5">
                Friend will be added once they accept the request.
              </Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      </HStack>
    );
  };

  return (
    <Screen justifyContent="flex-start">
      <FlatList
        ListHeaderComponent={renderTop}
        data={friends}
        ListEmptyComponent={<Text textAlign="center">No friends found.</Text>}
        renderItem={({ item, index }) => (
          <Pressable onPress={() => router.push(`friend/${item.id}`)}>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              p="$4"
              bg={index % 2 == 0 ? "$pink100" : "$pink50"}
              key={index}
            >
              {removeFlag ? (
                <Button
                  onPress={() => removeFriend(item.username)}
                  action="negative"
                  size="xs"
                >
                  <ButtonIcon as={CloseIcon} size="lg" />
                </Button>
              ) : (
                <Icon as={User} size="lg" />
              )}

              <Box alignItems="center">
                <Text fontWeight="bold">{item.username}</Text>
                <Text>{item.email}</Text>
              </Box>
              <Icon as={ArrowRightIcon} size="lg" />
            </HStack>
          </Pressable>
        )}
      />
    </Screen>
  );
}
