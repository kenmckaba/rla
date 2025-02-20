import React, { useState, useEffect, useMemo } from 'react'
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
  Text,
} from '@chakra-ui/react'
import { getTraining, listStudentGroups } from '../graphql/queries'
import { useMutation, gql, useQuery } from '@apollo/client'
import { deleteAttendee, updateTraining, createInvitedStudent } from '../graphql/mutations'
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
import { EmailSelection } from './EmailSelection'
import { SeriesTrainingList } from './SeriesTrainingList'

export const TrainingForm = ({ onClose, trainingId, onDelete }) => {
  const [training, setTraining] = useState()
  const [emailGroupList, setEmailGroupList] = useState()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [trainerName, setTrainerName] = useState('')
  const [trainerEmail, setTrainerEmail] = useState('')
  const [scheduledDate, setScheduledDate] = useState()
  const [scheduledTime, setScheduledTime] = useState()
  const [registrationUrl] = useState(`${window.location.origin}/registration/${trainingId}`)
  const [seriesRegistrationUrl] = useState(
    `${window.location.origin}/series-registration/${trainingId}`,
  )
  const [meetingId, setMeetingId] = useState('794560429')
  const [moderatorPasscode, setModeratorPasscode] = useState('1599')
  const [participantPasscode, setParticipantPasscode] = useState('2886')
  const [attendees, setAttendees] = useState([])
  const [polls, setPolls] = useState([])
  const [sharedDocs, setSharedDocs] = useState([])
  const [whiteboardUrl, setWhiteboard] = useState('')
  const [maxAttendees, setMaxAttendees] = useState('25')
  const [maxInPersonAttendees, setMaxInPersonAttendees] = useState('4')
  const [maxOnlineAttendees, setMaxOnlineAttendees] = useState('4')
  const [currentAttendee, setCurrentAttendee] = useState()
  const [selectedEmailGroup, setSelectedEmailGroup] = useState()
  const [selectedStudents, setSelectedStudents] = useState([])
  const [deleteCurrentAttendee] = useMutation(gql(deleteAttendee))
  const [updateCurrentTraining, { error: updateError }] = useMutation(gql(updateTraining))
  const [attendeeToDelete, setAttendeeToDelete] = useState()

  const {
    data: trainingData,
    error,
    loading,
    subscribeToMore,
  } = useQuery(gql(getTraining), {
    variables: { id: trainingId },
  })
  const { data: groupListData } = useQuery(gql(listStudentGroups))

  const {
    isOpen: isDeleteAttendeeModalOpen,
    onOpen: onDeleteAttendeeModalOpen,
    onClose: onDeleteAttendeeModalClose,
  } = useDisclosure()

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
  const [addAttendeeInvitation] = useMutation(gql(createInvitedStudent))
  const [isSeries, setIsSeries] = useState(false)
  const { onCopy } = useClipboard(isSeries ? seriesRegistrationUrl : registrationUrl)
  const Times = useMemo(() => {
    const ampm = ['AM', 'PM']
    const result = []
    let key = 0
    let ampmIndex = 0
    let hour = 1
    while (ampmIndex < ampm.length) {
      while (true) {
        if (hour === 12) {
          ampmIndex += 1
          if (ampmIndex === ampm.length) {
            break
          }
        }
        if (hour === 13) {
          hour = 1
        }
        for (let minutes = 0; minutes < 60; minutes += 15) {
          result.push(
            <option key={key}>{`${hour}:${minutes.toString().padStart(2, '0')} ${
              ampm[ampmIndex]
            }`}</option>,
          )
          key++
        }
        hour += 1
      }
    }
    return result
  }, [])

  useEffect(() => {
    if (trainingData) {
      const tr = trainingData.getTraining
      setTraining(tr)
      setTitle(tr.title)
      setIsSeries(tr.type === 'SERIES' || tr.type === 'TEMPSERIES')
      setDescription((prev) => tr.description || prev)
      setTrainerName(tr.trainerName || '')
      setTrainerEmail(tr.trainerEmail)
      setScheduledDate(new Date(tr.scheduledTime))
      setScheduledTime(() => {
        const date = new Date(tr.scheduledTime).toLocaleTimeString()
        const strs = date.split(':')
        const hrs = strs[0]
        const mins = strs[1]
        return `${hrs}:${mins} ${date.substr(-2, 2)}`
      })
      setMaxAttendees(tr.maxAttendees || 25)
      // setMinInPersonAttendees(tr.minInPersonAttendees || 2)
      setMaxInPersonAttendees(tr.maxInPersonAttendees || 4)
      setMaxOnlineAttendees(tr.maxOnlineAttendees || 4)
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
    setScheduledDate(value)
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

  // const onChangeMinInPersonAttendees = (event) => {
  //   setMinInPersonAttendees(event.target.value)
  // }

  const onChangeMaxInPersonAttendees = (event) => {
    setMaxInPersonAttendees(event.target.value)
  }

  const onChangeMaxOnlineAttendees = (event) => {
    setMaxOnlineAttendees(event.target.value)
  }

  const mutationVars = () => {
    const time = fixDate()
    return {
      variables: {
        input: {
          id: trainingId,
          seriesId: training.seriesId,
          type: isSeries ? 'SERIES' : 'TRAINING',
          description,
          trainerName,
          trainerEmail,
          title,
          meetingId,
          scheduledTime: time.toISOString(),
          maxAttendees,
          // minInPersonAttendees,
          maxInPersonAttendees,
          maxOnlineAttendees,
          moderatorPasscode,
          participantPasscode,
          whiteboardUrl,
          registrationUrl: isSeries ? seriesRegistrationUrl : registrationUrl,
        },
      },
    }
  }

  const fixDate = () => {
    const first = scheduledTime.split(':')
    const minutesAmpm = first[1].split(' ')
    let hour = Number(first[0])
    const min = Number(minutesAmpm[0])
    const ampm = minutesAmpm[1]
    if (ampm === 'PM' && hour < 12) {
      hour += 12
    }
    const theDate = new Date(
      scheduledDate.getFullYear(),
      scheduledDate.getMonth(),
      scheduledDate.getDate(),
      hour,
      min,
      0,
    )
    return theDate
  }

  const addInvitedAttendees = async () => {
    const attList = []
    for await (const student of selectedStudents) {
      const result = await addAttendeeInvitation({
        variables: {
          input: {
            trainingId: trainingId,
            timeSent: new Date().toISOString(),
            name: `${student.firstName} ${student.lastName}`,
            email: student.email,
          },
        },
      })

      attList.push({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        invitationId: result.data.createInvitedStudent.id,
      })
    }
    return attList
  }

  const sendRegEmails = async () => {
    onEmailsModalClose()
    onWaitModalOpen()
    const attList = await addInvitedAttendees()
    await sendRegistrationEmails(training, attList)
    onWaitModalClose()
    onClose()
  }

  const handleSubmit = async () => {
    await updateCurrentTraining(mutationVars())
    // if (isSeries) {
    //   getSeriesTrainings()
    // } else {
    if (training.seriesId) {
      onClose()
    } else {
      onEmailsModalOpen()
    }
    // }
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

  const onDeleteAnAttendee = (attendeeId) => {
    setAttendeeToDelete(attendeeId)
    onDeleteAttendeeModalOpen()
  }

  const onDeleteTheAttendee = async () => {
    await deleteCurrentAttendee({
      variables: {
        input: {
          id: attendeeToDelete,
        },
      },
    })
    onDeleteAttendeeModalClose()
  }

  const onAttendeeClose = (attendee) => {
    if (attendee) {
      const attendeePos = attendees.findIndex((att) => {
        return att.id === attendee.id
      })
      if (attendeePos === -1) {
        setAttendees((prev) => [...prev, attendee])
      } else {
        const newAttendees = attendees.slice(attendeePos, attendeePos)
        setAttendees([...newAttendees, attendee])
      }
    }
    onNewattendeeModalClose()
    updateCurrentTraining(mutationVars()) // save in case they try to join
  }

  const handleDelete = async () => {
    onDelete(trainingId)
    if (!isSeries) {
      onClose()
    }
  }

  const startTraining = (e) => {
    updateCurrentTraining(mutationVars()) // save in case they try to join
    window.open(`/trainerInSession/${trainingId}`)
  }

  const setEmailGroup = (e) => {
    const id = e.target.value
    const group = emailGroupList.find((g) => g.id === id)
    setSelectedEmailGroup(group)
  }

  const onChangeTime = (e) => {
    setScheduledTime(e.target.value)
  }

  const missingFields = () => {
    return isSeries
      ? !title ||
          !trainerName ||
          !meetingId ||
          !participantPasscode ||
          !moderatorPasscode ||
          !trainerEmail
      : !title ||
          !trainerName ||
          !meetingId ||
          !participantPasscode ||
          !moderatorPasscode ||
          !trainerEmail ||
          !scheduledDate ||
          !scheduledTime
  }

  return (
    <>
      <Box>
        {!isSeries ? (
          <FormControl isRequired>
            <FormLabel mt="0">Title</FormLabel>
            <Input fontSize="12" value={title} onChange={onChangeTitle} h="24px" />
          </FormControl>
        ) : (
          <FormControl isRequired>
            <Text fontSize="xs">
              Note: The following information will be copied over to all trainings in the series
            </Text>
            <FormLabel mt="0">Title</FormLabel>
            <Input fontSize="12" value={title} h="24px" onChange={onChangeTitle} />
          </FormControl>
        )}
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
        {!isSeries && (
          <HStack>
            <FormControl isRequired>
              <FormLabel>Date</FormLabel>
              <DatePicker
                fontSize="12"
                selected={scheduledDate}
                onChange={onChangeScheduledFor}
                dateFormat="MMM d, yyyy"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Time</FormLabel>
              <Select fontSize="12px" height="25px" onChange={onChangeTime} value={scheduledTime}>
                {Times}
              </Select>
            </FormControl>
          </HStack>
        )}
        <FormControl>
          <FormLabel>Max Attendees:</FormLabel>
          <HStack>
            <FormControl>
              <FormLabel>Total</FormLabel>
              <Input
                fontSize="12"
                value={maxAttendees}
                onChange={onChangeMaxAttendees}
                h="24px"
                placeholder="optional"
              />
            </FormControl>
            <FormControl>
              <FormLabel>In-person</FormLabel>
              <Input
                fontSize="12"
                value={maxInPersonAttendees}
                onChange={onChangeMaxInPersonAttendees}
                h="24px"
                placeholder="optional"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Online</FormLabel>
              <Input
                fontSize="12"
                value={maxOnlineAttendees}
                onChange={onChangeMaxOnlineAttendees}
                h="24px"
                placeholder="optional"
              />
            </FormControl>
          </HStack>
        </FormControl>

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
            {!isSeries && (
              <AttendeeList
                attendees={attendees}
                updateAttendee={handleOpenAttendee}
                deleteAttendee={onDeleteAnAttendee}
              />
            )}
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
                {isSeries ? (
                  <Link href={seriesRegistrationUrl} isExternal cursor="pointer" color="blue">
                    {seriesRegistrationUrl}
                    <ExternalLinkIcon m="2px" />
                  </Link>
                ) : (
                  <Link href={registrationUrl} isExternal cursor="pointer" color="blue">
                    {registrationUrl}
                    <ExternalLinkIcon m="2px" />
                  </Link>
                )}
              </Box>
            </FormControl>
          </AccordionItemCustom>
          <AccordionItemCustom title="Polls">
            <Polls
              trainingId={trainingId}
              saveTraining={() => updateCurrentTraining(mutationVars())}
              polls={polls}
            />
          </AccordionItemCustom>
          <AccordionItemCustom title="Shared documents">
            <SharedDocs
              trainingId={trainingId}
              sharedDocs={sharedDocs}
              trainerMode={true}
              saveTraining={() => updateCurrentTraining(mutationVars())}
            />
          </AccordionItemCustom>
          <AccordionItemCustom title="BlueJeans meeting">
            <HStack mt="3">
              <FormControl isRequired>
                <FormLabel margin="0">BlueJeans meeting ID</FormLabel>
                <Input fontSize="12" value={meetingId} onChange={onChangeMeetingId} h="24px" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel margin="0">Moderator passcode</FormLabel>
                <Input
                  fontSize="12"
                  value={moderatorPasscode}
                  onChange={onChangeModeratorPasscode}
                  h="24px"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel margin="0">Participant passcode</FormLabel>
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
        {isSeries && (
          <FormControl>
            <FormLabel></FormLabel>
            <SeriesTrainingList
              series={{
                id: training.id,
                title,
                description,
                trainerName,
                trainerEmail,
                meetingId,
                moderatorPasscode,
                participantPasscode,
                whiteboardUrl,
                polls,
                sharedDocs,
                maxOnlineAttendees,
                maxInPersonAttendees,
              }}
              deleteTraining={handleDelete}
              saveSeries={() => updateCurrentTraining(mutationVars())}
            />
          </FormControl>
        )}
      </Box>

      {!isSeries && (
        <>
          <Button
            position="relative"
            top="20px"
            size="sm"
            as="a"
            variant="outline"
            onClick={startTraining}
            isDisabled={missingFields}
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
        </>
      )}

      <HStack float="right" mt="3" mb="3">
        <Button size="md" onClick={handleSubmit} isDisabled={missingFields()}>
          Save
        </Button>
        <Button size="md" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
      </HStack>

      <OurModal
        header="Delete attendee?"
        isOpen={isDeleteAttendeeModalOpen}
        footer={
          <Center marginTop="15px">
            <Button onClick={onDeleteTheAttendee}>Delete</Button>
            <Button variant="outline" marginLeft="10px" onClick={onDeleteAttendeeModalClose}>
              Cancel
            </Button>
          </Center>
        }
      ></OurModal>
      <OurModal
        header={currentAttendee ? 'Attendee' : 'New Attendee'}
        isOpen={isNewattendeeModalOpen}
      >
        <AttendeeForm training={training} onClose={onAttendeeClose} attendee={currentAttendee} />
      </OurModal>
      <OurModal
        header={<Center>Send registration invitation emails?</Center>}
        isOpen={isEmailsModalOpen}
        onClose={onEmailsModalClose}
        footer={
          <Center marginTop="15px">
            <Button isDisabled={!selectedStudents.length} onClick={sendRegEmails}>
              Send emails
            </Button>
            <Button marginLeft="10px" onClick={handleSave}>
              Skip
            </Button>
          </Center>
        }
      >
        {emailGroupList?.length ? (
          <Select placeholder="Select email group" onChange={setEmailGroup}>
            {emailGroupList.map((group) => {
              return (
                <option key={group.id} value={group.id}>
                  {`${group.name} (${group.numStudents || '0'} students)`}
                </option>
              )
            })}
          </Select>
        ) : (
          <Box>*No email groups saved*</Box>
        )}
        {selectedEmailGroup && (
          <EmailSelection
            groupId={selectedEmailGroup.id}
            onSelectedStudents={setSelectedStudents}
          />
        )}
      </OurModal>
      <OurModal header="Sending emails" isOpen={isWaitModalOpen}>
        <Center>
          <Spinner />
        </Center>
      </OurModal>
    </>
  )
}
