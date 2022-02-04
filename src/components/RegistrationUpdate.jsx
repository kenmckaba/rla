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
  Stat,
  StatLabel,
  StatHelpText,
} from '@chakra-ui/react'
import { getAttendee } from '../graphql/queries'
import { gql, useMutation, useQuery } from '@apollo/client'
import { deleteAttendee, updateAttendee } from '../graphql/mutations'
import { timestampToPrettyTime } from '../utils/pretty-time'

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
    console.error('rla-log: error', error)
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
    <Flex w="100vw" h="100vh" direction="column" bgGradient="linear-gradient(180deg, #283683 0%, #396AA1 100%, #283683 100%);"    >
      <Box w="100%" h="100%">
        <Flex w="100%" h="100%" justifyContent="center" alignItems="center">      <VStack
          fontFamily="heading"
          padding="8"
          width="100%"
          maxWidth="720px"
          bg="rgba(255, 255, 255, 0.1)"
          borderRadius="md"
          alignItems="flex-start"
        >
          <Box textTransform="uppercase" fontWeight="thin" fontSize="0.75em">
            Training update form:
          </Box>
          <Box paddingBottom="4">
            <Stat textTransform="capitalize" fontWeight="bold">
              <StatLabel fontSize="2em">{training.title}</StatLabel>
              <StatHelpText fontSize="0.875em">
                {timestampToPrettyTime(training.scheduledTime)}
              </StatHelpText>
            </Stat>
          </Box>
          {training.description && <Box>{training.description}</Box>}
          <FormControl>
            <FormLabel textTransform="uppercase" fontWeight="semibold" paddingBottom="1">
              Your name
            </FormLabel>
            <Input
              variant="filled"
              fontSize="0.75em"
              placeholder="Type your name here"
              color={'blue.900'}
              _focus={{backgroundColor: 'white',}}
              _placeholder={{ color: 'blue.700' }}
              value={attendeeName}
              onChange={onChangeAttendeeName}
              h="8"
            />
          </FormControl>
          <FormControl>
            <FormLabel textTransform="uppercase" fontWeight="semibold" paddingBottom="1">
              Email address
            </FormLabel>
            <Input
              variant="filled"
              fontSize="0.75em"
              placeholder="Type your email here"
              color={'blue.900'}
              _focus={{backgroundColor: 'white',}}
              _placeholder={{ color: 'blue.700' }}
              value={attendeeEmail}
              onChange={onChangeAttendeeEmail}
              h="8"
            />
          </FormControl>
          <HStack w="100%" spacing="3" paddingTop="3">
            <Button w="100%" size="md" variant="secondary-ghost-outline" onClick={handleCancel}>
              Cancel your registration
            </Button>
            <Button w="100%" size="md" variant="primary-trueblue" onClick={handleSubmit}>
              Save
            </Button>
          </HStack>
        </VStack>

        <Modal isOpen={isModalOpen} scrollBehavior="inside">
          <ModalOverlay />
          <ModalContent color="darkKnight.700">
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
        </Flex>
      </Box>
    </Flex>
  )
}
