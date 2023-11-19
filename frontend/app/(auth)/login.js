import {
  Button,
  ButtonText,
  FormControl,
  FormControlHelper,
  FormControlHelperText,
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
} from "@gluestack-ui/themed";
import { Link } from "expo-router";

import Screen from "../../components/Screen";

export default function login() {
  return (
    <Screen>
      <Heading textAlign="center" mb="$10">
        Sign in to your account
      </Heading>

      <VStack space="xl" mb="$10">
        <FormControl size={"md"} isRequired={false}>
          <Input>
            <InputField type="email" placeholder="Email" />
          </Input>
        </FormControl>

        <FormControl size={"md"} isRequired={false}>
          <Input>
            <InputField type="password" placeholder="password" />
          </Input>

          <FormControlHelper>
            <FormControlHelperText>
              Must be at least 6 characters.
            </FormControlHelperText>
          </FormControlHelper>

          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              At least 6 characters are required.
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
      </VStack>

      <Button action={"primary"} variant={"solid"} isDisabled={false}>
        <ButtonText>Login</ButtonText>
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
