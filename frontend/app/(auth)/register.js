import {
  Box,
  Button,
  ButtonText,
  Text,
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
  LinkText,
} from "@gluestack-ui/themed";
import { Link } from "expo-router";

import Screen from "../../components/Screen";

export default function register() {
  return (
    <Screen>
      <Heading textAlign="center" mb="$10">
        Register for an account
      </Heading>

      <VStack space="xl" mb="$10">
        <FormControl size={"md"} isRequired={false}>
          <Input>
            <InputField type="email" placeholder="Email" />
          </Input>
        </FormControl>

        <FormControl size={"md"} isRequired={false}>
          <Input>
            <InputField type="text" placeholder="Username" />
          </Input>
        </FormControl>

        <FormControl size={"md"} isRequired={false}>
          <Input>
            <InputField type="password" placeholder="Password" />
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
        <ButtonText>Register</ButtonText>
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
