import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigation, useLocalSearchParams, router } from "expo-router";
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
import { DataContext } from "../../components/dataContext";
import { AuthContext } from "../../components/AuthContext";

const RESPONSES = [];

export default function friend() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { getUserData, deleteMyFriend } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const [myFriend, setMyFriend] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showUnfriendModal, setShowUnfriendModal] = useState(false);
  const modalRef = useRef();

  const onRemoveFriend = () => {
    deleteMyFriend(user.userid, id, (error) => {
      if (error) {
        alert(error);
      } else {
        alert("Friend removed!");
        // redirect to friends page
        router.canGoBack() ? router.back() : router.replace("/friends");
      }
      setShowUnfriendModal(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    getUserData(id, (error, data) => {
      if (error) {
        alert(error);
      } else {
        // setMyFriend(data);
        navigation.setOptions({
          title: data.username,
        });
      }
      setLoading(false);
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
          >
            <ButtonText>Unfriend</ButtonText>
          </Button>
        </HStack>
        <Icon as={User} alignSelf="center" size={80} mb="$5" />
      </Box>
    );
  };

  return (
    <Screen justifyContent="flex-start">
      <FlatList
        ListHeaderComponent={renderTop}
        data={RESPONSES}
        ListEmptyComponent={
          <Text textAlign="center">
            {loading ? "Loading..." : "No responses found."}
          </Text>
        }
        renderItem={({ item, index }) => (
          <ResponseCard
            key={index}
            index={index}
            response={item.response}
            username={item.user.name}
          />
        )}
      />
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
              onPress={onRemoveFriend}
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
    </Screen>
  );
}
