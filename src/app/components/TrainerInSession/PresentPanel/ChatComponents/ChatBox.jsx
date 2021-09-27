import { Flex } from '@chakra-ui/layout'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

export default function ChatBox({messageList, ...props}) {
  return (
    <Flex
      flexDirection="column"
      color="black"
      bg="#ffffff"
      minHeight="200px"
      maxHeight="279px"
      overflow="scroll"
      {...props}>

      {messageList.map(message => (
        <ChatMessage senderName={message.senderName} type={message.type}>
          {message.content}
        </ChatMessage>)
      )}

      <ChatInput mt="4" />
    </Flex>
  )
}
