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
} from "@gluestack-ui/themed";
import Screen from "../../components/Screen";
import { ArrowRightIcon, User } from "lucide-react-native";
import { useRef, useState } from "react";

const FRIENDS = [
  {
    name: "John Doe",
    username: "johndoe",
    avatar: "https://i.pravatar.cc/300?img=1",
  },
  {
    name: "Jane Doe",
    username: "janedoe",
    avatar: "https://i.pravatar.cc/300?img=2",
  },
  {
    name: "John Smith",
    username: "johnsmith",
    avatar: "https://i.pravatar.cc/300?img=3",
  },
  {
    name: "Jane Smith",
    username: "janesmith",
    avatar: "https://i.pravatar.cc/300?img=4",
  },
  {
    name: "John Doe",
    username: "johndoe",
    avatar: "https://i.pravatar.cc/300?img=1",
  },
  {
    name: "Jane Doe",
    username: "janedoe",
    avatar: "https://i.pravatar.cc/300?img=2",
  },
  {
    name: "John Smith",
    username: "johnsmith",
    avatar: "https://i.pravatar.cc/300?img=3",
  },
  {
    name: "Jane Smith",
    username: "janesmith",
    avatar: "https://i.pravatar.cc/300?img=4",
  },
];

export default function friends() {
  const [showAddModal, setShowAddModal] = useState(false);
  const modalRef = useRef(null);

  const renderTop = () => {
    return (
      <HStack justifyContent="space-between" my="$5">
        <Button
          onPress={() => setShowAddModal(true)}
          ref={modalRef}
          action={"positive"}
          variant={"solid"}
          isDisabled={false}
        >
          <ButtonText>Add</ButtonText>
        </Button>
        <Button action={"negative"} variant={"solid"} isDisabled={false}>
          <ButtonText>Remove</ButtonText>
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
        data={FRIENDS}
        ListEmptyComponent={<Text>No friends found.</Text>}
        renderItem={({ item, index }) => (
          <HStack
            justifyContent="space-between"
            p="$4"
            bg={index % 2 == 0 ? "$pink100" : "$pink50"}
          >
            <Icon as={User} size="lg" />
            <Text fontWeight="bold">{item.name}</Text>
            <Icon as={ArrowRightIcon} size="lg" />
          </HStack>
        )}
      />
    </Screen>
  );
}
