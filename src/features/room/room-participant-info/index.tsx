import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Text,
  VStack,
  Grid,
  Button,
  Input,
  Container,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router";
import { useAddParticipantToRoom } from "../../../hooks/useApiCall";

interface Props {
  showDialog: boolean;
  roomId: string;
}

export const RoomParticipantInfo = ({ showDialog, roomId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState<string>();

  useEffect(() => {
    if (showDialog) {
      onOpen();
    }
  }, [onOpen, showDialog]);

  const onSubmit = useCallback(() => {
    console.log(name);
    addParticpantToRoom()
    onClose();
  }, [name, onClose]);

  const { addParticpant } = useAddParticipantToRoom();

  const addParticpantToRoom = useCallback(async () => {
    if (name) {
      const participants = await addParticpant(roomId, name);
    } else {
      console.log("name is null");
    }
  }, [name]);

  const cancelRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => {}}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Choose your display name
            </AlertDialogHeader>

            <AlertDialogBody>
              <Input
                placeholder="Your display name"
                size="lg"
                onChange={(e) => setName(e.target.value)}
              />
            </AlertDialogBody>

            <AlertDialogFooter mt={4}>
              <Button
                colorScheme="blue"
                size="lg"
                onClick={onSubmit}
                disabled={!name}
                width={{ base: "100%" }}
              >
                Enter room
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
