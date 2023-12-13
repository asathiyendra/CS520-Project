import React, { useContext, useState } from "react";

import {
  Button,
  ButtonSpinner,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Icon,
  Input,
  InputField,
  VStack,
} from "@gluestack-ui/themed";
import { User } from "lucide-react-native";

import { AuthContext } from "../../components/AuthContext";
import Screen from "../../components/Screen";

export default function profile() {
  const { user, updateUserData } = useContext(AuthContext);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    // ensure all fields are filled out
    if (!username || !email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);
    // update user
    updateUserData(username, email, password, (error) => {
      if (error) {
        alert(error);
      } else {
        alert("Profile updated!");
      }
      setLoading(false);
    });
  };

  return (
    <Screen>
      <Icon as={User} alignSelf="center" size={80} mb="$5" />
      <VStack space="md" mt="$5">
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Username</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="text"
              value={username}
              onChangeText={setUsername}
            />
          </Input>
        </FormControl>
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Email Address</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField type="email" value={email} onChangeText={setEmail} />
          </Input>
        </FormControl>
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="password"
              value={password}
              onChangeText={setPassword}
            />
          </Input>
        </FormControl>
        <Button action={"primary"} variant={"solid"} onPress={onSubmit}>
          {loading ? <ButtonSpinner /> : <ButtonText>Save</ButtonText>}
        </Button>
      </VStack>
    </Screen>
  );
}
