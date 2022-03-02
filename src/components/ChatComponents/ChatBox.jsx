import { Flex, HStack, VStack } from '@chakra-ui/layout'
import { Select, FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react'
import ChatMessage from './ChatMessage'
import { useQuery, useMutation, gql } from '@apollo/client'
import { createChatMessage } from '../../graphql/mutations'
import { useState, useMemo, useEffect, useRef } from 'react'
import { listChatMessages } from '../../graphql/queries'
import { buildSubscription } from 'aws-appsync'
import { onCreateChatMessage } from '../../graphql/subscriptions'

const trainerMsgId = '0'
const allMsgId = '1'

export default function ChatBox({ attendees, training, myAttendeeId, maxWidth = '100%', ht }) {
  // appears to have less lost msgs if we query here, rather than pass msgs as prop
  const { data: messagesData, subscribeToMore } = useQuery(gql(listChatMessages), {
    variables: { filter: { trainingId: { eq: training.id } } },
  })

  const [destination, setDestination] = useState(allMsgId)
  const [content, setContent] = useState('')
  const [addNewChatMessage] = useMutation(gql(createChatMessage))
  const lastSent = useRef(Promise.resolve)
  const sendQueue = useRef([])

  useEffect(() => {
    if (subscribeToMore) {
      const cleanupFuncs = [
        subscribeToMore(buildSubscription(gql(onCreateChatMessage), gql(listChatMessages))),
      ]
      return () => {
        cleanupFuncs.forEach((func) => func && func())
      }
    }
  }, [subscribeToMore])

  const messages = useMemo(() => {
    if (messagesData) {
      const temp = [...messagesData.listChatMessages.items]
      return temp.sort((a, b) => (a.timeSent > b.timeSent ? -1 : 1))
    } else {
      return []
    }
  }, [messagesData])

  const onSend = async () => {
    if (!content?.length) {
      return
    }

    sendQueue.current.push(content)
    setContent('')

    let msg
    while ((msg = sendQueue.current.pop())) {
      await lastSent.current
      lastSent.current = addNewChatMessage({
        variables: {
          input: {
            toId: destination,
            fromId: myAttendeeId,
            trainingId: training.id,
            content: msg,
            timeSent: new Date().toISOString(),
          },
        },
      })
    }
  }

  const handleMessage = (e) => {
    setContent(e.target.value)
  }

  const selectDestination = (e) => {
    setDestination(e.target.value)
  }

  const idToName = (id) => {
    if (id === myAttendeeId) {
      return 'You'
    } else if (id === trainerMsgId) {
      return `${training.trainerName} (trainer)`
    } else if (id === allMsgId) {
      return 'All'
    } else {
      return attendees.find((a) => a.id === id)?.name
    }
  }

  const checkForCr = (e) => {
    if (e.keyCode === 13) {
      onSend()
    }
  }

  let count = 0

  return (
    <Flex
      flexDirection="column"
      color="black"
      maxWidth={maxWidth}
      bg="#ffffff"
      borderBottomRadius="8px"
      padding={2}
      justifyContent="end"
      overflow-y="scroll"
      height={ht}
    >
      <VStack overflow="auto" flexDirection="column-reverse">
        {messages.reduce((acc, message) => {
          if (
            message.toId === allMsgId ||
            message.toId === myAttendeeId ||
            message.fromId === myAttendeeId
          ) {
            let recipientName = idToName(message.toId)
            let senderName = idToName(message.fromId)
            acc.push(
              <ChatMessage
                key={count++}
                senderName={senderName}
                recipientName={recipientName}
                type={message.type}
                fromMe={message.fromId === myAttendeeId}
              >
                {message.content}
              </ChatMessage>,
            )
          }
          return acc
        }, [])}
      </VStack>
      <Box
        backgroundColor="aliceblue"
        padding="3px"
        borderRadius="18px"
        border="2px solid #396aa175"
        marginTop="10px"
      >
        <FormControl isRequired marginBottom="10px">
          <FormLabel margin="1px">Send to:</FormLabel>
          <Select
            fontSize="14px"
            defaultValue={allMsgId}
            height="30px"
            onChange={selectDestination}
          >
            {myAttendeeId !== trainerMsgId && (
              <option value={trainerMsgId} key="0">
                {`${training.trainerName} (trainer)`}
              </option>
            )}
            <option value={allMsgId} key="1">
              Everyone
            </option>
            {attendees.reduce((acc, att) => {
              if (att.id !== myAttendeeId && att.joinedTime && !att.leftTime) {
                acc.push(
                  <option value={att.id} key={att.id}>
                    {att.name}
                  </option>,
                )
              }
              return acc
            }, [])}
          </Select>
        </FormControl>
        <HStack alignItems="center" width="100%">
          <Input
            height="32px"
            borderRadius="full"
            bg="#f2f3f5"
            placeholder="Type message here..."
            value={content}
            onChange={handleMessage}
            onKeyDown={checkForCr}
          />
          <Button size="sm" fontSize="14px" onClick={onSend} isDisabled={!content}>
            Send
          </Button>
        </HStack>
      </Box>
    </Flex>
  )
}
