import React, { useState, useEffect, useRef } from 'react'
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
  FormHelperText,
  RadioGroup,
  Radio,
} from '@chakra-ui/react'
import { getInvitedStudent, getTraining } from '../graphql/queries'
import { gql, useMutation, useQuery } from '@apollo/client'
import { createAttendee, updateInvitedStudent } from '../graphql/mutations'
import { timestampToPrettyTime } from '../utils/pretty-time'
import { sendJoinEmail } from '../utils/sendJoinEmail'

export const Registration = ({
  match: {
    params: { trainingId, invitedStudentId },
  },
}) => {
  const [training, setTraining] = useState()
  const [invitedStudent, setInvitedStudent] = useState()
  const [attendeeId, setAttendeeId] = useState()
  const [attendeeName, setAttendeeName] = useState('')
  const [attendeeEmail, setAttendeeEmail] = useState('')
  const [classPreference, setClassPreference] = useState('')
  const [isFull, setIsFull] = useState(false)
  const updatedStudent = useRef(false)
  const [inPersonCount, setInPersonCount] = useState(0)

  const { isOpen: isModalOpen, onOpen: onModalOpen } = useDisclosure()

  const {
    data: trainingData,
    error,
    loading,
  } = useQuery(gql(getTraining), {
    variables: { id: trainingId },
  })
  const { data: invitedStudentData } = useQuery(gql(getInvitedStudent), {
    variables: { id: invitedStudentId },
  })
  const [addNewAttendee] = useMutation(gql(createAttendee))
  const [updateStudent] = useMutation(gql(updateInvitedStudent))
  // const [updateMinInPersonAttendees] = useMutation(gql(minInPersonAttendees))

  useEffect(() => {
    if (trainingData && (!training || trainingId === trainingData?.getTraining?.id)) {
      const tr = trainingData.getTraining
      setTraining(tr)
      setIsFull(tr.attendees.items.length > tr.maxAttendees)
    }
  }, [trainingData, training, trainingId])

  useEffect(() => {
    if (invitedStudentData) {
      const student = invitedStudentData.getInvitedStudent
      setInvitedStudent(student)
      setAttendeeName(student.name)
      setAttendeeEmail(student.email)
    }
  }, [invitedStudentData])

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

  const onChangeClassPreference = (value) => {
    setClassPreference(value)
  }

  const alreadyRegistered = () => {
    if (!invitedStudent?.attendeeId) {
      return false
    }
    return !updatedStudent.current
  }

  const handleSubmit = async () => {
    const result = await addNewAttendee({
      variables: {
        input: {
          name: attendeeName,
          email: attendeeEmail,
          trainingId,
          classPreference,
          audioStateKey: 1,
          videoStateKey: 1,
        },
      },
    })
    const id = result.data.createAttendee.id

    const counter= () => {
      setInPersonCount(inPersonCount + 1)
    }

    if (invitedStudentId) {
      updatedStudent.current = true

      // so we can connect InvitedStudent <-> attendee.
      // invitation emails contain the id of the invitation.
      // if none, they weren't explicitly invited, they went to the reg link,
      // so there is no InvitedStudent to connect
      await updateStudent({
        variables: {
          input: {
            id: invitedStudentId,
            attendeeId: id,
          },
        },
      })
    }
    
    setAttendeeId(id)
    if (classPreference === 'online') {
      sendJoinEmail(id, attendeeName, attendeeEmail, training)
    }
    if (classPreference === 'inperson') {
      counter()
    }
    onModalOpen()
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      direction="column"
      bgGradient="linear-gradient(180deg, #283683 0%, #396AA1 100%, #283683 100%);"
    >
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
            ) : alreadyRegistered() ? (
              <>
                <Box fontSize="32px">You have already registered for this training!</Box>
                <Box padding="10px">
                  Use{' '}
                  <Link
                    href={`${window.location.origin}/registration-update/${invitedStudent.attendeeId}`}
                    isExternal
                    cursor="pointer"
                    color="blue"
                  >
                    this link
                  </Link>{' '}
                  to change or delete your registration.
                </Box>
              </>
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
                    _focus={{ backgroundColor: 'white' }}
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
                    _focus={{ backgroundColor: 'white' }}
                    _placeholder={{ color: 'blue.700' }}
                    value={attendeeEmail}
                    onChange={onChangeAttendeeEmail}
                    h="8"
                  />
                  <FormHelperText color="white">
                    We'll send your join link to this email address.
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel textTransform="uppercase" fontWeight="semibold" paddingBottom="1">
                    Class Preference
                  </FormLabel>
                  <RadioGroup onChange={onChangeClassPreference} value={classPreference}>
                    <HStack direction="row">
                      <Radio value="online">Online</Radio>
                      <Radio value="inperson">In-Person*</Radio>
                    </HStack>
                  </RadioGroup>
                  <FormHelperText color="white">
                    *Required no. of students in-person is {training.minInPersonAttendees}. Current no. of students registered in-person is {inPersonCount}
                  </FormHelperText>
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
