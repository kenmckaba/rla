import { Flex, Spacer } from '@chakra-ui/layout'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

export default function ChatBox({onAttachClick, isOpen, messageList, ...props}) {
  return (
    <Flex
      flexDirection="column"
      color="black"
      bg="#ffffff"
      height="95vh"
      overflow="scroll"
      padding={2}
      {...props}>

      {messageList.map(message => (
        <ChatMessage senderName={message.senderName} type={message.type}>
          {message.content}
        </ChatMessage>)
      )}
      <Spacer />

      <ChatInput onAttachClick={onAttachClick} mt="4" />
    </Flex>
  )
}
