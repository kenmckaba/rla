import React, { useRef, useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import {
  Table,
  Tr,
  Th,
  Td,
  Tbody,
  Thead,
  Box,
  Button,
  Flex,
  IconButton,
  Spacer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { HStack } from '@chakra-ui/layout'
import { CloseIcon } from '@chakra-ui/icons'
import { createSharedDoc, createTraining, deleteTraining } from '../graphql/mutations'
import { TrainingForm } from './TrainingForm'
import { ConfirmationModal } from './ConfirmationModal'
import { onCreateTraining, onDeleteTraining, onUpdateTraining } from '../graphql/subscriptions'
import { listPolls, listSharedDocs, listTrainings } from '../graphql/queries'
import { useMemo, useEffect } from 'react'
import { createPoll, updatePoll, updateTraining } from '../graphql/mutations'
import { buildSubscription } from 'aws-appsync'

export const SeriesTrainingList = ({ series, deleteTraining, saveSeries }) => {
  const [addTraining] = useMutation(gql(createTraining))
  const [newTraining, setNewTraining] = useState(false)
  const [currentTraining, setCurrentTraining] = useState()
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false)
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const [trainingList, setTrainingList] = useState([])
  const [addNewPoll] = useMutation(gql(createPoll))
  const [addNewSharedDoc] = useMutation(gql(createSharedDoc))
  const [updateCurrentTraining, { error: updateError }] = useMutation(gql(updateTraining))
  const { data: seriesListData, subscribeToMore } = useQuery(gql(listTrainings), {
    variables: { limit: 1000, filter: { seriesId: { eq: series.id } } },
  })

  useEffect(() => {
    if (seriesListData) {
      setTrainingList(seriesListData.listTrainings.items)
    }
  }, [seriesListData])

  useEffect(() => {
    if (subscribeToMore) {
      return subscribeToMore(buildSubscription(gql(onCreateTraining), gql(listTrainings)))
    }
  }, [subscribeToMore])

  const confirmDelete = (training) => {
    setCurrentTraining(training)
    setIsConfirmDeleteModalOpen(true)
  }

  const openTrainingModal = async () => {
    saveSeries()

    setNewTraining(true)
    const now = new Date()
    const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 12, 0, 0) // noon tomorrow
    const result = await addTraining({
      variables: {
        input: {
          title: series.title,
          trainerName: series.trainerName,
          description: series.description,
          trainerEmail: series.trainerEmail,
          type: 'TEMP',
          meetingId: series.meetingId,
          seriesId: series.id,
          scheduledTime,
          moderatorPasscode: series.moderatorPasscode,
          participantPasscode: series.participantPasscode,
          audioStateKey: 1,
          videoStateKey: 1,
          whiteboardUrl: series.whiteboardUrl,
          maxInPersonAttendees: series.maxInPersonAttendees,
          maxOnlineAttendees: series.maxOnlineAttendees,
        },
      },
    })

    const theTraining = result.data.createTraining
    // setCurrentTraining(theTraining)

    series.polls?.map(async (poll) => {
      await addNewPoll({
        variables: {
          input: {
            question: poll.question,
            trainingId: theTraining.id,
            type: poll.type,
            answers: poll.answers,
            correctAnswerIndex: poll.correctAnswerIndex,
            multiAnswerIndexes: poll.multiAnswerIndexes,
          },
        },
      })
    })

    series.sharedDocs?.map(async (sharedDoc) => {
      await addNewSharedDoc({
        variables: {
          input: {
            trainingId: theTraining.id,
            title: sharedDoc.title,
            type: sharedDoc.type,
            url: sharedDoc.url,
          },
        },
      })
    })

    setCurrentTraining(theTraining)
    onModalOpen()
  }

  const handleTrainingClick = async (training) => {
    setCurrentTraining(training)
    setNewTraining(false)
    onModalOpen()
  }

  return (
    <>
      <Flex marginLeft="2px" marginTop="3px" justifyContent="space-between" float="left">
        <Button
          size="xs"
          marginLeft="3px"
          rightIcon={<AddIcon />}
          variant="outline"
          onClick={openTrainingModal}
        >
          Add a training
        </Button>
      </Flex>

      <Table size="sm">
        <Thead>
          <Tr>
            <Th w="12rem" pb="0">
              Trainings
            </Th>
            <Th pn="0"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {!trainingList ? (
            <Tr>
              <Td>*None*</Td>
            </Tr>
          ) : (
            trainingList.map((training) => {
              return (
                training?.type === 'TRAINING' && (
                  <Tr key={training.id} cursor="pointer">
                    <Td
                      fontSize="12"
                      paddingLeft="16px"
                      onClick={() => handleTrainingClick(training)}
                    >
                      {training.title}
                    </Td>
                    <Td fontSize="12" padding="0">
                      <IconButton
                        icon={<DeleteIcon />}
                        color="lightslategray"
                        background="white"
                        float="right"
                        size="xs"
                        height="14px"
                        onClick={deleteTraining}
                      >
                        Delete
                      </IconButton>
                    </Td>
                  </Tr>
                )
              )
            })
          )}
        </Tbody>
      </Table>

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
              onDelete={() => confirmDelete(currentTraining)}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
