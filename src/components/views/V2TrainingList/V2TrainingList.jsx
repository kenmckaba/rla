import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { listTrainings } from '../../../graphql/queries'
import {
  HStack,
  Box,
  Button,
  Table,
  Tr,
  Th,
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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogCloseButton,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { IoIosCalendar } from 'react-icons/io'
import { IoTrashOutline } from 'react-icons/io5'
import { TrainingForm } from '../../TrainingForm'
import { useEffect } from 'react'
import { onCreateTraining, onDeleteTraining, onUpdateTraining } from '../../../graphql/subscriptions'
import { buildSubscription } from 'aws-appsync'
import { createTraining, deleteTraining } from '../../../graphql/mutations'
import Background from '../../Background'
import O2TrainingListHeader from '../../organisms/O2TrainingListHeader'

const openRegPage = (trainingId) => {
  window.open(`/trainerInSession/${trainingId}`)
}

//TODO: Export to an organism/molecule file
export const ListTable = ({ children }) => {
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

export const V2TrainingList = () => {
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
      //TODO: Check if this can be deleted
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

  //TODO: Reaf: this logic is hardly coupled here, but should be outside the return of the React component
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

  const handleDelete = async (trainingId) => {
    await removeTraining({ variables: { input: { id: trainingId } } })
    onAlertClose()
    onModalClose()
  }

  return (
    <Background>
      <Box height="100%" width="100%" padding="3px" borderRadius="20px">
        <O2TrainingListHeader
          onNewTraining={onNewTraining}
          trainings={trainings}
          trainingHovered={trainingHovered}
          setTrainingHovered={setTrainingHovered}
          handleTrainingClick={handleTrainingClick}
          openRegPage={openRegPage}
        />
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
                    {!newTraining && (
                      <IconButton
                        variant="icon-button"
                        aria-label="Delete training"
                        icon={<Icon as={IoTrashOutline} boxSize={5} />}
                        onClick={onAlertOpen}
                      />
                    )}
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
