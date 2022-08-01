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
  Tr,
  Table,
  Tbody,
  Td,
} from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/button'
import { getInvitedStudent, getTraining, listTrainings } from '../graphql/queries'
import { gql, useMutation, useQuery } from '@apollo/client'
import { updateInvitedStudent } from '../graphql/mutations'
import { onCreateTraining } from '../graphql/subscriptions'
import { buildSubscription } from 'aws-appsync'
import { timestampToPrettyTime } from '../utils/pretty-time'

export const SeriesRegistration = ({
  match: {
    params: { trainingId, invitedStudentId },
  },
}) => {
  const [training, setTraining] = useState()
  const [invitedStudent, setInvitedStudent] = useState()
  const updatedStudent = useRef(false)
  const [trainingList, setTrainingList] = useState([])
  const [chosenTraining, setChosenTraining] = useState()

  const {
    data: trainingData,
    error,
    loading,
  } = useQuery(gql(getTraining), {
    variables: { id: trainingId },
  })

  // const { data: invitedStudentData } = useQuery(gql(getInvitedStudent), {
  //   variables: { id: invitedStudentId },
  // })

  const { data: seriesListData } = useQuery(gql(listTrainings), {
    variables: { filter: { seriesId: { eq: trainingId } } },
  })

  useEffect(() => {
    if (trainingData && (!training || trainingId === trainingData?.getTraining?.id)) {
      const tr = trainingData.getTraining
      setTraining(tr)
      // setIsFull(tr.attendees.items.length > tr.maxAttendees)
    }
  }, [trainingData, training, trainingId])

  useEffect(() => {
    if (seriesListData) {
      setTrainingList(seriesListData.listTrainings.items)
    }
  }, [seriesListData])

  // useEffect(() => {
  //   if (subscribeToMore) {
  //     return subscribeToMore(buildSubscription(gql(onCreateTraining), gql(listTrainings)))
  //   }
  // }, [subscribeToMore])

  if (error) {
    console.error('rla-log: error', error)
    return <p>An error occured</p>
  }

  if (loading || !training) {
    return <p>Please wait...</p>
  }

  const handleSubmit = async () => {
    window.location.href = `${window.location.origin}/registration/${trainingId}`
  }

  const alreadyRegistered = () => {
    if (!invitedStudent?.attendeeId) {
      return false
    }
    return !updatedStudent.current
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
              Series registration form:
            </Box>
            <Box paddingBottom="4">
              <Stat textTransform="capitalize" fontWeight="bold">
                <StatLabel fontSize="2em">{training.title}</StatLabel>
              </Stat>
            </Box>
            {training.description && <Box>{training.description}</Box>}
            <HStack>
              <Box>Trainer: {training.trainerName}</Box>
              <Link href={`mailto:${training.trainerEmail}`} isExternal cursor="pointer">
                {training.trainerEmail}
              </Link>
            </HStack>
            <Box width="100%">
              <Box fontSize="20px">Please register for only ONE of the following trainings: </Box>
              {/* display list of each training in the series */}
              <Table size="sm">
                {!trainingList ? (
                  <Tr>
                    <Td>*None*</Td>
                  </Tr>
                ) : (
                  <RadioGroup onChange={setChosenTraining} value={chosenTraining}>
                    {trainingList.map((training) => {
                      return (
                        training?.type === 'TRAINING' && (
                          <Tr key={training.id} cursor="pointer">
                            <Radio value={training.id}>
                              <Td fontSize="12" paddingLeft="16px">
                                {training.title}
                              </Td>
                              <Td fontSize="12" paddingLeft="16px">
                                {timestampToPrettyTime(training.scheduledTime)}
                              </Td>
                            </Radio>
                          </Tr>
                        )
                      )
                    })}
                  </RadioGroup>
                )}
              </Table>
            </Box>
            {/* <FormControl>
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
                // value={attendeeEmail}
                // onChange={onChangeAttendeeEmail}
                h="8"
              />
              <FormHelperText color="white">
                We'll send your join link to this email address.
              </FormHelperText>
            </FormControl>
            <HStack w="100%" spacing="3" paddingTop="3">
              <Button w="100%" size="md" variant="secondary-ghost-outline">
                Cancel
              </Button>
              <Button w="100%" size="md" variant="primary-trueblue" onClick={handleSubmit}>
                Save
              </Button>
            </HStack> */}
            <Button w="100%" size="md" variant="primary-trueblue" onClick={handleSubmit}>
              Register
            </Button>
          </VStack>
        </Flex>
      </Box>
    </Flex>
  )
}
