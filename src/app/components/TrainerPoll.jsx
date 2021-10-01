import { gql, useMutation, useQuery } from '@apollo/client'
import { EditIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Spacer,
  Tr,
  Td,
  Text
} from '@chakra-ui/react'
import { buildSubscription } from 'aws-appsync'
import { useEffect, useState } from 'react'
import { updatePoll } from '../../graphql/mutations'
import { getPoll } from '../../graphql/queries'
import { onCreatePollResponse, onUpdatePoll } from '../../graphql/subscriptions'

export const TrainerPoll = ({ pollId, startedPoll, startPoll, sharePoll, editPoll }) => {
  const [poll, setPoll] = useState()
  const [responseCounts, setResponseCounts] = useState({})

  const {
    data: pollData,
    error,
    loading,
    subscribeToMore,
  } = useQuery(gql(getPoll), {
    variables: { id: pollId },
  })
  const [updateCurrentPoll] = useMutation(gql(updatePoll))

  useEffect(() => {
    if (subscribeToMore) {
      const cleanupFuncs = [
        subscribeToMore(buildSubscription(gql(onUpdatePoll), gql(getPoll))),
        subscribeToMore(buildSubscription(gql(onCreatePollResponse), gql(getPoll))),
      ]
      /*       return () => {
        cleanupFuncs.forEach((func) => func())
      } */
    }
  }, [subscribeToMore])

  const editThisPoll = (e) => {
    e.preventDefault()
    editPoll()
  }

  useEffect(() => {
    if (pollData) {
      const p = pollData.getPoll
      setPoll(p)
      const counts = p.responses.items.reduce((acc, resp) => {
        if (acc[resp.response] === undefined) {
          acc[resp.response] = 0
        }
        acc[resp.response] += 1
        return acc
      }, {})
      setResponseCounts(counts)
    }
  }, [pollData])

  if (loading || !poll) {
    return <p>Please wait...</p>
  }

  if (error) {
    console.log('rla-log: Error', error)
    return <p>Error!</p>
  }

  const startAPoll = (e, p) => {
    e.preventDefault()

    startPoll(p)
    if (p?.stoppedAt) {
      return // was closed, so share it
    }
    if (p) {
      updateCurrentPoll({
        variables: {
          input: {
            id: pollId,
            startedAt: Date.now(),
          },
        },
      })
    } else {
      updateCurrentPoll({
        variables: {
          input: {
            id: pollId,
            stoppedAt: Date.now(),
          },
        },
      })
    }
  }

  const answerCount = (answer) => {
    if (!poll.startedAt) {
      return ''
    }
    if (!responseCounts[answer]) {
      return '(0)'
    }
    return `(${responseCounts[answer]})`
  }

  return (
    <Tr>
      <Td>
        <Accordion padding="0" width="100%" allowToggle key={poll.id}>
          <AccordionItem p={0} m={0} border="none">
            <AccordionButton padding="0" as="div">
              <Flex width="100%" >
                <Flex
                  fontWeight="500"
                  fontSize="14px"
                  cursor="pointer"
                  backgroundColor={startedPoll?.id === poll.id ? 'gold' : ''}
                >

                  <Text
                    mt="1"
                    width="80px"
                    maxW="80px"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    mr="2">
                    {poll.question}
                  </Text>

                  {!poll.startedAt && (
                    <EditIcon w={4} h={4} mt="1" onClick={editThisPoll} />
                  )}
                </Flex>
                <Spacer />
                <Button
                  size="xs"
                  fontWeight="bold"
                  minW="80px"
                  backgroundColor={startedPoll?.id === poll.id ? 'lightcoral' : 'transparent'}
                  padding="1px"
                  variant="outline"
                  color="#7a96b8"
                  onClick={(e) => {
                    startedPoll ? startAPoll(e, null) : startAPoll(e, poll)
                  }}
                  isDisabled={startedPoll && startedPoll.id !== poll.id}
                >
                  {startedPoll?.id === poll.id ? 'Stop' : poll.stoppedAt ? 'Share' : 'Launch'}
                </Button>
                <AccordionIcon />
              </Flex>
            </AccordionButton>
            <AccordionPanel padding="0" pb={4}>
              {poll.answers.map((answer) => {
                return typeof answer === 'string' ? ( // huh? for some reason, one of the answers is often an answer object, not a string
                  <Box key={answer} fontWeight="normal" fontSize="12px" paddingLeft="5px">
                    {answer} {answerCount(answer)}
                  </Box>
                ) : (
                  <Box key={answer} />
                )
              })}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Td>
    </Tr>
  )
}
