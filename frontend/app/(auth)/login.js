import React, { useContext, useState } from "react";

import {
  Button,
  ButtonText,
  FormControl,
  Input,
  InputField,
  VStack,
  Heading,
  Box,
  LinkText,
  Text,
  ButtonSpinner,
} from "@gluestack-ui/themed";
import { Link, useRouter } from "expo-router";

import { AuthContext } from "../../components/AuthContext";
import Screen from "../../components/Screen";

export default function login() {
  const router = useRouter();
  const { loginWithUsernameAndPassword } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    // reset errors
    setAuthError(null);

    // username and password cannot be empty
    if (username === "" || password === "") {
      setAuthError("Username and password cannot be empty");
      return;
    }

    setLoading(true);

    loginWithUsernameAndPassword(username, password, (error) => {
      setLoading(false);
      if (error) {
        setAuthError(error);
      } else {
        router.replace("/prompt");
      }
    });
  };

  return (
    <Screen>
      <Heading textAlign="center" mb="$10">
        Sign in to your account
      </Heading>
      {authError && (
        <Box
          bg="$red100"
          borderColor="$red500"
          borderWidth="1px"
          borderRadius="md"
          p="$3"
          mb="$5"
        >
          <Text color="$red500" textAlign="center">
            {authError}
          </Text>
        </Box>
      )}

      <VStack space="xl" mb="$10">
        <FormControl size={"md"} isRequired={false}>
          <Input>
            <InputField
              type="text"
              placeholder="Username"
              onChangeText={setUsername}
              value={username}
            />
          </Input>
        </FormControl>

        <FormControl size={"md"} isRequired={false}>
          <Input>
            <InputField
              type="password"
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
            />
          </Input>
        </FormControl>
      </VStack>

      <Button
        action={"primary"}
        variant={"solid"}
        isDisabled={loading}
        onPress={onSubmit}
      >
        {loading ? <ButtonSpinner /> : <ButtonText>Login</ButtonText>}
      </Button>

      <Box mt="$5" mx="auto" alignItems="center">
        <Link href="/register">
          <Text>
            Don't have an account? <LinkText>Register here</LinkText>
          </Text>
        </Link>
      </Box>
    </Screen>
  );
}
