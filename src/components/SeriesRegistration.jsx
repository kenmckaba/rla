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

export const SeriesRegistration = ({
  match: {
    params: { trainingId, invitedStudentId },
  },
}) => {
  const [training, setTraining] = useState()
  const [invitedStudent, setInvitedStudent] = useState()
  const [attendeeId, setAttendeeId] = useState()
  const [attendeeName, setAttendeeName] = useState('')
  const [attendeeEmail, setAttendeeEmail] = useState('')
  const [isFull, setIsFull] = useState(false)
  const updatedStudent = useRef(false)


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

  const alreadyRegistered = () => {
    if (!invitedStudent?.attendeeId) {
      return false
    }
    return !updatedStudent.current
  }

  const handleJoin = () => {}



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
              Series registration form:
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
                    Select one training from the options below:
                  </FormLabel>
                </FormControl>
                
                <HStack w="100%" spacing="3" paddingTop="3">
                  <Button w="100%" size="md" variant="secondary-ghost-outline">
                    Cancel
                  </Button>
                  <Button w="100%" size="md" variant="primary-trueblue" onClick={handleJoin}>
                    Register
                  </Button>
                </HStack>
              </Box>
            )}
          </VStack>
        </Flex>
      </Box>
    </Flex>
  )
}
