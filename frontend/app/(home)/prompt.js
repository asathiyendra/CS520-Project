import React, { useContext, useEffect, useState } from "react";

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
  FormControlError,
  FormControlErrorIcon,
  AlertCircleIcon,
  FormControlErrorText,
  ButtonSpinner,
} from "@gluestack-ui/themed";
import { router } from "expo-router";

import Screen from "../../components/Screen";
import { DataContext } from "../../components/dataContext";
import { AuthContext } from "../../components/AuthContext";

export default function prompt() {
  const { todayPrompt, getTodayPrompt, submitResponse } =
    useContext(DataContext);
  const { user } = useContext(AuthContext);
  const [answer, setAnswer] = useState("");
  const [answerError, setAnswerError] = useState(null);
  const [visibility, setVisibility] = useState("public");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodayPrompt(() => {
      setLoading(false);
    });
  }, []);

  const onSubmit = () => {
    // reset errors
    setAnswerError(null);

    // answer cannot be empty
    if (answer === "") {
      setAnswerError("Answer cannot be empty");
      return;
    }

    setLoading(true);
    submitResponse(
      user.userid,
      todayPrompt.promptid,
      answer,
      visibility,
      (error) => {
        setLoading(false);
        if (error) {
          setAnswerError(error);
          return;
        } else {
          // redirect to responses page
          alert("Response submitted successfully!");
          router.replace("responses/");
        }
      }
    );
  };

  return (
    <Screen>
      <Heading textAlign="center" mb="$5">
        Today's Question
      </Heading>
      <Heading size="sm" color="$amber500" textAlign="center" mb="$5">
        {loading ? "Waiting for prompt..." : todayPrompt?.text}
      </Heading>

      <FormControl isInvalid={answerError} mb="$5">
        <Textarea size={"lg"} isDisabled={false}>
          <TextareaInput
            role="none"
            placeholder="Your text goes here..."
            value={answer}
            onChangeText={setAnswer}
          />
        </Textarea>

        {answerError && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{answerError}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      <Select mb="$5" selectedValue={visibility} onValueChange={setVisibility}>
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
            <SelectItem label="" value="" />
          </SelectContent>
        </SelectPortal>
      </Select>

      <Button
        action={"primary"}
        variant={"solid"}
        isDisabled={false}
        onPress={onSubmit}
      >
        {loading ? <ButtonSpinner /> : <ButtonText>Submit Response</ButtonText>}
      </Button>
    </Screen>
  );
}
