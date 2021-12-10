import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/accordion'
import { Button } from '@chakra-ui/button'
import { Box, Heading, Text, VStack } from '@chakra-ui/layout'
import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/table'
import React, { useMemo } from 'react'
import { scrollBarStyle } from '../../theme/components/scrollbar'
import { ClassRoster } from '../ClassRoster'
import { TrainerPoll } from '../TrainerPoll'

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

  const lowerHand = (attendeeId) => {
    updateAttendee({
      variables: {
        input: {
          id: attendeeId,
          handRaised: false,
        },
      },
    })
  }

  return (
    <>
      <VStack
        pos="relative"
        left="0"
        bgGradient="linear(to-b, #284A83 0%, #396AA1 100%, #396AA1 100%)"
        opacity="85%"
        align="left"
        width="250px"
        px="2"
        py="2"
        minWidth="250px"
      >
        <Box paddingBottom="4">
          <Heading fontSize="1.25em" fontWeight="bold" textTransform="capitalize" mb="2">
            {training.title}
          </Heading>
          <Text opacity="0.5">{training.description}</Text>
        </Box>
        <Button onClick={onManageBreakouts}>Mananage breakouts</Button>
        <Box bg="rgba(255, 255, 255, 0.1)" align="start" borderRadius="sm" fontWeight="600">
          <ClassRoster
            attendees={attendees}
            paddingBottom="2"
            lowerHand={(attendee) => lowerHand(attendee)}
          />
        </Box>

        <Box bg="rgba(255, 255, 255, 0.1)" align="start" borderRadius="sm" fontWeight="600">
          <Accordion allowMultiple width="100%" allowToggle>
            <AccordionItem p={0} m={0} border="none">
              <AccordionButton p="2">
                <Text
                  marginLeft="2"
                  flex="1"
                  textAlign="left"
                  fontWeight="semibold"
                  fontSize="0.9em"
                >
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
              <AccordionPanel overflowY="auto" padding="0" pb={4} sx={scrollBarStyle}>
                <Box>
                  <Table size="sm" width="100%" margin="0">
                    <Thead borderBottom="1px" borderColor="#ffffff">
                      <Tr>
                        <Th color="white">Question</Th>
                      </Tr>
                    </Thead>
                    <Tbody>{Polls}</Tbody>
                  </Table>
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </VStack>
    </>
  )
}
