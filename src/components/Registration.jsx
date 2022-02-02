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
  Stat,
  Link,
  StatLabel,
  StatHelpText,
  HStack,
} from '@chakra-ui/react'
import { getTraining } from '../graphql/queries'
import { gql, useMutation, useQuery } from '@apollo/client'
import { createAttendee } from '../graphql/mutations'
import { timestampToPrettyTime } from '../utils/pretty-time'
import { sendJoinEmail } from '../utils/sendJoinEmail'

export const Registration = ({
  match: {
    params: { trainingId },
  },
}) => {
  const [training, setTraining] = useState()
  const [attendeeId, setAttendeeId] = useState()
  const [attendeeName, setAttendeeName] = useState('')
  const [attendeeEmail, setAttendeeEmail] = useState('')
  const [isFull, setIsFull] = useState(false)
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
      const tr = trainingData.getTraining
      setTraining(tr)
      setIsFull(tr.attendees.items.length > tr.maxAttendees)
    }
  }, [trainingData, training, trainingId])

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
    const result = await addNewAttendee({
      variables: {
        input: {
          name: attendeeName,
          email: attendeeEmail,
          trainingId,
          audioStateKey: 1,
          videoStateKey: 1,
        },
      },
    })
    const id = result.data.createAttendee.id
    setAttendeeId(id)
    sendJoinEmail(id, attendeeName, attendeeEmail, training)
    onModalOpen()
  }

  return (
    <Flex w="100vw" h="100vh" direction="column" bgGradient="linear-gradient(180deg, #283683 0%, #396AA1 100%, #283683 100%);"    >
      <Box w="100%" h="100%">
        <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
          <VStack
            fontFamily="heading"
            padding="8"
            width="100%"
            maxWidth="720px"
            bg="rgba(255, 255, 255, 0.1)"
            borderRadius="md"
            alignItems="flex-start"
          >
            <Box textTransform="uppercase" fontWeight="thin" fontSize="0.75em">
              Training registration form:
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
            <HStack>
              <Box>Trainer: {training.trainerName}</Box>
              <Link href={`mailto:${training.trainerEmail}`} isExternal cursor="pointer">
                {training.trainerEmail}
              </Link>
            </HStack>
            {isFull ? (
              <Box fontSize="2em">Sorry, the training is full!</Box>
            ) : (
              <Box width="100%">
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
                  <Button w="100%" size="md" variant="secondary-ghost-outline">
                    Cancel
                  </Button>
                  <Button w="100%" size="md" variant="primary-trueblue" onClick={handleSubmit}>
                    Save
                  </Button>
                </HStack>
              </Box>
            )}
          </VStack>

          <Modal isOpen={isModalOpen} scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent color="darkKnight.700">
              <ModalHeader>
                <Flex justifyContent="center">Thanks for registering!</Flex>
              </ModalHeader>
              <ModalBody>
                <Box justifyContent="center" textAlign="center">
                  <Box paddingBottom="10px">
                    You will soon receive an email with a link you can use to join the training at
                    the scheduled time.
                  </Box>
                  <Box paddingBottom="10px">
                    Use{' '}
                    <Link
                      href={`${window.location.origin}/registration-update/${attendeeId}`}
                      isExternal
                      cursor="pointer"
                      color="blue"
                    >
                      this link
                    </Link>{' '}
                    to change or delete your registration.
                  </Box>
                </Box>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
      </Box>
    </Flex>
  )
}
