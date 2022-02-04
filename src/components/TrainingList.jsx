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
  ModalFooter,
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
import { InvitedList } from './InvitedList'
import FilteredDatePicker from './FilteredDatePicker'
import Header from './Header'

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
  const [showInvitedModal, setShowInvitedModal] = useState(false)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [selectedTrainings, setSelectedTraining] = useState([])
  const [tabIndex, setTabIndex] = useState(0)
  const [disabledTabs, setDisabledTabs] = useState(false)

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

  useEffect(() => {
    if (startDate && endDate) {
      setDisabledTabs(true)
      setSelectedTraining(
        trainings
          .sort((first, second) => (first.scheduledTime > second.scheduledTime ? -1 : 1))
          .filter((training) => {
            let trainingDate = new Date(training.scheduledTime)
            trainingDate = new Date(trainingDate.setHours(0, 0, 1))
            if (endDate) {
              if (trainingDate - startDate > 0) {
                return endDate - trainingDate > 0
              }
              return false
            }
            return startDate - trainingDate === 0
          }),
      )
    } else {
      setSelectedTraining(
        trainings
          .filter((training) => {
            return !!tabIndex === !!training.startedAt
          })
          .sort((first, second) => (first.scheduledTime < second.scheduledTime ? -1 : 1)),
      )
    }
  }, [trainings, tabIndex, startDate, endDate])

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
          audioStateKey: 1,
          videoStateKey: 1,
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

  const showInvited = (training) => {
    setCurrentTraining(training)
    setShowInvitedModal(true)
  }

  const clearDates = () => {
    setStartDate(null)
    setEndDate(null)
    setDisabledTabs(false)
  }
  const renderTrainings = () => {
    if (selectedTrainings?.length === 0) {
      return (
        <Tr height="224px" width="1028px" cursor="pointer" onClick={onNewTraining}>
          <Flex
            borderRadius="20px"
            backgroundColor="#396AA1"
            color="rgba(255,255,255, 0.9)"
            direction="column"
            justify="center"
            transition="0.3s"
            _hover={{
              backgroundColor: 'rgba(255,255,255, 0.9)',
              color: 'blue.600',
            }}
          >
            <Td py="30px">
              <Flex justify="flex-start" minH="10em">
                <Stat marginTop="2em">
                  <StatLabel whiteSpace="nowrap" fontSize="3em" textTransform="capitalize">
                    No Meetings in this category
                  </StatLabel>
                  <StatHelpText fontSize="0.90em" textTransform="uppercase">
                    <Button
                      // variant="light-blue"
                      bg="white"
                      border="solid 2px"
                      borderColor="blue.6oh no, yea, 00"
                      color="blue.600"
                      size="lg"
                      leftIcon={<AddIcon />}
                      onClick={onNewTraining}
                      fontSize="10pt"
                      fontWeight="bold"
                      minW="174px"
                      mt="3em"
                      _hover={{
                        backgroundColor: 'rgba(255,255,255, 0.9)',
                        color: 'blue.600',
                      }}
                    >
                      Create a new training
                    </Button>
                  </StatHelpText>
                </Stat>
              </Flex>
            </Td>
          </Flex>
        </Tr>
      )
    }

    return selectedTrainings.map((training) => (
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
          backgroundColor="#396AA1"
          color="rgba(255,255,255, 0.9)"
          direction="column"
          justify="center"
          transition="all 0.3s ease"
          _hover={{
            backgroundColor: 'rgba(255,255,255, 0.9)',
            color: 'blue.600',
          }}
        >
          <Td py="30px">
            <Flex justify="flex-start" minH="34px">
              <Stat marginTop="2">
                <StatLabel whiteSpace="nowrap" fontSize="2em" textTransform="capitalize">
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
              <Flex w="25%" direction="column">
                <StatLabel mb="1">
                  <StatHelpText fontSize="0.75em" textTransform="uppercase">
                    DATE/TIME
                  </StatHelpText>
                </StatLabel>
                <StatLabel>
                  <StatHelpText fontSize="0.90em" textTransform="uppercase">
                    {timestampToPrettyTime(training.scheduledTime)}
                  </StatHelpText>
                </StatLabel>
              </Flex>
              <Flex w="20%" direction="column">
                <StatLabel mb="1">
                  <StatHelpText fontSize="0.75em" textTransform="uppercase">
                    TRAINER NAME
                  </StatHelpText>
                </StatLabel>
                <StatLabel>
                  <StatHelpText fontSize="0.90em">{training.trainerName}</StatHelpText>
                </StatLabel>
              </Flex>
              <Flex w="25%" direction="column">
                <StatLabel mb="1">
                  <HStack>
                    <StatHelpText fontSize="0.75em" textTransform="uppercase">
                      ATTENDEES
                    </StatHelpText>
                    <Button
                      variant="outline"
                      size="xs"
                      color="lightgrey"
                      onClick={() => showInvited(training)}
                    >
                      Invited
                    </Button>
                  </HStack>
                </StatLabel>
                <Flex
                  height="24px"
                  onClick={() => handleShowParticipantsModal(training, training.attendees)}
                >
                  <HStack spacing={2}>
                    {training?.attendees?.items?.slice(0, MAX_ATTENDEE_ICONS).map((attendee) => (
                      <AttendeeAvatar key={attendee.id} attendee={attendee} />
                    ))}
                  </HStack>
                </Flex>
              </Flex>
              <Flex w="30%" direction="column">
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
        <Tbody>{children}</Tbody>
      </Table>
    )
  }

  return (
    <Box minH="100vh" bgGradient="linear-gradient(180deg, #283683 0%, #396AA1 100%, #283683 100%);">
      <Header />
      <TrainingListHeader trainings={trainings} />
      <Box height="100%">
        <Box padding="3px" borderRadius="20px">
          <Flex>
            <Tabs
              onChange={(index) => setTabIndex(index)}
              height="100%"
              width="100%"
              pt="30px"
              px="32px"
              variant="solid-rounded"
            >
              <Flex>
                <TabList>
                  <Tab
                    bg="darkPalette.4blur"
                    borderRadius="full"
                    color="white"
                    fontSize="10pt"
                    fontWeight="light"
                    minH="37px"
                    minW="200px"
                    mr="16px"
                    paddingInline="26px"
                    textTransform="uppercase"
                    isDisabled={disabledTabs}
                    _focus={{
                      boxShadow: 'none',
                    }}
                    _selected={{
                      color: 'white',
                      bg: 'blue.600',
                      fontWeight: 'bold',
                    }}
                    _disabled={{
                      color: 'white.500',
                      bg: 'white.300',
                      fontWeight: 'bold',
                      cursor: 'not-allowed',
                      pointerEvents: 'all !important',
                    }}
                  >
                    Upcoming trainings
                  </Tab>
                  <Tab
                    bg="darkPalette.4blur"
                    borderRadius="full"
                    color="white"
                    fontSize="10pt"
                    fontWeight="light"
                    minH="37px"
                    minW="200px"
                    mr="16px"
                    paddingInline="26px"
                    textTransform="uppercase"
                    isDisabled={disabledTabs}
                    _focus={{
                      boxShadow: 'none',
                    }}
                    _selected={{
                      color: 'white',
                      bg: 'blue.600',
                      fontWeight: 'bold',
                    }}
                    _disabled={{
                      color: 'white.500',
                      bg: 'white.300',
                      fontWeight: 'bold',
                      cursor: 'not-allowed',
                      pointerEvents: 'all !important',
                    }}
                  >
                    Completed trainings
                  </Tab>
                </TabList>
                <Spacer />
                <FilteredDatePicker
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  setDisabledTabs={setDisabledTabs}
                />

                {disabledTabs && (
                  <Button
                    variant="light-blue"
                    backgroundColor="#FF4E4E"
                    color="white"
                    size="md"
                    leftIcon={<CloseIcon />}
                    onClick={clearDates}
                    fontSize="10pt"
                    fontWeight="bold"
                    minW="174px"
                    mr={'2'}
                    _hover={{
                      backgroundColor: 'white',
                      color: '#FF4E4E',
                    }}
                  >
                    Clear Dates
                  </Button>
                )}
                <Button
                  variant="light-blue"
                  backgroundColor="rgba(13, 98, 197, 1)"
                  color="white"
                  size="md"
                  leftIcon={<AddIcon />}
                  onClick={onNewTraining}
                  fontSize="10pt"
                  fontWeight="bold"
                  minW="174px"
                >
                  New training
                </Button>
              </Flex>
              <TabPanels width="100%" color="white" borderRadius="5px" mt="4">
                <TabPanel p={0} m={0}>
                  <ListTable>{renderTrainings()}</ListTable>
                </TabPanel>
                <TabPanel p={0} m={0}>
                  <ListTable>{renderTrainings()}</ListTable>
                </TabPanel>
                <TabPanel p={0} m={0}>
                  <ListTable>{renderTrainings()}</ListTable>
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
            <Modal isOpen={showInvitedModal}>
              <ModalOverlay />
              <ModalContent maxWidth="unset" width="600px" color="darkKnight.700">
                <ModalHeader>Invited students</ModalHeader>
                <ModalBody>
                  <InvitedList training={currentTraining} />
                </ModalBody>
                <ModalFooter>
                  <Button onClick={() => setShowInvitedModal(false)}>Done</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}
