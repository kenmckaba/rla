import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { listTrainings } from '../graphql/queries'
import {
  Avatar,
  HStack,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  Box,
  Button,
  Table,
  Tr,
  Th,
  Td,
  Tbody,
  Icon,
  IconButton,
  Thead,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  useDisclosure,
  Flex,
  Spacer,
  Stat,
  StatLabel,
  StatHelpText,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogCloseButton,
} from '@chakra-ui/react'
import { AddIcon, CalendarIcon, CloseIcon } from '@chakra-ui/icons'
import { IoIosCalendar } from 'react-icons/io'
import { IoTrashOutline } from 'react-icons/io5'
import { TrainingForm } from './TrainingForm'
import { useEffect } from 'react'
import { onCreateTraining, onDeleteTraining, onUpdateTraining } from '../graphql/subscriptions'
import { buildSubscription } from 'aws-appsync'
import { createTraining, deleteTraining } from '../graphql/mutations'
import { prettyTime } from '../pretty-time'
import { TrainingToolbar } from './Trainings/TrainingToolbar'
import Background from './Background'

export const TrainingList = () => {
  const [trainings, setTrainings] = useState([])
  const [newTraining, setNewTraining] = useState(false)
  const [currentTraining, setCurrentTraining] = useState()
  const { loading, error, data, subscribeToMore } = useQuery(gql(listTrainings))
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()
  const cancelRef = React.useRef()
  const [addTraining] = useMutation(gql(createTraining))
  const [removeTraining] = useMutation(gql(deleteTraining))
  const [trainingHovered, setTrainingHovered] = useState(-1)

  useEffect(() => {
    if (data) {
      const tr = data.listTrainings.items.filter((t) => t.title !== '<temp>')
      setTrainings(tr)
    }
  }, [data])

  useEffect(() => {
    if (subscribeToMore) {
      const cleanupFuncs = [
        subscribeToMore(buildSubscription(gql(onCreateTraining), gql(listTrainings))),
        subscribeToMore(buildSubscription(gql(onUpdateTraining), gql(listTrainings))),
        subscribeToMore(buildSubscription(gql(onDeleteTraining), gql(listTrainings))),
      ]
      /*       return () => {
        cleanupFuncs.forEach((func) => func())
      } */
    }
  }, [subscribeToMore])

  if (error) {
    return <p>An error occurred</p>
  }

  if (loading) {
    return <p>Please wait...</p>
  }

  const handleTrainingClick = async (training) => {
    setCurrentTraining(training)
    setNewTraining(false)
    onModalOpen()
  }

  const onNewTraining = async () => {
    setNewTraining(true)
    const result = await addTraining({
      variables: {
        input: {
          trainerName: '',
          title: '<temp>',
          meetingId: '',
          scheduledTime: Date.now(),
          moderatorPasscode: '',
          participantPasscode: '',
        },
      },
    })
    setCurrentTraining(result.data.createTraining)
    onModalOpen()
  }

  const openRegPage = (trainingId) => {
    window.open(`/trainerInSession/${trainingId}`)
  }

  const handleDelete = async (trainingId) => {
    await removeTraining({ variables: { input: { id: trainingId } } })
    onAlertClose()
    onModalClose()
  }

  const Trainings = ({ past }) => {
    if (!trainings || trainings.length === 0) {
      return (
        <Tr>
          <Td>*None*</Td>
        </Tr>
      )
    }
    const selected = trainings.filter((training) => {
      return past === !!training.startedAt
    })
    if (selected?.length === 0) {
      return (
        <Tr>
          <Td>*None*</Td>
        </Tr>
      )
    }

    return selected.map((training) => (
      <Tr
        key={training.id}
        _hover={{
          bg: 'rgba(255, 255, 255, 0.1)',
        }}
        onMouseEnter={() => {
          setTrainingHovered(training.id)
        }}
        onMouseLeave={() => {
          setTrainingHovered(-1)
        }}
        cursor="pointer"
      >
        <Td>
          <Stat>
            <StatLabel fontSize="1.25em" fontWeight="semibold" textTransform="capitalize">
              {training.title}
            </StatLabel>
            <StatHelpText fontSize="0.75em" textTransform="uppercase">
              trainer: {training.trainerName}
            </StatHelpText>
          </Stat>
        </Td>
        <Td>
          <HStack>
            {training.attendees.items.slice(0, 5).map((attendee) => (
              <Avatar
                key={attendee.id}
                name={attendee.name}
                color="white"
                bg="rgba(255, 255, 255, 0.1)"
              />
            ))}
          </HStack>
        </Td>
        <Td></Td>
        <Td>
          {trainingHovered === training.id ? (
            <TrainingToolbar
              editTraining={() => handleTrainingClick(training)}
              startTraining={() => openRegPage(training.id)}
            />
          ) : (
            prettyTime(new Date(Number(training.scheduledTime)))
          )}
        </Td>
      </Tr>
    ))
  }

  const ListTable = ({ children }) => {
    return (
      <Table variant="unstyled">
        <Thead borderBottom="2px" borderColor="rgba(255, 255, 255, 0.2)">
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
        </Thead>
        <Tbody>{children}</Tbody>
      </Table>
    )
  }

  return (
    <Background>
      <Box height="100%" width="100%" padding="3px" borderRadius="20px">
        <Tabs height="100%" width="100%" variant="solid-rounded">
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
                Upcoming training
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
                Completed training
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
          <TabPanels
            minHeight="75vh"
            width="100%"
            color="white"
            borderRadius="5px"
            bg="rgba(255, 255, 255, 0.1)"
            mt="4"
          >
            <TabPanel p={0} m={0}>
              <ListTable>{Trainings({ past: false })}</ListTable>
            </TabPanel>
            <TabPanel p={0} m={0}>
              <ListTable>{Trainings({ past: true })}</ListTable>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onAlertClose}
          isOpen={isAlertOpen}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent color="darkKnight.700">
            <AlertDialogHeader fontSize="1.1em">
              Are you sure you want to delete this training?
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              <HStack spacing="3" marginBlock="3">
                <Button w="100%" size="md" variant="outline" ref={cancelRef} onClick={onAlertClose}>
                  No
                </Button>
                <Button w="100%" size="md" onClick={() => handleDelete(currentTraining?.id)}>
                  Yes
                </Button>
              </HStack>
            </AlertDialogBody>
            {/*               <Button ref={cancelRef} onClick={onAlertClose}>
                No
              </Button>
              <Button colorScheme="red" onClick={() => handleDelete(currentTraining?.id)} ml={3}>
                Yes
              </Button> */}
          </AlertDialogContent>
        </AlertDialog>
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
                      aria-label="Delete training"
                      icon={<Icon as={IoTrashOutline} boxSize={5} />}
                      onClick={onAlertOpen}
                    />
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
              <TrainingForm onClose={onModalClose} trainingId={currentTraining?.id} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Background>
  )
}
