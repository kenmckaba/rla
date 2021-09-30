import { Flex, Spacer } from '@chakra-ui/layout'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

export default function ChatBox({isOpen, messageList, ...props}) {
  return (
    <Flex
      flexDirection="column"
      color="black"
      bg="#ffffff"
      height="95vh"
      overflow="scroll"
      {...props}>

      {messageList.map(message => (
        <ChatMessage senderName={message.senderName} type={message.type}>
          {message.content}
        </ChatMessage>)
      )}
      <Spacer />

      <ChatInput mt="4" />
    </Flex>
  )
}
