import React, { useState, useEffect } from "react";

import {
  Heading,
  Select,
  SelectTrigger,
  SelectInput,
  Textarea,
  TextareaInput,
  SelectIcon,
  Icon,
  ChevronDownIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  FormControl,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";

import Screen from "../../components/Screen";
import { getRandomPrompt } from "../../components/apiCalls";

export default function prompt() {
  const [prompt, setPrompt] = useState(null);

  useEffect(() => {
    getRandomPrompt().then((prompt) => {
      setPrompt(prompt);
    });
  }, []);

  return (
    <Screen>
      <Heading textAlign="center" mb="$5">
        Today's Question
      </Heading>
      <Heading size="sm" color="$amber500" textAlign="center" mb="$5">
        {!prompt ? "Waiting for prompt..." : prompt.text}
      </Heading>

      <FormControl>
        <Textarea size={"lg"} isInvalid={false} isDisabled={false} mb="$5">
          <TextareaInput role="none" placeholder="Your text goes here..." />
        </Textarea>
      </FormControl>

      <Select mb="$5">
        <SelectTrigger variant="outline" size="md">
          <SelectInput placeholder="Select answer's visibility" />
          <SelectIcon mr="$3">
            <Icon as={ChevronDownIcon} />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            <SelectItem label="Public" value="public" />
            <SelectItem label="Private" value="private" />
          </SelectContent>
        </SelectPortal>
      </Select>

      <Button action={"primary"} variant={"solid"} isDisabled={false}>
        <ButtonText>Submit Response</ButtonText>
      </Button>
    </Screen>
  );
}
