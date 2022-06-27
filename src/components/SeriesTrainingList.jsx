import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Table, Tr, Th, Td, Tbody, Thead, Box, Button, Flex, IconButton, Spacer, useDisclosure, Modal, ModalOverlay,ModalHeader,ModalContent,ModalBody,ModalFooter, } from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { HStack} from '@chakra-ui/layout'
import { CloseIcon } from '@chakra-ui/icons'
import { createTraining, deleteTraining } from '../graphql/mutations'
import { TrainingForm } from './TrainingForm'
import { ConfirmationModal } from './ConfirmationModal'
import { onCreateTraining, onDeleteTraining, onUpdateTraining } from '../graphql/subscriptions'
// import { useEffect } from 'react'

export const SeriesTrainingList = ({ series, trainings = [], startTraining, deleteTraining }) => {

  const [addTraining] = useMutation(gql(createTraining))
  const [newTraining, setNewTraining] = useState(false)
  const [currentTraining, setCurrentTraining] = useState()
  //   const [deleteTheTraining] = useMutation(gql(deleteTraining))
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false)
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()

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
    // const func =(e) => eatEvent(e, handleTrainingClick)
    // func()
    setNewTraining(true)
    const now = new Date()
    const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 12, 0, 0) // noon tomorrow
    const result = await addTraining({
      variables: {
        input: {
          trainerName: series.trainerName,
          title: '',
          seriesTitle: series.title,
          description: series.description,
          email: series.email,
          type: 'TEMP',
          meetingId: series.meetingId,
          seriesId: series.id,
          scheduledTime,
          moderatorPasscode: series.moderatorPasscode,
          participantPasscode: series.participantPasscode,
          audioStateKey: 1,
          videoStateKey: 1,
          whiteboardUrl: series.whiteboardUrl,
        },
      },
    })

    // retrieve polls for the series
    // for each poll create a new poll with the training id
    //  const { data: seriesPolls, subscribeToMore } = useQuery(gql(listPolls), {
    //  variables: { filter: { trainingId: { eq: series.id } } },
    // })

    setCurrentTraining(result.data.createTraining)
    onModalOpen()
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
          {trainings.length === 0 ? (
            <Tr>
              <Td>*None*</Td>
            </Tr>
          ) : (
            trainings.map((training) => {
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
