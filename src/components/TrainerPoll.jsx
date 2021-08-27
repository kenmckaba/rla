import { gql, useMutation, useQuery } from '@apollo/client'
import { EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { buildSubscription } from 'aws-appsync'
import { useEffect, useState } from 'react'
import { updatePoll } from '../graphql/mutations'
import { getPoll } from '../graphql/queries'
import { onCreatePollResponse, onUpdatePoll } from '../graphql/subscriptions'

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
      return () => {
        cleanupFuncs.forEach((func) => func())
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
    <Accordion width="100%" allowToggle key={poll.id}>
      <AccordionItem>
        <AccordionButton padding="0px" as="div">
          <Box
            fontWeight="500"
            fontSize="14px"
            flex="1"
            textAlign="left"
            cursor="pointer"
            backgroundColor={startedPoll?.id === poll.id ? 'gold' : ''}
          >
            <Button
              size="xs"
              marginLeft="3px"
              backgroundColor={startedPoll?.id === poll.id ? 'lightcoral' : 'lightcyan'}
              padding="1px"
              height="15px"
              variant="outline"
              marginRight="5px"
              onClick={(e) => {
                startedPoll ? startAPoll(e, null) : startAPoll(e, poll)
              }}
              isDisabled={startedPoll && startedPoll.id !== poll.id}
            >
              {startedPoll?.id === poll.id ? 'Stop' : poll.stoppedAt ? 'Share' : 'Launch'}
            </Button>
            {poll.question}
            {!poll.startedAt && (
              <EditIcon w={2} h={2} float="right" mt="6px" onClick={editThisPoll} />
            )}
          </Box>
          <AccordionIcon />
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
  )
}
