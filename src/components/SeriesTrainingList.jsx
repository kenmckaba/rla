import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Table, Tr, Th, Td, Tbody, Thead, Box, Button, Flex, IconButton, Spacer, useDisclosure, Modal, ModalOverlay,ModalHeader,ModalContent,ModalBody,ModalFooter, } from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { HStack} from '@chakra-ui/layout'
import { CloseIcon } from '@chakra-ui/icons'
import { createSharedDoc, createTraining, deleteTraining } from '../graphql/mutations'
import { TrainingForm } from './TrainingForm'
import { ConfirmationModal } from './ConfirmationModal'
import { onCreateTraining, onDeleteTraining, onUpdateTraining } from '../graphql/subscriptions'
import { listPolls, listSharedDocs} from '../graphql/queries'
import { useMemo, useEffect } from 'react'
import { createPoll, updatePoll, updateTraining } from '../graphql/mutations'

export const SeriesTrainingList = ({ trainingId, trainerName,  trainerEmail, description, seriesTitle, seriesId, whiteboardUrl, polls, sharedDocs, meetingId, moderatorPasscode, participantPasscode, startTraining, deleteTraining }) => {

  const [addTraining] = useMutation(gql(createTraining))
  const [newTraining, setNewTraining] = useState(false)
  const [currentTraining, setCurrentTraining] = useState()
  //   const [deleteTheTraining] = useMutation(gql(deleteTraining))
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false)
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const [trainingList, setTrainingList] = useState([])
  const [addNewPoll] = useMutation(gql(createPoll))
  const [addNewSharedDoc] = useMutation(gql(createSharedDoc))
  const [updateCurrentTraining, { error: updateError }] = useMutation(gql(updateTraining))


  const confirmDelete = (training) => {
    setCurrentTraining(training)
    setIsConfirmDeleteModalOpen(true)
  }

  const eatEvent = (e, func) => {
    e.preventDefault()
    e.stopPropagation()
    func()
  }

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
          trainerName,
          title: '',
          seriesTitle,
          description,
          trainerEmail,
          type: 'TEMP',
          meetingId,
          seriesId,
          scheduledTime,
          moderatorPasscode,
          participantPasscode,
          audioStateKey: 1,
          videoStateKey: 1,
          whiteboardUrl,
        },
      },
    })
    const newTraining = result.data.createTraining
    setCurrentTraining(newTraining)


    polls.map(async (poll) =>  {
    //   addNewPoll(poll)
      await addNewPoll({
        variables: {
          input: {
            question: poll.question,
            trainingId: newTraining.id,
            type: poll.type,
            answers: poll.answers,
            correctAnswerIndex: poll.correctAnswerIndex,
            multiAnswerIndexes: poll.multiAnswerIndexes,
          },
        },
      })
    })

    sharedDocs.map(async (sharedDoc) =>  {
      await addNewSharedDoc({
        variables: {
          input: {
            // id:sharedDoc.id,
            trainingId: newTraining.id,
            title: sharedDoc.title,
            type: sharedDoc.type,
            url: sharedDoc.url,
            // shared:sharedDoc.shared
          },
        },
      })
    })
    
    onModalOpen()
    setTrainingList((prev) => [...prev, newTraining])
    // trainingList.push(newTraining)
  }

  return (
    <>
      {/* <Box borderRadius="6px" borderWidth="1px" borderColor="gray.200" mt="3"> */}
      <Flex marginLeft="2px" marginTop="3px" justifyContent="space-between" float="left">
        <Button
          size="xs"
          marginLeft="3px"
          rightIcon={<AddIcon />}
          variant="outline"
          onClick={onNewTraining}
        //   onClick={(e) => eatEvent(e, handleTrainingClick)}
        //   isDisabled={isDisabled}
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
          {trainingList.length === 0 ? (
            <Tr>
              <Td>*None*</Td>
            </Tr>
          ) : (
            trainingList.map((training) => {
              return (
                <Tr key={training.id} cursor="pointer" onClick={() => addTraining(training)}>
                  <Td fontSize="12" paddingLeft="16px">
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
                  <Td fontSize="12" paddingLeft="16px">
                    <Button
                      variant="outline"
                      float="right"
                      color="lightslategray"
                      size="xs"
                      height="14px"
                      onClick={startTraining}
                    >
                        Start
                    </Button>
                  </Td>
                </Tr>
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
              {/* <Box>{newTraining ? (currentTraining.type === ('SERIES' || 'TEMPSERIES') ? 'New Series' : 'New Training') : 'Update Training'}</Box> */}
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

   
      {/* </Box> */}
    </>
    
  )
}
