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
  useToast,
  HStack,
} from '@chakra-ui/react'
import { getAttendee } from '../graphql/queries'
import { gql, useMutation, useQuery } from '@apollo/client'
import { deleteAttendee, updateAttendee } from '../graphql/mutations'
import { prettyTime } from '../pretty-time'

export const RegistrationUpdate = ({
  match: {
    params: { attendeeId },
  },
}) => {
  const [training, setTraining] = useState()
  const [attendeeName, setAttendeeName] = useState('')
  const [attendeeEmail, setAttendeeEmail] = useState('')
  const { isOpen: isModalOpen, onOpen: onModalOpen } = useDisclosure()

  const {
    data: attendeeData,
    error,
    loading,
  } = useQuery(gql(getAttendee), {
    variables: { id: attendeeId },
  })
  const [updateCurrentAttendee] = useMutation(gql(updateAttendee))
  const [deleteCurrentAttendee] = useMutation(gql(deleteAttendee))
  const toast = useToast()

  useEffect(() => {
    if (attendeeData) {
      setTraining(attendeeData.getAttendee.training)
      setAttendeeName(attendeeData.getAttendee.name)
      setAttendeeEmail(attendeeData.getAttendee.email)
    }
  }, [attendeeData])

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
    await updateCurrentAttendee({
      variables: {
        input: {
          id: attendeeId,
          name: attendeeName,
          email: attendeeEmail,
        },
      },
    })
    toast({
      title: 'Saved',
      description: 'Your registration has been updated.',
      status: 'success',
      duration: 4000,
      isClosable: true,
    })
  }

  const handleCancel = async () => {
    await deleteCurrentAttendee({
      variables: {
        input: {
          id: attendeeId,
        },
      },
    })
    onModalOpen()
  }

  return (
    <>
      <VStack padding="3" background="white" borderRadius="20px" alignItems="flex-start">
        <Box fontWeight="bold">Update attendee registration:</Box>
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
        <HStack>
          <Button size="md" onClick={handleSubmit}>
            Save
          </Button>
          <Button size="md" onClick={handleCancel} variant="outline">
            Cancel registration
          </Button>
        </HStack>
      </VStack>

      <Modal isOpen={isModalOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent height="300px">
          <ModalHeader>
            <Flex justifyContent="center">Your registration has been cancelled.</Flex>
          </ModalHeader>
          <ModalBody>
            <Flex justifyContent="center" textAlign="center">
              Thank you!
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
