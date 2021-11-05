import React, { useState, useEffect, useRef } from 'react'
import {
  Input,
  Select,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Box,
  Center,
  useDisclosure,
  Link,
  Accordion,
  IconButton,
  Tooltip,
  useClipboard,
  Spinner,
} from '@chakra-ui/react'
import { getTraining, listStudentGroups, listStudents } from '../graphql/queries'
import { useMutation, gql, useQuery, useLazyQuery } from '@apollo/client'
import { updateTraining } from '../graphql/mutations'
import { AttendeeList } from './AttendeeList'
import { AttendeeForm } from './AttendeeForm'
import DatePicker from './DatePicker'
import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { buildSubscription } from 'aws-appsync'
import {
  onCreateAttendee,
  onCreatePoll,
  onCreateStudentGroup,
  onDeleteAttendee,
  onDeletePoll,
  onUpdateAttendee,
  onUpdatePoll,
} from '../graphql/subscriptions'
import { Polls } from './Polls'
import { SharedDocs } from './SharedDocs'
import { AccordionItemCustom } from './AccordionItemCustom'
import OurModal from './OurModal'
import { sendRegistrationEmails } from '../utils/sendRegistrationEmails'

export const TrainingForm = ({ onClose, trainingId, onDelete }) => {
  const [training, setTraining] = useState()
  const [emailGroupList, setEmailGroupList] = useState()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [trainerName, setTrainerName] = useState('')
  const [trainerEmail, setTrainerEmail] = useState('')
  const [scheduledTime, setScheduledTime] = useState(new Date())
  const [registrationUrl] = useState(`${window.location.origin}/registration/${trainingId}`)
  const [meetingId, setMeetingId] = useState('950585018')
  const [moderatorPasscode, setModeratorPasscode] = useState('1599')
  const [participantPasscode, setParticipantPasscode] = useState('6804')
  const [attendees, setAttendees] = useState([])
  const [polls, setPolls] = useState([])
  const [sharedDocs, setSharedDocs] = useState([])
  const [whiteboardUrl, setWhiteboard] = useState('')
  const [maxAttendees, setMaxAttendees] = useState(25)
  const [currentAttendee, setCurrentAttendee] = useState()
  const [selectedEmailGroup, setSelectedEmailGroup] = useState()
  const sendingEmails = useRef(false)
  const [updateCurrentTraining, { error: updateError }] = useMutation(gql(updateTraining))
  const {
    data: trainingData,
    error,
    loading,
    subscribeToMore,
  } = useQuery(gql(getTraining), {
    variables: { id: trainingId },
  })
  const { data: groupListData } = useQuery(gql(listStudentGroups))

  const [getEmailAttendees, { data: emailAttendeesData }] = useLazyQuery(gql(listStudents))

  const {
    isOpen: isNewattendeeModalOpen,
    onOpen: onNewattendeeModalOpen,
    onClose: onNewattendeeModalClose,
  } = useDisclosure()
  const {
    isOpen: isEmailsModalOpen,
    onOpen: onEmailsModalOpen,
    onClose: onEmailsModalClose,
  } = useDisclosure()
  const {
    isOpen: isWaitModalOpen,
    onOpen: onWaitModalOpen,
    onClose: onWaitModalClose,
  } = useDisclosure()
  const { onCopy } = useClipboard(registrationUrl)

  useEffect(() => {
    if (trainingData) {
      const tr = trainingData.getTraining
      setTraining(tr)
      setTitle(tr.title === '<temp>' ? '' : tr.title)
      setDescription((prev) => tr.description || prev)
      setTrainerName(tr.trainerName || '')
      setTrainerEmail(tr.trainerEmail)
      setScheduledTime(new Date(tr.scheduledTime))
      setMaxAttendees(tr.maxAttendees || 25)
      setMeetingId((prev) => tr.meetingId || prev)
      setModeratorPasscode((prev) => tr.moderatorPasscode || prev)
      setParticipantPasscode((prev) => tr.participantPasscode || prev)
      setAttendees(tr.attendees.items)
      setPolls(tr.polls.items)
      setSharedDocs(tr.sharedDocs.items)
      setWhiteboard((prev) => tr.whiteboardUrl || prev)
    }
  }, [trainingData])

  useEffect(() => {
    const getEmailList = async () => {
      if (emailAttendeesData && !sendingEmails.current) {
        sendingEmails.current = true // this can be called multiple times
        // todo: should filter in graphql
        const students = emailAttendeesData.listStudents.items.filter(
          (s) => s.groupId === selectedEmailGroup,
        )
        await sendRegistrationEmails(training, students)
        onWaitModalClose()
        onClose()
      }
    }
    getEmailList()
  }, [emailAttendeesData, selectedEmailGroup, training, onClose, onWaitModalClose])

  useEffect(() => {
    if (groupListData) {
      setEmailGroupList(groupListData.listStudentGroups.items)
    }
  }, [groupListData])

  useEffect(() => {
    if (subscribeToMore) {
      const cleanupFuncs = [
        subscribeToMore(buildSubscription(gql(onCreateAttendee), gql(getTraining))),
        subscribeToMore(buildSubscription(gql(onDeleteAttendee), gql(getTraining))),
        subscribeToMore(buildSubscription(gql(onUpdateAttendee), gql(getTraining))),
        subscribeToMore(buildSubscription(gql(onUpdatePoll), gql(getTraining))),
        subscribeToMore(buildSubscription(gql(onCreatePoll), gql(getTraining))),
        subscribeToMore(buildSubscription(gql(onDeletePoll), gql(getTraining))),
        subscribeToMore(buildSubscription(gql(onCreateStudentGroup), gql(listStudentGroups))),
      ]
      return () => {
        cleanupFuncs.forEach((func) => func && func())
      }
    }
  }, [subscribeToMore])

  if (error || updateError) {
    console.error('rla-log: error', error, updateError)
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

  const onChangeTrainerEmail = (event) => {
    setTrainerEmail(event.target.value)
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

  const onChangeWhiteboard = (event) => {
    setWhiteboard(event.target.value)
  }

  const onChangeMaxAttendees = (event) => {
    setMaxAttendees(event.target.value)
  }

  const mutationVars = () => {
    return {
      variables: {
        input: {
          id: trainingId,
          description,
          trainerName,
          trainerEmail,
          title,
          meetingId,
          scheduledTime: scheduledTime.toISOString(),
          maxAttendees,
          moderatorPasscode,
          participantPasscode,
          whiteboardUrl,
          registrationUrl,
        },
      },
    }
  }

  const sendRegEmails = async () => {
    onWaitModalOpen()
    getEmailAttendees()
    onEmailsModalClose()
    updateCurrentTraining(mutationVars())
  }

  const handleSubmit = async () => {
    onEmailsModalOpen()
  }

  const handleSave = async () => {
    await updateCurrentTraining(mutationVars())
    onClose()
  }

  const handleCancel = () => {
    // if it was never saved this should delete this record and any attendee, poll, etc.
    onClose()
  }

  const handleOpenAttendee = async (attendee) => {
    setCurrentAttendee(attendee)
    onNewattendeeModalOpen()
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
    onNewattendeeModalClose()
    updateCurrentTraining(mutationVars()) // save in case they try to join
  }

  const handleDelete = async () => {
    onDelete(trainingId)
  }

  const openRegPage = (e) => {
    updateCurrentTraining(mutationVars()) // save in case they try to join
    window.open(`/trainerInSession/${trainingId}`)
  }

  const setEmailGroup = (e) => {
    setSelectedEmailGroup(e.target.value)
  }

  const missingFields = () => {
    return (
      !title ||
      !trainerName ||
      !meetingId ||
      !participantPasscode ||
      !moderatorPasscode ||
      !trainerEmail
    )
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
        <HStack>
          <FormControl isRequired>
            <FormLabel>Trainer name</FormLabel>
            <Input fontSize="12" value={trainerName} onChange={onChangeTrainerName} h="24px" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Trainer email</FormLabel>
            <Input fontSize="12" value={trainerEmail} onChange={onChangeTrainerEmail} h="24px" />
          </FormControl>
        </HStack>
        <HStack>
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
          <FormControl>
            <FormLabel>Max attendees</FormLabel>
            <Input
              fontSize="12"
              value={maxAttendees}
              onChange={onChangeMaxAttendees}
              h="24px"
              placeholder="optional"
            />
          </FormControl>
        </HStack>
        <FormControl>
          <FormLabel>Whiteboard URL</FormLabel>
          <Input
            fontSize="12"
            value={whiteboardUrl}
            onChange={onChangeWhiteboard}
            h="24px"
            placeholder="optional"
          />
        </FormControl>
        <Accordion width="100%" mt={2} allowToggle>
          <AccordionItemCustom
            title={
              <Box flex="1" fontSize="12px" fontWeight="500" textAlign="left">
                Attendees
              </Box>
            }
          >
            <FormControl padding="0" mt="10px" mb="2px">
              <FormLabel>
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
                <Link href={registrationUrl} isExternal cursor="pointer" color="blue">
                  {registrationUrl}
                  <ExternalLinkIcon m="2px" />
                </Link>
              </Box>
            </FormControl>
            <AttendeeList attendees={attendees} updateAttendee={handleOpenAttendee} />
          </AccordionItemCustom>
          <AccordionItemCustom title="Polls">
            <Polls trainingId={trainingId} polls={polls} />
          </AccordionItemCustom>
          <AccordionItemCustom title="Shared documents">
            <SharedDocs trainingId={trainingId} sharedDocs={sharedDocs} trainerMode={true} />
          </AccordionItemCustom>
          <AccordionItemCustom title="BlueJeans meeting">
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
          </AccordionItemCustom>
        </Accordion>
      </Box>
      <Button
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

      <HStack float="right" mt="3" mb="3">
        <Button size="md" onClick={handleSubmit} isDisabled={missingFields()}>
          Save
        </Button>
        <Button size="md" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
      </HStack>

      <OurModal
        header={currentAttendee ? 'Attendee' : 'New Attendee'}
        isOpen={isNewattendeeModalOpen}
      >
        <AttendeeForm
          trainingId={trainingId}
          onClose={onAttendeeClose}
          attendee={currentAttendee}
        />
      </OurModal>
      <OurModal
        header={<Center>Send registration invitation emails?</Center>}
        isOpen={isEmailsModalOpen}
        onClose={onEmailsModalClose}
      >
        {emailGroupList?.length ? (
          <Select placeholder="Select email group" onChange={setEmailGroup}>
            {emailGroupList.map((group) => {
              return (
                <option key={group.id} value={group.id}>
                  {group.name}
                  {' ('}
                  {group.students.items.length}
                  {' students)'}
                </option>
              )
            })}
          </Select>
        ) : (
          <Box>*No email groups defined*</Box>
        )}
        <Center marginTop="15px">
          <Button isDisabled={!selectedEmailGroup} onClick={sendRegEmails}>
            Send emails
          </Button>
          <Button marginLeft="10px" onClick={handleSave}>
            Skip
          </Button>
        </Center>
      </OurModal>
      <OurModal header="Sending emails" isOpen={isWaitModalOpen}>
        <Center>
          <Spinner />
        </Center>
      </OurModal>
    </>
  )
}
