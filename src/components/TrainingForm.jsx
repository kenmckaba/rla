import React, { useState, useEffect } from 'react'
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  useDisclosure,
  Link,
  Accordion,
  IconButton,
  Tooltip,
  useClipboard,
  Spacer,
  Text,
  Heading,
} from '@chakra-ui/react'
import { getTraining } from '../graphql/queries'
import { useMutation, gql, useQuery } from '@apollo/client'
import { deleteTraining, updateTraining } from '../graphql/mutations'
import { AttendeeList } from './AttendeeList'
import { AttendeeForm } from './AttendeeForm'
import DatePicker from './DatePicker'
import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons'
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
import { AccordionItemCustom } from './AccordionItemCustom'
import { useRef } from 'react'

export const TrainingForm = ({ onClose, trainingId }) => {
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
  const regLink = useRef(`${window.location.href}registration/${trainingId}`)
  const { onCopy } = useClipboard(regLink.current)

  useEffect(() => {
    if (data) {
      const training = data.getTraining
      setTitle(training.title === '<temp>' ? '' : training.title)
      setDescription((prev) => training.description || prev)
      setTrainerName(training.trainerName || '')
      setScheduledTime(new Date(Number(training.scheduledTime)))
      setMeetingId((prev) => training.meetingId || prev)
      setModeratorPasscode((prev) => training.moderatorPasscode || prev)
      setParticipantPasscode((prev) => training.participantPasscode || prev)
      setAttendees(training.attendees.items)
      setPolls(training.polls.items)
    }
  }, [data])

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
      /*       return () => {
        cleanupFuncs.forEach((func) => func())
      } */
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
    await updateCurrentTraining(mutationVars())
    onClose()
  }

  const handleCancel = () => {
    // if it was never saved this should delete this record and any attendee, poll, etc.
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
    onClose()
  }

  const openRegPage = (e) => {
    updateCurrentTraining(mutationVars()) // save in case they try to join
    window.open(`/trainerInSession/${trainingId}`)
  }

  const missingFields = () => {
    return !title || !trainerName || !meetingId || !participantPasscode || !moderatorPasscode
  }

  return (
    <>
      <Box>
        <FormControl isRequired>
          <FormLabel fontWeight="bold" textTransform="uppercase" mt="0">
            Title
          </FormLabel>
          <Input variant="filled" value={title} onChange={onChangeTitle} placeholder="Type here" />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="bold" textTransform="uppercase">
            Description
          </FormLabel>
          <Input
            variant="filled"
            value={description}
            onChange={onChangeDescription}
            placeholder="Optional"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel fontWeight="bold" textTransform="uppercase">
            Trainer
          </FormLabel>
          <Input
            variant="filled"
            value={trainerName}
            onChange={onChangeTrainerName}
            placeholder="First & Last Name"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel fontWeight="bold" textTransform="uppercase">
            Date & Time
          </FormLabel>
          <DatePicker
            selected={scheduledTime}
            onChange={(date) => onChangeScheduledFor(date)}
            showTimeSelect
            dateFormat="Pp"
          />
        </FormControl>
        <Accordion width="100%" mt={2} allowToggle>
          <AccordionItemCustom title="BlueJeans meeting">
            <HStack mt="3">
              <FormControl isRequired>
                <FormLabel fontWeight="bold" textTransform="uppercase">
                  BlueJeans meeting ID
                </FormLabel>
                <Input fontSize="12" value={meetingId} onChange={onChangeMeetingId} h="24px" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontWeight="bold" textTransform="uppercase">
                  Moderator passcode
                </FormLabel>
                <Input
                  fontSize="12"
                  value={moderatorPasscode}
                  onChange={onChangeModeratorPasscode}
                  h="24px"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontWeight="bold" textTransform="uppercase">
                  Participant passcode
                </FormLabel>
                <Input
                  fontSize="12"
                  value={participantPasscode}
                  onChange={onChangeParticipantPasscode}
                  h="24px"
                />
              </FormControl>
            </HStack>
          </AccordionItemCustom>
          <AccordionItemCustom title="Attendees">
            <FormControl padding="0" mt="10px" mb="2px">
              <FormLabel fontWeight="bold" textTransform="uppercase">
                Attendee registration page
                <Tooltip hasArrow placement="right" label="Copy to clipboard">
                  <IconButton
                    size="xs"
                    marginLeft="8px"
                    variant="ghost"
                    icon={<CopyIcon />}
                    color="black"
                    onClick={onCopy}
                  ></IconButton>
                </Tooltip>
              </FormLabel>
              <Box
                borderRadius="6px"
                pl="16px"
                fontSize="12"
                border="1px solid #e2e8f0"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                <Link href={regLink.current} isExternal>
                  {window.location.href}registration/{trainingId}
                  <ExternalLinkIcon m="2px" />
                </Link>
              </Box>
            </FormControl>
            <AttendeeList attendees={attendees} updateAttendee={handleOpenAttendee} />
          </AccordionItemCustom>
          <AccordionItemCustom title="Polls">
            <Polls trainingId={trainingId} polls={polls} />
          </AccordionItemCustom>
        </Accordion>
      </Box>
      {/*       <Button
        position="relative"
        top="20px"
        size="sm"
        as="a"
        variant="outline"
        onClick={openRegPage}
        isDisabled={missingFields()}
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
 */}
      <HStack spacing="3" marginBlock="3">
        <Button w="100%" size="md" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button w="100%" size="md" onClick={handleSubmit} isDisabled={missingFields()}>
          Save
        </Button>
      </HStack>

      <Modal variant="primary-transparent" isOpen={isModalOpen} scrollBehavior="inside">
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
