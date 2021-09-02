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
  Th,
  Td,
  Tbody,
  Thead,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  useDisclosure,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { TrainingForm } from './TrainingForm'
import { useEffect } from 'react'
import { onCreateTraining, onDeleteTraining, onUpdateTraining } from '../graphql/subscriptions'
import { buildSubscription } from 'aws-appsync'
import { createTraining } from '../graphql/mutations'
import { prettyTime } from '../pretty-time'

export const TrainingList = () => {
  const [trainings, setTrainings] = useState([])
  const [newTraining, setNewTraining] = useState(false)
  const [currentTraining, setCurrentTraining] = useState()
  const { loading, error, data, subscribeToMore } = useQuery(gql(listTrainings))
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const [addTraining] = useMutation(gql(createTraining))

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
      <Tr key={training.id} onClick={() => handleTrainingClick(training)} cursor="pointer">
        <Td>{prettyTime(new Date(Number(training.scheduledTime)))}</Td>
        <Td>{training.title}</Td>
      </Tr>
    ))
  }

  const ListTable = ({ children }) => {
    return (
      <Table size="sm">
        <Thead>
          <Tr>
            <Th color="white" w="210px">
              Scheduled
            </Th>
            <Th color="white">Title</Th>
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </Table>
    )
  }

  return (
    <Box height="100%" padding="3px" bg="brand.50" borderRadius="20px">
      <Tabs variant="solid-rounded">
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
          <Button variant="primary-ghost" size="sm" leftIcon={<AddIcon />} onClick={onNewTraining}>
            New training
          </Button>
        </Flex>
        <TabPanels color="white" bg="rgba(255, 255, 255, 0.1)" mt="2">
          <TabPanel>
            <ListTable>{Trainings({ past: false })}</ListTable>
          </TabPanel>
          <TabPanel>
            <ListTable>{Trainings({ past: true })}</ListTable>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Modal isOpen={isModalOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{newTraining ? 'New Training' : 'Update Training'}</ModalHeader>
          <ModalBody>
            <TrainingForm onClose={onModalClose} trainingId={currentTraining?.id} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
