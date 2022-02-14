import { Flex, HStack, VStack } from '@chakra-ui/layout'
import { Select, FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react'
import ChatMessage from './ChatMessage'
import { useMutation, gql } from '@apollo/client'
import { createChatMessage } from '../../graphql/mutations'
import { useState, useMemo } from 'react'

const trainerMsgId = '0'
const allMsgId = '1'

export default function ChatBox({
  messageList,
  attendees,
  training,
  myAttendeeId,
  maxWidth = '100%',
  minHeight = '200px',
  maxHeight = '40vh',
}) {
  const [destination, setDestination] = useState(allMsgId)
  const [content, setContent] = useState('')
  const [addNewChatMessage] = useMutation(gql(createChatMessage))

  const messages = useMemo(() => {
    const temp = [...messageList]
    return temp.sort((a, b) => (a.timeSent > b.timeSent ? -1 : 1))
  }, [messageList])

  const onSend = async () => {
    await addNewChatMessage({
      variables: {
        input: {
          toId: destination,
          fromId: myAttendeeId,
          trainingId: training.id,
          content,
          timeSent: new Date().toISOString(),
        },
      },
    })
    setContent('')
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
      minHeight={minHeight}
      maxHeight={maxHeight}
      bg="#ffffff"
      borderBottomRadius="8px"
      padding={2}
      justifyContent="end"
      overflow-y="scroll"
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
