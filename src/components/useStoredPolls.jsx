import { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { listStoredPolls } from '../graphql/queries'
import { buildSubscription } from 'aws-appsync'
import { onCreateStoredPoll, onUpdateStoredPoll } from '../graphql/subscriptions'
import { Box } from '@chakra-ui/react'

export const useStoredPolls = (onPollClick) => {
  const [storedPolls, setStoredPolls] = useState([])
  const [selectedId, setSelectedId] = useState()
  const { data: storedPollsData, loading, subscribeToMore } = useQuery(gql(listStoredPolls))

  useEffect(() => {
    if (storedPollsData) {
      setStoredPolls(storedPollsData.listStoredPolls.items)
    }
  }, [storedPollsData])

  useEffect(() => {
    if (subscribeToMore) {
      const cleanupFuncs = [
        subscribeToMore(buildSubscription(gql(onUpdateStoredPoll), gql(listStoredPolls))),
        subscribeToMore(buildSubscription(gql(onCreateStoredPoll), gql(listStoredPolls))),
      ]
      return () => {
        cleanupFuncs.forEach((func) => func && func())
      }
    }
  }, [subscribeToMore])

  const onClick = (poll) => {
    setSelectedId(poll.id)
    onPollClick(poll)
  }

  if (loading) {
    return <p>Please wait...</p>
  }

  return storedPolls?.length ? (
    storedPolls.map((poll) => (
      <Box
        backgroundColor={selectedId === poll.id ? 'lightblue' : 'aliceblue'}
        key={poll.id}
        borderRadius="8px"
        padding="5px"
        paddingLeft="10px"
        marginBottom="5px"
        onClick={() => onClick(poll)}
        _hover={{ backgroundColor: 'darkgrey', cursor: 'pointer' }}
      >
        <Box fontWeight="bold">{poll.question}</Box>
        {poll.answers.map((answer, index) => (
          <Box key={index} marginLeft="20px">
            {answer}
          </Box>
        ))}
      </Box>
    ))
  ) : (
    <Box>*None*</Box>
  )
}
