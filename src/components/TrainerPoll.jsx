import { gql, useMutation, useQuery } from '@apollo/client'
import { EditIcon, CopyIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tr,
  Td,
  Flex,
  Text,
  Spacer,
  Tooltip,
} from '@chakra-ui/react'
import { buildSubscription } from 'aws-appsync'
import { useEffect, useState } from 'react'
import { createPoll, updatePoll } from '../graphql/mutations'
import { getPoll } from '../graphql/queries'
import { onCreatePollResponse, onUpdatePoll } from '../graphql/subscriptions'
import { usePollResponses } from './usePollResponses'

export const TrainerPoll = ({ pollId, startedPoll, startPoll, sharePoll, editPoll }) => {
  const [poll, setPoll] = useState()
  const responseCounts = usePollResponses(poll)

  const {
    data: pollData,
    error,
    loading,
    subscribeToMore,
  } = useQuery(gql(getPoll), {
    variables: { id: pollId },
  })
  const [updateCurrentPoll] = useMutation(gql(updatePoll))
  const [addNewPoll] = useMutation(gql(createPoll))

  useEffect(() => {
    if (subscribeToMore) {
      const cleanupFuncs = [
        subscribeToMore(buildSubscription(gql(onUpdatePoll), gql(getPoll))),
        subscribeToMore(buildSubscription(gql(onCreatePollResponse), gql(getPoll))),
      ]
      return () => {
        cleanupFuncs.forEach((func) => func && func())
      }
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
    }
  }, [pollData])

  if (loading || !poll) {
    return <p>Please wait...</p>
  }

  if (error) {
    console.log('rla-log: Error', error)
    return <p>Error!</p>
  }

  const duplicate = async (e, poll) => {
    e.preventDefault()
    e.stopPropagation()
    await addNewPoll({
      variables: {
        input: {
          question: poll.question,
          trainingId: poll.trainingId,
          type: poll.type,
          answers: poll.answers,
        },
      },
    })
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
            startedAt: new Date().toISOString(),
          },
        },
      })
    } else {
      updateCurrentPoll({
        variables: {
          input: {
            id: pollId,
            stoppedAt: new Date().toISOString(),
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
              <Flex width="100%">
                <Flex fontWeight="500" fontSize="14px" cursor="pointer">
                  <Tooltip hasArrow placement="right" label={poll.question}>
                    <Text
                      mt="1"
                      width="80px"
                      maxW="80px"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      mr="2"
                    >
                      {poll.question}
                    </Text>
                  </Tooltip>
                </Flex>
                <Spacer />
                {!poll.startedAt && (
                  <Tooltip hasArrow placement="right" label="Edit poll">
                    <EditIcon
                      w={4}
                      h={4}
                      marginTop="3px"
                      marginRight="5px"
                      onClick={editThisPoll}
                    />
                  </Tooltip>
                )}
                <Tooltip hasArrow placement="right" label="Duplicate poll">
                  <CopyIcon marginRight="5px" marginTop="3px" onClick={(e) => duplicate(e, poll)} />
                </Tooltip>
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
                  <Box key={answer} fontWeight="normal" padding="5px">
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
