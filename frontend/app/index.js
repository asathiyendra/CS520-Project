import { Button, ButtonText, VStack } from "@gluestack-ui/themed";
import { Link } from "expo-router";

import Screen from "../components/Screen";

export default function index() {
  return (
    <Screen>
      <VStack space="md">
        <Link href="/login" asChild>
          <Button active={"primary"} variant={"solid"}>
            <ButtonText>Login Page</ButtonText>
          </Button>
        </Link>
        <Link href="/register" asChild>
          <Button active={"primary"} variant={"solid"}>
            <ButtonText>Register Page</ButtonText>
          </Button>
        </Link>
        <Link href="/responses" asChild>
          <Button active={"primary"} variant={"solid"}>
            <ButtonText>Prompt Page</ButtonText>
          </Button>
        </Link>
      </VStack>
    </Screen>
  );
}
