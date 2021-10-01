import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/accordion'
import { Button } from '@chakra-ui/button'
import { Box, Heading, Text, VStack } from '@chakra-ui/layout'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import React, { useMemo } from 'react'
import { prettyTime } from '../../../pretty-time'
import { ClassRoster } from '../ClassRoster'
import { TrainerPoll } from '../TrainerPoll'

export default function LeftPanel({
  training,
  attendees,
  polls,
  addAPoll,
  startedPoll,
  updateCurrentTraining,
  setPollToEdit,
  onPollModalOpen
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

  return (
    <VStack
      spacing="20px"
      pos="relative"
      left="0"
      bgGradient="linear(to-b, #284A83 0%, #396AA1 100%, #396AA1 100%)"
      opacity="85%"
      align="left"
      width="250px"
      h="100vh"
      px="4"
      py="8"
      minWidth="400px"
    >
      <Box paddingBottom="4">
        <Heading
          fontSize="1.25em"
          fontWeight="bold"
          textTransform="capitalize"
          mb="2">
          {training.title}
        </Heading>

        <Text
          fontSize=".62em"
          fontWeight="bold"
          textTransform="capitalize"
          mb="1">
          {prettyTime(new Date(+training.scheduledTime))}
        </Text>

        <Box
          bg="white"
          height="0px"
          width="300px"
          border="1px solid #ffffff"
          opacity="0.25"
        />

        <Text
          fontSize=".62em"
          opacity="0.5">
          {training.description ? training.description : 'Description here' }
        </Text>
      </Box>
      <Box bg="rgba(255, 255, 255, 0.1)" align="start" borderRadius="sm" fontWeight="600">
        <ClassRoster attendees={attendees} paddingBottom="2" />
      </Box>

      <Box bg="rgba(255, 255, 255, 0.1)" align="start" borderRadius="sm" fontWeight="600">
        <Accordion allowMultiple width="100%" allowToggle>
          <AccordionItem p={0} m={0} border="none">
            <AccordionButton p="2" >
              <Box
                marginLeft="2"
                flex="1"
                textAlign="left"
                fontWeight="semibold"
                fontSize="0.9em"
              >
             Polls
              </Box>
              <AccordionIcon />
            </AccordionButton>
            {/* TODO: Style the scrollbar */}
            {/* TODO: If possible in the future it wold be great to reuse this accordion panel with the one on the list of Attendees (ClassRoster.jsx) */}
            <AccordionPanel overflowY="auto" maxHeight="20vh" padding="0" pb={4}>
              <Box>
                <Table size="sm" width="100%" margin="0">
                  <Thead borderBottom="1px" borderColor="#ffffff">
                    <Tr>
                      <Th color="white">Question</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Polls}
                    <Tr>
                      <Td border="none" colSpan="3">
                        <Button size="xs" variant="unstyled" onClick={addAPoll}>
                          <Text textTransform="capitalize" fontWeight="thin">
                         + Add poll
                          </Text>
                        </Button>
                      </Td>
                    </Tr>
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
