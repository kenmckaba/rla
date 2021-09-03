import React, { useState, useEffect } from 'react'
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Box,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Flex,
  Center,
} from '@chakra-ui/react'
import { getTraining } from '../graphql/queries'
import { gql, useMutation, useQuery } from '@apollo/client'
import { createAttendee } from '../graphql/mutations'
import { prettyTime } from '../pretty-time'

export const Registration = ({
  match: {
    params: { trainingId },
  },
}) => {
  const [training, setTraining] = useState()
  const [attendeeId, setAttendeeId] = useState()
  const [attendeeName, setAttendeeName] = useState('')
  const [attendeeEmail, setAttendeeEmail] = useState('')
  const { isOpen: isModalOpen, onOpen: onModalOpen } = useDisclosure()

  const {
    data: trainingData,
    error,
    loading,
  } = useQuery(gql(getTraining), {
    variables: { id: trainingId },
  })
  const [addNewAttendee] = useMutation(gql(createAttendee))

  useEffect(() => {
    if (trainingData && (!training || trainingId === trainingData?.getTraining?.id)) {
      setTraining(trainingData.getTraining)
    }
  }, [trainingData, training, trainingId])

  if (error) {
    return <p>An error occured</p>
  }

  if (loading || !training) {
    return <p>Please wait...</p>
  }

  const onChangeAttendeeName = (event) => {
    setAttendeeName(event.target.value)
  }

  const onChangeAttendeeEmail = (event) => {
    setAttendeeEmail(event.target.value)
  }

  const handleSubmit = async () => {
    const result = await addNewAttendee({
      variables: {
        input: {
          name: attendeeName,
          email: attendeeEmail,
          trainingId,
        },
      },
    })
    setAttendeeId(result.data.createAttendee.id)
    onModalOpen()
  }

  return (
    <>
      <Center w="100%" h="100%">
        <VStack
          fontFamily="heading"
          padding="8"
          bg="rgba(255, 255, 255, 0.1)"
          borderRadius="md"
          alignItems="flex-start"
        >
          <Box fontWeight="bold">Training registration form:</Box>
          <Box>Title: {training.title}</Box>
          {training.description && <Box>{training.description}</Box>}
          <Box>Start time: {prettyTime(new Date(Number(training.scheduledTime)))}</Box>; ;
          <FormControl>
            <FormLabel>Your name</FormLabel>
            <Input fontSize="12" value={attendeeName} onChange={onChangeAttendeeName} h="24px" />
          </FormControl>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input fontSize="12" value={attendeeEmail} onChange={onChangeAttendeeEmail} h="24px" />
          </FormControl>
          <Button size="md" onClick={handleSubmit}>
            Save
          </Button>
        </VStack>

        <Modal isOpen={isModalOpen} scrollBehavior="inside">
          <ModalOverlay />
          <ModalContent height="300px">
            <ModalHeader>
              <Flex justifyContent="center">Thanks for registering!</Flex>
            </ModalHeader>
            <ModalBody>
              <Box justifyContent="center" textAlign="center">
                <Box paddingBottom="10px">
                  You will soon receive an email with a link you can use to join the training at the
                  scheduled time.
                </Box>
                <Box paddingBottom="10px">Use this link to change or delete your registration.</Box>
                <a target="_blank" rel="noreferrer" href={`/registration-update/${attendeeId}`}>
                  {window.location.href}registration-update/{attendeeId}
                </a>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Center>
    </>
  )
}
