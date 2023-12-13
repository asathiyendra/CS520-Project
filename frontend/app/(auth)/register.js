import React, { useContext, useState } from "react";

import {
  Box,
  Button,
  ButtonText,
  Text,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Input,
  InputField,
  AlertCircleIcon,
  VStack,
  Heading,
  LinkText,
  ButtonSpinner,
} from "@gluestack-ui/themed";
import { Link, useRouter } from "expo-router";

import { AuthContext } from "../../components/AuthContext";
import Screen from "../../components/Screen";

export default function register() {
  const router = useRouter();
  const { registerWithUsernameAndPassword } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    // reset errors
    setUsernameError(null);
    setPasswordError(null);
    setEmailError(null);
    setAuthError(null);

    // username and password and email cannot be empty
    if (username === "" || password === "" || email === "") {
      setAuthError("Username, password, and email cannot be empty");
      return;
    }

    if (!email.includes("@")) {
      setEmailError("Email must be valid");
      return;
    }

    if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    registerWithUsernameAndPassword(username, password, email, (error) => {
      setLoading(false);
      if (error) {
        setAuthError(error);
      } else {
        alert("Registration successful!");
        router.replace("/prompt");
      }
    });
  };

  return (
    <Screen>
      <Heading textAlign="center" mb="$10">
        Register for an account
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
        <FormControl size={"md"} isInvalid={emailError}>
          <Input>
            <InputField
              type="email"
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
            />
          </Input>

          {emailError && (
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{emailError}</FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        <FormControl size={"md"} isInvalid={usernameError}>
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

        <FormControl size={"md"} isInvalid={passwordError}>
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
        isDisabled={loading}
        onPress={onSubmit}
      >
        {loading ? <ButtonSpinner /> : <ButtonText>Register</ButtonText>}
      </Button>

      <Box mt="$5" mx="auto" alignItems="center">
        <Link href="/login">
          <Text>
            Already have an account? <LinkText>Login here</LinkText>
          </Text>
        </Link>
      </Box>
    </Screen>
  );
}
