import React, { useState } from "react";

import {
  Button,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Input,
  InputField,
  AlertCircleIcon,
  VStack,
  Heading,
  Box,
  LinkText,
  Text,
  ButtonSpinner,
} from "@gluestack-ui/themed";
import { Link } from "expo-router";

import useAuth from "../../components/useAuth";
import Screen from "../../components/Screen";

export default function login() {
  const { loginWithUsernameAndPassword } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    // reset errors
    setUsernameError(null);
    setPasswordError(null);
    setAuthError(null);

    // username and password cannot be empty
    if (username === "" || password === "") {
      setUsernameError("Username cannot be empty");
      setPasswordError("Password cannot be empty");
      return;
    }

    // // password must be at least 6 characters
    // if (password.length < 6) {
    //   setPasswordError("Password must be at least 6 characters");
    //   return;
    // }

    // // username must be at least 3 characters
    // if (username.length < 3) {
    //   setUsernameError("Username must be at least 3 characters");
    //   return;
    // }

    setLoading(true);

    loginWithUsernameAndPassword(username, password, (error) => {
      setLoading(false);
      if (error) {
        setAuthError(error);
      } else {
        // redirect to prompt page.
        console.log("redirect to prompt page");
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
        <FormControl size={"md"} isRequired={false} isInvalid={usernameError}>
          <Input>
            <InputField
              type="text"
              placeholder="Username"
              onChangeText={setUsername}
              value={username}
            />
          </Input>

          {usernameError && (
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{usernameError}</FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        <FormControl size={"md"} isRequired={false} isInvalid={passwordError}>
          <Input>
            <InputField
              type="password"
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
            />
          </Input>

          {passwordError && (
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{passwordError}</FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>
      </VStack>

      <Button
        action={"primary"}
        variant={"solid"}
        isDisabled={false}
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
