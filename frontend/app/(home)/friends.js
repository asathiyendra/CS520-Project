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
  ButtonSpinner,
} from "@gluestack-ui/themed";
import { ArrowRightIcon, User } from "lucide-react-native";

import Screen from "../../components/Screen";
import { DataContext } from "../../components/dataContext";
import { AuthContext } from "../../components/AuthContext";

export default function friends() {
  const { getMyFriends, addFriend, friends, deleteMyFriend } =
    useContext(DataContext);
  const { user } = useContext(AuthContext);
  const [friendUsernameOrEmail, setFriendUsernameOrEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [removeFlag, setRemoveFlag] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const modalRef = useRef(null);

  const removeFriend = (friendid) => {
    deleteMyFriend(user.userid, friendid, (error) => {
      if (error) {
        alert(error);
      } else {
        alert("Friend removed!");
      }
    });
    getFriends();
  };

  const onAddFriend = () => {
    if (friendUsernameOrEmail === "") {
      alert("Username or email cannot be empty");
      return;
    }

    setLoading(true);
    addFriend(user.userid, friendUsernameOrEmail, (error) => {
      if (error) {
        alert(error);
      } else {
        alert("Friend request sent.");
      }
      setShowAddModal(false);
      setLoading(false);
    });
  };

  const getFriends = () => {
    setLoading(true);
    getMyFriends(user.userid, (error) => {
      setLoading(false);
      if (error) {
        alert(error);
      }
    });
  };

  useEffect(() => {
    getFriends();
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
        refreshing={loading}
        onRefresh={() => getFriends()}
        ListHeaderComponent={renderTop}
        data={friends}
        ListEmptyComponent={
          <Text textAlign="center">
            {loading ? "Loading..." : "No friends found."}
          </Text>
        }
        renderItem={({ item, index }) => (
          <Pressable onPress={() => router.push(`friend/${item.userid}`)}>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              p="$4"
              bg={index % 2 == 0 ? "$pink100" : "$pink50"}
              key={index}
            >
              {removeFlag ? (
                <Button
                  onPress={() => removeFriend(item.userid)}
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
              isDisabled={loading}
              onPress={onAddFriend}
            >
              {loading ? (
                <ButtonSpinner />
              ) : (
                <ButtonText>Add Friend</ButtonText>
              )}
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
