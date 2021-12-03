import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { listTrainings } from '../graphql/queries'
import {
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  Box,
  Button,
  Table,
  Tr,
  Td,
  Tbody,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import { TrainingForm } from './TrainingForm'
import { useEffect } from 'react'
import { onCreateTraining, onDeleteTraining, onUpdateTraining } from '../graphql/subscriptions'
import { buildSubscription } from 'aws-appsync'
import { createTraining, deleteTraining } from '../graphql/mutations'
import { Flex, HStack, Spacer } from '@chakra-ui/layout'
import { Stat, StatHelpText } from '@chakra-ui/stat'
import { StatLabel } from '@chakra-ui/stat'
import { TrainingToolbar } from './TrainingToolbar'
import { timestampToPrettyTime } from '../utils/pretty-time'
import AttendeeAvatar from './AttendeeAvatar'
import TrainingListHeader from './TrainingListHeader'
import ParticipantsModal from './ParticipantsModal'
import { IconButton } from '@chakra-ui/button'

export const TrainingList = () => {
  const [trainings, setTrainings] = useState([])
  const [newTraining, setNewTraining] = useState(false)
  const [currentTraining, setCurrentTraining] = useState()
  const { loading, error, data: trainingListData, subscribeToMore } = useQuery(gql(listTrainings))
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const [addTraining] = useMutation(gql(createTraining))
  const [deleteTheTraining] = useMutation(gql(deleteTraining))
  const [trainingHovered, setTrainingHovered] = useState(-1)
  const [showParticipantsModal, setShowParticipantsModal] = useState(false)

  const handleShowParticipantsModal = (training) => {
    setCurrentTraining(training)
    setShowParticipantsModal(true)
  }

  const MAX_ATTENDEE_ICONS = 5

  useEffect(() => {
    if (trainingListData) {
      const tr = trainingListData.listTrainings.items.filter((t) => t.type === 'TRAINING')
      setTrainings(tr)
    }
  }, [trainingListData])

  useEffect(() => {
    if (subscribeToMore) {
      const cleanupFuncs = [
        subscribeToMore(buildSubscription(gql(onCreateTraining), gql(listTrainings))),
        subscribeToMore(buildSubscription(gql(onUpdateTraining), gql(listTrainings))),
        subscribeToMore(buildSubscription(gql(onDeleteTraining), gql(listTrainings))),
      ]
      return () => {
        cleanupFuncs.forEach((func) => func && func())
      }
    }
  }, [subscribeToMore])

  const handleTrainingClick = async (training) => {
    setCurrentTraining(training)
    setNewTraining(false)
    onModalOpen()
  }

  const onNewTraining = async () => {
    setNewTraining(true)
    const now = new Date()
    const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 12, 0, 0) // noon tomorrow
    const result = await addTraining({
      variables: {
        input: {
          trainerName: '',
          title: '',
          type: 'TEMP',
          meetingId: '',
          scheduledTime,
          moderatorPasscode: '',
          participantPasscode: '',
        },
      },
    })
    setCurrentTraining(result.data.createTraining)
    onModalOpen()
  }

  const handleDelete = async (trainingId) => {
    await deleteTheTraining({ variables: { input: { id: trainingId } } })
    onModalClose()
  }

  const openRegPage = (trainingId) => {
    window.open(`/trainerInSession/${trainingId}`)
  }

  const Trainings = ({ past }) => {
    if (!trainings || trainings.length === 0) {
      return (
        <Tr>
          <Td>*None*</Td>
        </Tr>
      )
    }
    const selected = trainings
      .filter((training) => {
        return past === !!training.startedAt
      })
      .sort((first, second) => (first.scheduledTime < second.scheduledTime ? -1 : 1))

    if (selected?.length === 0) {
      return (
        <Tr>
          <Td>*None*</Td>
        </Tr>
      )
    }

    return selected.map((training) => (
      <Tr
        height="224px"
        width="1028px"
        key={training.id}
        onMouseEnter={() => {
          setTrainingHovered(training.id)
        }}
        onMouseLeave={() => {
          setTrainingHovered(-1)
        }}
        cursor="pointer"
      >
        <Flex
          borderRadius="5px"
          backgroundColor="rgba(255, 255, 255, 0.1)"
          direction="column"
          justify="center"
          _hover={{
            bg: 'rgba(255, 255, 255, 0.3)',
          }}
        >
          <Td marginBottom="6">
            <Flex justify="flex-start" height="50px">
              <Stat marginTop="2">
                <StatLabel
                  whiteSpace="nowrap"
                  fontSize="2em"
                  fontWeight="semibold"
                  textTransform="capitalize"
                >
                  {training.title}
                </StatLabel>
              </Stat>

              <Spacer />

              {trainingHovered === training.id && (
                <TrainingToolbar
                  editTraining={() => handleTrainingClick(training)}
                  startTraining={() => openRegPage(training.id)}
                  deleteTraining={() => handleDelete(training.id)}
                />
              )}
            </Flex>
          </Td>
          <Td paddingBottom="10">
            <HStack display="flex" justifyContent="space-between">
              <Flex direction="column">
                <StatLabel>
                  <StatHelpText fontSize="0.75em" textTransform="uppercase">
                    DATE/TIME
                  </StatHelpText>
                </StatLabel>
                <StatLabel>
                  <StatHelpText fontSize="0.90em" fontWeight="bold" textTransform="uppercase">
                    {timestampToPrettyTime(training.scheduledTime)}
                  </StatHelpText>
                </StatLabel>
              </Flex>
              <Flex direction="column">
                <StatLabel>
                  <StatHelpText fontSize="0.75em" textTransform="uppercase">
                    TRAINER NAME
                  </StatHelpText>
                </StatLabel>
                <StatLabel>
                  <StatHelpText fontSize="0.90em" fontWeight="bold" textTransform="uppercase">
                    {training.trainerName}
                  </StatHelpText>
                </StatLabel>
              </Flex>
              <Flex direction="column">
                <StatLabel>
                  <StatHelpText fontSize="0.75em" textTransform="uppercase">
                    ATTENDEES
                  </StatHelpText>
                </StatLabel>
                <Flex
                  height="24px"
                  onClick={() => handleShowParticipantsModal(training, training.attendees)}
                >
                  {training?.attendees?.items?.slice(0, MAX_ATTENDEE_ICONS).map((attendee) => (
                    <AttendeeAvatar key={attendee.id} attendee={attendee} />
                  ))}
                </Flex>
                {/* {training.attendees.items.length > MAX_ATTENDEE_ICONS && (
                  <Avatar
                    getInitials={(name) => name}
                    name={`+${training.attendees.items.length - MAX_ATTENDEE_ICONS}`}
                    color="white"
                    bg="rgba(255, 255, 255, 0.1)"
                  />
                )} */}
              </Flex>
              <Flex direction="column">
                <StatLabel>
                  <StatHelpText fontSize="0.75em" textTransform="uppercase">
                    BLUEJEANS MEETING
                  </StatHelpText>
                </StatLabel>
                <StatLabel>
                  <StatHelpText fontSize="0.90em" fontWeight="normal" textTransform="uppercase">
                    {`ID: ${training.meetingId}  moderator: ${training.moderatorPasscode}  participant: ${training.participantPasscode}`}
                  </StatHelpText>
                </StatLabel>
              </Flex>
            </HStack>
          </Td>
        </Flex>
      </Tr>
    ))
  }

  const PastTrainings = () => {
    return Trainings({ past: true })
  }

  const FutureTrainings = () => {
    return Trainings({ past: false })
  }

  if (error) {
    console.error('rla-log: error', error)
    return <p>An error occurred</p>
  }

  if (loading) {
    return <p>Please wait...</p>
  }

  const ListTable = ({ children }) => {
    return (
      <Table variant="unstyled">
        {/* <Thead borderBottom="2px" borderColor="rgba(255, 255, 255, 0.2)">
          <Tr>
            <Th fontWeight="thin" width="25%" color="white">
              Title
            </Th>
            <Th fontWeight="thin" width="25%" color="white">
              Attendee
            </Th>
            <Th fontWeight="thin" width="35%" />
            <Th fontWeight="thin" width="15%" color="white">
              <Icon as={IoIosCalendar} boxSize="1.5em" />
            </Th>
          </Tr>
        </Thead> */}
        <Tbody>{children}</Tbody>
      </Table>
    )
  }

  return (
    <>
      <TrainingListHeader trainings={trainings} />
      <Box height="100%" width="100%" padding="3px" borderRadius="20px">
        <Flex>
          <Tabs height="100%" width="81.7%" variant="solid-rounded">
            <Flex>
              <TabList>
                <Tab
                  textTransform="uppercase"
                  color="#ffffff"
                  height="32px"
                  fontSize="10pt"
                  paddingInline="26px"
                  minW="120px"
                  fontWeight="bold"
                  borderRadius="full"
                  bg="rgba(255, 255, 255, 0.1);"
                  mr="16px"
                  _focus={{
                    boxShadow: 'none',
                  }}
                  _selected={{
                    color: 'darkKnight.700',
                    bg: 'ghost.50',
                  }}
                >
                  Upcoming trainings
                </Tab>
                <Tab
                  textTransform="uppercase"
                  color="#ffffff"
                  height="32px"
                  fontSize="10pt"
                  paddingInline="26px"
                  minW="120px"
                  fontWeight="bold"
                  borderRadius="full"
                  bg="rgba(255, 255, 255, 0.1);"
                  _focus={{
                    boxShadow: 'none',
                  }}
                  _selected={{
                    color: 'darkKnight.700',
                    bg: 'ghost.50',
                  }}
                >
                  Completed trainings
                </Tab>
              </TabList>
              <Spacer />
              <Button
                variant="primary-transparent"
                size="sm"
                leftIcon={<AddIcon />}
                onClick={onNewTraining}
                fontSize="10pt"
                fontWeight="bold"
                minW="170px"
              >
                New training
              </Button>
            </Flex>
            <TabPanels width="100%" color="white" borderRadius="5px" mt="4">
              <TabPanel p={0} m={0}>
                <ListTable>{FutureTrainings()}</ListTable>
              </TabPanel>
              <TabPanel p={0} m={0}>
                <ListTable>{PastTrainings()}</ListTable>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <ParticipantsModal
            training={currentTraining}
            isOpen={showParticipantsModal}
            onClose={() => setShowParticipantsModal(false)}
          />

          <Modal isOpen={isModalOpen} scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent color="darkKnight.700">
              <ModalHeader>
                <Flex>
                  <Box>{newTraining ? 'New Training' : 'Update Training'}</Box>
                  <Spacer></Spacer>
                  <Box>
                    <HStack spacing={2}>
                      <IconButton
                        variant="icon-button"
                        aria-label="Close form"
                        icon={<CloseIcon boxSize={3} />}
                        onClick={onModalClose}
                      />
                    </HStack>
                  </Box>
                </Flex>
              </ModalHeader>
              <ModalBody>
                <TrainingForm
                  onClose={onModalClose}
                  trainingId={currentTraining?.id}
                  onDelete={handleDelete}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
      </Box>
    </>
  )
}
