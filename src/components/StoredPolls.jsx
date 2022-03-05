import { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { listStoredPolls } from '../graphql/queries'
import { buildSubscription } from 'aws-appsync'
import { onCreateStoredPoll, onUpdateStoredPoll } from '../graphql/subscriptions'
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Checkbox,
  HStack,
  VStack,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'

export const StoredPolls = ({ header, onPollClick, onCopy, isOpen, onClose, onAddPoll }) => {
  const [storedPolls, setStoredPolls] = useState([])
  const [selectedId, setSelectedId] = useState()
  const [filter, setFilter] = useState('')
  const [itemsChecked, setItemsChecked] = useState([])
  const { data: storedPollsData, loading, subscribeToMore } = useQuery(gql(listStoredPolls))

  useEffect(() => {
    console.log('@ken')
  }, [])

  useEffect(() => {
    if (storedPollsData) {
      const all = storedPollsData.listStoredPolls.items
      const filtered = all.filter((p) => {
        const tags = p.tags || ''
        return tags.includes(filter)
      })
      setStoredPolls(filtered)
    }
  }, [storedPollsData, filter])

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

  const cleanup = (doClose) => {
    setItemsChecked([])
    setFilter('')
    if (doClose) {
      onClose()
    }
  }

  const onClick = (poll) => {
    setSelectedId(poll.id)
    onPollClick(poll)
    cleanup()
  }

  const onCopyPolls = () => {
    const pollsToCopy = []
    itemsChecked.forEach((pollId) => {
      const found = storedPolls.find((poll) => poll.id === pollId)
      pollsToCopy.push(found)
    })
    onCopy(pollsToCopy)
    cleanup()
  }

  const onCheckbox = (e, storedPollId) => {
    const isChecked = e.target.checked
    if (isChecked === undefined) {
      return
    }
    if (isChecked) {
      setItemsChecked((prev) => [...prev, storedPollId])
    } else {
      setItemsChecked((prev) => prev.filter((c) => c !== storedPollId))
    }
  }

  if (loading) {
    return <p>Please wait...</p>
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent color="darkKnight.700" maxHeight="85%">
        <ModalHeader>{header}</ModalHeader>
        <ModalBody overflow="auto">
          <FormControl>
            <FormLabel fontWeight="bold" textTransform="uppercase">
              Filter by tag
            </FormLabel>
            <Input
              value={filter}
              size="xs"
              marginBottom="10px"
              onChange={(e) => setFilter(e.target.value)}
            />
          </FormControl>
          {storedPolls?.length ? (
            storedPolls.map((poll) => (
              <Box
                backgroundColor={selectedId === poll.id ? 'lightblue' : 'aliceblue'}
                key={poll.id}
                borderRadius="8px"
                padding="5px"
                paddingLeft="10px"
                marginBottom="5px"
                _hover={{ backgroundColor: 'darkgrey', cursor: 'pointer' }}
              >
                <HStack alignItems="start">
                  <VStack justifyContent="space-between" minHeight="44px">
                    {!!onCopy ? (
                      <Checkbox
                        onChange={(e) => onCheckbox(e, poll.id)}
                        isChecked={itemsChecked.includes(poll.id)}
                      />
                    ) : (
                      <EditIcon
                        w={4}
                        h={4}
                        marginTop="3px"
                        marginRight="5px"
                        onClick={() => onClick(poll)}
                      />
                    )}
                  </VStack>

                  <VStack alignItems="start" spacing="0">
                    <Box>Tags: {poll.tags}</Box>
                    <Box fontWeight="bold">Q: {poll.question}</Box>
                    {poll.answers.map((answer, index) => (
                      <Box key={index} marginLeft="20px">
                        {answer}
                      </Box>
                    ))}
                  </VStack>
                </HStack>
              </Box>
            ))
          ) : (
            <Box>*None*</Box>
          )}
        </ModalBody>
        <ModalFooter>
          <HStack justifyContent="space-between" width="100%">
            {onCopy ? (
              <>
                <Button variant="outline" onClick={() => cleanup(true)}>
                  Cancel
                </Button>
                <Button onClick={onCopyPolls}>Copy</Button>
              </>
            ) : (
              <>
                <Button onClick={onAddPoll}>Add a poll</Button>
                <Button onClick={() => cleanup(true)}>Done</Button>
              </>
            )}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
