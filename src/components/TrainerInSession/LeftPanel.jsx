import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/accordion'
import { Button } from '@chakra-ui/button'
import { Box, Heading, Text, VStack } from '@chakra-ui/layout'
import { Table, Tbody, Th, Thead, Tr, Td } from '@chakra-ui/table'
import React, { useMemo } from 'react'
import { scrollBarStyle } from '../../theme/components/scrollbar'
import { ClassRoster } from '../ClassRoster'
import { TrainerPoll } from '../TrainerPoll'
import { useBlueJeans } from '../../bluejeans/useBlueJeans'
import { MicCamIcon } from '../MicCamIcon'
import { getBjnParticipants, muteBjnParticipant } from '../../bluejeans/fetch-api'

export default function LeftPanel({
  training,
  attendees,
  polls,
  startedPoll,
  updateCurrentTraining,
  setPollToEdit,
  onPollModalOpen,
  updateAttendee,
  onManageBreakouts,
}) {
  const { bjnParticipants } = useBlueJeans()

  const Polls = useMemo(() => {
    const startPoll = (poll) => {
      updateCurrentTraining({
        variables: {
          input: {
            id: training.id,
            currentPollId: poll ? poll.id : '',
            pollMode: poll?.stoppedAt ? 'SHOWRESULTS' : 'POLL',
          },
        },
      })
    }

    const editPoll = (p) => {
      setPollToEdit(p)
      onPollModalOpen()
    }

    if (polls.length === 0) {
      return <Box>*None*</Box>
    }
    return polls.map((poll) => {
      return (
        <TrainerPoll
          key={poll.id}
          pollId={poll.id}
          startPoll={startPoll}
          startedPoll={startedPoll}
          editPoll={() => editPoll(poll)}
        />
      )
    })
  }, [polls, startedPoll, updateCurrentTraining, training?.id, onPollModalOpen, setPollToEdit])

  const onAddPollClick = (event, poll) => {
    event.stopPropagation()
    onPollModalOpen()
  }

  const BluejeansParticipants = useMemo(() => {
    const muteParticipant = async (audio, name, mute) => {
      try {
        const result = await getBjnParticipants(training.meetingId)
        const { endpointGuid } = result.find((p) => p.name === name)
        const muteResult = await muteBjnParticipant(
          training.meetingId,
          training.moderatorPasscode,
          audio,
          mute === 'mute',
          endpointGuid,
        )
        console.log(muteResult)
      } catch (err) {
        console.error(err)
      }
    }

    const result = bjnParticipants.reduce((acc, part) => {
      if (!part.isSelf && !attendees.find((att) => att.name === part.name)) {
        acc.push(
          <Tr>
            <Td>{part.name}</Td>
            <Td width="30px">
              <MicCamIcon
                isMic={true}
                isUnmuted={!part.isAudioMuted}
                onClick={(mute) => muteParticipant(true, part.name, mute)}
              />
            </Td>
            <Td width="187px">
              <MicCamIcon
                isMic={false}
                isUnmuted={!part.isVideoMuted}
                onClick={(mute) => muteParticipant(false, part.name, mute)}
              />
            </Td>
          </Tr>,
        )
      }
      return acc
    }, [])
    if (result.length === 0) {
      return (
        <Tr>
          <Td>*none*</Td>
        </Tr>
      )
    }
    return result
  }, [bjnParticipants, training, attendees])

  return (
    <VStack
      pos="relative"
      left="0"
      bgGradient="linear-gradient(180deg, #283683 0%, #396AA1 100%, #283683 100%);"
      align="left"
      px="3"
      width="500px"
      height={'100vh'}
      overflow="scroll"
    >
      <Box paddingBottom="4" paddingTop="8">
        <Heading fontSize="1.25em" fontWeight="bold" textTransform="capitalize">
          {training.title}
        </Heading>
        <Text opacity="0.5">{training.description}</Text>
      </Box>
      <Button onClick={onManageBreakouts}>Mananage breakouts</Button>
      <Box
        bg="rgba(255, 255, 255, 0.1)"
        align="start"
        borderRadius="sm"
        fontWeight="600"
        rounded={6}
      >
        <ClassRoster training={training} attendees={attendees} paddingBottom="2" />
      </Box>

      <Box
        bg="rgba(255, 255, 255, 0.1)"
        align="start"
        borderRadius="sm"
        fontWeight="600"
        rounded={6}
      >
        <Accordion allowMultiple width="100%" allowToggle defaultIndex={0}>
          <AccordionItem p={0} m={0} border="none">
            <AccordionButton p="2">
              <Text marginLeft="2" flex="1" textAlign="left" fontWeight="semibold" fontSize="0.9em">
                Other meeting participants
              </Text>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel overflowY="auto" padding="0" pb={4} sx={scrollBarStyle}>
              <Box>
                <Table size="sm" width="100%" margin="0">
                  <Tbody>{BluejeansParticipants}</Tbody>
                </Table>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>

      <Box
        bg="rgba(255, 255, 255, 0.1)"
        align="start"
        borderRadius="sm"
        fontWeight="600"
        rounded={6}
      >
        <Accordion allowMultiple width="100%" allowToggle>
          <AccordionItem p={0} m={0} border="none">
            <AccordionButton p="2">
              <Text marginLeft="2" flex="1" textAlign="left" fontWeight="semibold" fontSize="0.9em">
                Polls
              </Text>
              <Button
                size="xs"
                paddingX="4"
                marginRight="4"
                variant="primary-trueblue"
                onClick={(e) => onAddPollClick(e)}
              >
                + Add
              </Button>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel padding="0" pb={4} minHeight="200px">
              <Box>
                <Table size="sm" width="100%" margin="0">
                  <Thead
                    borderBottom="1px"
                    borderColor="#ffffff"
                    display={'table'}
                    width={'100%'}
                    style={{ tableLayout: 'fixed' }}
                  >
                    <Tr>
                      <Th color="white">Question</Th>
                    </Tr>
                  </Thead>
                  <Tbody display={'block'} sx={scrollBarStyle}>
                    {Polls}
                  </Tbody>
                </Table>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </VStack>
  )
}
