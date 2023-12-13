import { useContext, useEffect, useRef, useState } from "react";
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
import { DataContext } from "../../components/dataContext";
import { AuthContext } from "../../components/AuthContext";

export default function friends() {
  const { addFriend } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const [friendUsernameOrEmail, setFriendUsernameOrEmail] = useState("");
  const [friends, setFriends] = useState(null);
  const [loading, setLoading] = useState(false);
  const [removeFlag, setRemoveFlag] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const modalRef = useRef(null);

  const removeFriend = (username) => {
    const newFriends = friends.filter((friend) => friend.username != username);
    setFriends(newFriends);
  };

  const onAddFriend = () => {
    if (friendUsernameOrEmail === "") {
      alert("Username or email cannot be empty");
      return;
    }

    addFriend(user.userid, friendUsernameOrEmail, (error) => {
      if (error) {
        alert(error);
      } else {
        alert("Friend request sent.");
      }
      setShowAddModal(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    getFriends().then((friends) => {
      setLoading(false);
      setFriends(friends);
    });
  }, []);

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
      </HStack>
    );
  };

  return (
    <Screen justifyContent="flex-start">
      <FlatList
        ListHeaderComponent={renderTop}
        data={friends}
        ListEmptyComponent={
          <Text textAlign="center">
            {loading ? "Loading..." : "No friends found."}
          </Text>
        }
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
                <InputField
                  type="text"
                  placeholder="Enter Username or Email"
                  onChangeText={setFriendUsernameOrEmail}
                  value={friendUsernameOrEmail}
                />
              </Input>
            </FormControl>
            <Button
              action={"positive"}
              variant={"solid"}
              isDisabled={false}
              onPress={onAddFriend}
            >
              <ButtonText>Add</ButtonText>
            </Button>
            <Text fontStyle="italic" textAlign="center" my="$5">
              Friend will be added once they accept the request.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Screen>
  );
}
