import {
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Icon,
  Input,
  InputField,
  VStack,
} from "@gluestack-ui/themed";

import Screen from "../../components/Screen";
import { User } from "lucide-react-native";

export default function profile() {
  return (
    <Screen>
      <Icon as={User} alignSelf="center" size={80} mb="$5" />
      <VStack space="md" mt="$5">
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Username</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField type="text" defaultValue="John Doe" />
          </Input>
        </FormControl>
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Email Address</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField type="email" defaultValue="email@gmail.com" />
          </Input>
        </FormControl>
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField type="password" defaultValue="password" />
          </Input>
        </FormControl>
        <Button
          action={"primary"}
          variant={"solid"}
          onPress={() => console.log("pressed")}
        >
          <ButtonText>Save</ButtonText>
        </Button>
      </VStack>
    </Screen>
  );
}
