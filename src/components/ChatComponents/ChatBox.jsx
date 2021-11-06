import { Flex, HStack, VStack } from '@chakra-ui/layout'
import { Select, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import ChatMessage from './ChatMessage'
import { useMutation, gql } from '@apollo/client'
import { createChatMessage } from '../../graphql/mutations'
import { useState } from 'react'
import { useBlueJeans } from '../../bluejeans/useBlueJeans'

const trainerMsgId = '0'
const allMsgId = '1'

export default function ChatBox({ isOpen, messageList, attendees, training, myAttendeeId }) {
  const [destination, setDestination] = useState(allMsgId)
  const [content, setContent] = useState()
  const [addNewChatMessage] = useMutation(gql(createChatMessage))

  const { bjnParticipants } = useBlueJeans()

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
      minHeight="200px"
      bg="#ffffff"
      borderBottomRadius="8px"
      padding={2}
      justifyContent="end"
    >
      <VStack overflow="auto">
        {messageList.reduce((acc, message) => {
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
      <FormControl isRequired marginBottom="10px">
        <FormLabel>Send to:</FormLabel>
        <Select fontSize="14px" height="30px" onChange={selectDestination}>
          {myAttendeeId !== trainerMsgId && (
            <option value={trainerMsgId} key="0">
              {`${training.trainerName} (trainer)`}
            </option>
          )}
          <option value={allMsgId} key="1" selected>
            Everyone
          </option>
          {attendees.reduce((acc, att) => {
            if (att.id !== myAttendeeId && bjnParticipants.find((p) => p.name === att.name)) {
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
    </Flex>
  )
}
