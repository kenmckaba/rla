import React, { useState, useEffect } from 'react'
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Box,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  useDisclosure,
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react'
import { getTraining } from '../graphql/queries'
import { useMutation, gql, useQuery } from '@apollo/client'
import { deleteTraining, updateTraining } from '../graphql/mutations'
import { AttendeeList } from './AttendeeList'
import { AttendeeForm } from './AttendeeForm'
import DatePicker from './DatePicker'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { buildSubscription } from 'aws-appsync'
import {
  onCreateAttendee,
  onCreatePoll,
  onDeleteAttendee,
  onDeletePoll,
  onUpdateAttendee,
  onUpdatePoll,
} from '../graphql/subscriptions'
import { Polls } from './Polls'

export const TrainingForm = ({ onClose, trainingId }) => {
  const [gotTraining, setGotTraining] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [trainerName, setTrainerName] = useState('')
  const [scheduledTime, setScheduledTime] = useState(new Date())
  const [meetingId, setMeetingId] = useState('950585018')
  const [moderatorPasscode, setModeratorPasscode] = useState('1599')
  const [participantPasscode, setParticipantPasscode] = useState('6804')
  const [attendees, setAttendees] = useState([])
  const [polls, setPolls] = useState([])
  const [currentAttendee, setCurrentAttendee] = useState()

  const [updateCurrentTraining, { error: updateError }] = useMutation(gql(updateTraining))
  const [deleteCurrentTraining] = useMutation(gql(deleteTraining))
  const { data, error, loading, subscribeToMore } = useQuery(gql(getTraining), {
    variables: { id: trainingId },
  })
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()

  useEffect(() => {
    if (data) {
      const training = data.getTraining
      if (!gotTraining) {
        setGotTraining(true)
        setTitle(training.title === '<temp>' ? '' : training.title)
        setDescription((prev) => training.description || prev)
        setTrainerName(training.trainerName || '')
        setScheduledTime(new Date(Number(training.scheduledTime)))
        setMeetingId((prev) => training.meetingId || prev)
        setModeratorPasscode((prev) => training.moderatorPasscode || prev)
        setParticipantPasscode((prev) => training.participantPasscode || prev)
      }
      setAttendees(training.attendees.items)
      setPolls(training.polls.items)
    }
  }, [data, gotTraining])

  useEffect(() => {
    if (subscribeToMore) {
      const cleanupFuncs = [
        subscribeToMore(buildSubscription(gql(onCreateAttendee), gql(getTraining))),
        subscribeToMore(buildSubscription(gql(onDeleteAttendee), gql(getTraining))),
        subscribeToMore(buildSubscription(gql(onUpdateAttendee), gql(getTraining))),
        subscribeToMore(buildSubscription(gql(onUpdatePoll), gql(getTraining))),
        subscribeToMore(buildSubscription(gql(onCreatePoll), gql(getTraining))),
        subscribeToMore(buildSubscription(gql(onDeletePoll), gql(getTraining))),
      ]
      return () => {
        cleanupFuncs.forEach((func) => func())
      }
    }
  }, [subscribeToMore])

  if (error || updateError) {
    return <p>An error occurred</p>
  }

  if (loading) {
    return <p>Please wait...</p>
  }

  const onChangeTitle = (event) => {
    setTitle(event.target.value)
  }

  const onChangeDescription = (event) => {
    setDescription(event.target.value)
  }

  const onChangeTrainerName = (event) => {
    setTrainerName(event.target.value)
  }

  const onChangeMeetingId = (event) => {
    setMeetingId(event.target.value)
  }

  const onChangeScheduledFor = (value) => {
    setScheduledTime(value)
  }

  const onChangeModeratorPasscode = (event) => {
    setModeratorPasscode(event.target.value)
  }

  const onChangeParticipantPasscode = (event) => {
    setParticipantPasscode(event.target.value)
  }

  const mutationVars = () => {
    return {
      variables: {
        input: {
          id: trainingId,
          description,
          trainerName,
          title,
          meetingId,
          scheduledTime: scheduledTime.getTime(),
          moderatorPasscode,
          participantPasscode,
        },
      },
    }
  }

  const handleSubmit = async () => {
    const result = await updateCurrentTraining(mutationVars())
    onClose(result.data.updateTraining)
  }

  const handleCancel = () => {
    if (!trainingId) {
      handleDelete()
    }
    onClose()
  }

  const handleOpenAttendee = async (attendee) => {
    setCurrentAttendee(attendee)
    onModalOpen()
  }

  const onAttendeeClose = (attendee) => {
    if (attendee) {
      const attendeePos = attendees.findIndex((att) => {
        return att.id === attendee.id
      })
      if (attendeePos === -1) {
        setAttendees([...attendees, attendee])
      } else {
        attendees[attendeePos] = attendee
      }
    }
    onModalClose()
    updateCurrentTraining(mutationVars()) // save in case they try to join
  }

  const handleDelete = async () => {
    await deleteCurrentTraining({ variables: { input: { id: trainingId } } })
    onClose({ id: trainingId, DELETEME: true })
  }

  const openRegPage = (e) => {
    updateCurrentTraining(mutationVars()) // save in case they try to join
    window.open(`/trainerInSession/${trainingId}`)
  }

  return (
    <>
      <Box>
        <FormControl isRequired>
          <FormLabel mt="0">Title</FormLabel>
          <Input fontSize="12" value={title} onChange={onChangeTitle} h="24px" />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            fontSize="12"
            value={description}
            onChange={onChangeDescription}
            h="24px"
            placeholder="optional"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Trainer name</FormLabel>
          <Input fontSize="12" value={trainerName} onChange={onChangeTrainerName} h="24px" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Date & Time</FormLabel>
          <DatePicker
            fontSize="12"
            selected={scheduledTime}
            onChange={(date) => onChangeScheduledFor(date)}
            showTimeSelect
            dateFormat="Pp"
          />
        </FormControl>
        <Accordion width="100%" mt={2} allowToggle>
          <AccordionItem border="none">
            <AccordionButton
              height="26px"
              borderWidth="1px"
              borderRadius="4px"
              borderColor="rgb(226, 232, 240)"
            >
              <Box flex="1" fontSize="12px" fontWeight="500" textAlign="left">
                BlueJeans meeting
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel padding="0" pb={4}>
              <HStack mt="3">
                <FormControl isRequired>
                  <FormLabel>BlueJeans meeting ID</FormLabel>
                  <Input fontSize="12" value={meetingId} onChange={onChangeMeetingId} h="24px" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Moderator passcode</FormLabel>
                  <Input
                    fontSize="12"
                    value={moderatorPasscode}
                    onChange={onChangeModeratorPasscode}
                    h="24px"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Participant passcode</FormLabel>
                  <Input
                    fontSize="12"
                    value={participantPasscode}
                    onChange={onChangeParticipantPasscode}
                    h="24px"
                  />
                </FormControl>
              </HStack>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border="none">
            <AccordionButton
              height="26px"
              borderWidth="1px"
              borderRadius="4px"
              borderColor="rgb(226, 232, 240)"
              marginTop="2px"
            >
              <Box flex="1" fontSize="12px" fontWeight="500" textAlign="left">
                Attendees
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel padding="0" pb={4}>
              <FormControl padding="0" mt="10px" mb="2px">
                <FormLabel>Attendee registration page</FormLabel>
                <Box
                  borderRadius="6px"
                  pl="16px"
                  fontSize="12"
                  border="1px solid #e2e8f0"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  <Link href={`${window.location.href}registration/${trainingId}`} isExternal>
                    {window.location.href}registration/{trainingId}
                    <ExternalLinkIcon m="2px" />
                  </Link>
                </Box>
              </FormControl>
              <AttendeeList attendees={attendees} updateAttendee={handleOpenAttendee} />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem border="none">
            <AccordionButton
              height="26px"
              borderWidth="1px"
              borderRadius="4px"
              borderColor="rgb(226, 232, 240)"
              marginTop="2px"
            >
              <Box flex="1" fontSize="12px" fontWeight="500" textAlign="left">
                Polls
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel padding="0" pb={4}>
              <Polls trainingId={trainingId} polls={polls} />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      <Button
        position="relative"
        top="20px"
        size="sm"
        as="a"
        variant="outline"
        onClick={openRegPage}
      >
        Start
      </Button>
      <Button
        position="relative"
        top="20px"
        variant="ghost"
        ml="1"
        size="sm"
        onClick={handleDelete}
      >
        Delete
      </Button>

      <HStack float="right" mt="3" mb="3">
        <Button size="md" onClick={handleSubmit}>
          Save
        </Button>
        <Button size="md" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
      </HStack>

      <Modal isOpen={isModalOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentAttendee ? 'Attendee' : 'New Attendee'}</ModalHeader>
          <ModalBody>
            <AttendeeForm
              trainingId={trainingId}
              onClose={onAttendeeClose}
              attendee={currentAttendee}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
