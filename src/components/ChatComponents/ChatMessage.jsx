import { Flex, Heading, Text } from '@chakra-ui/layout'

// Type can be: 'incoming' || 'outgoing'
export default function ChatMessage({ senderName, recipientName, children, fromMe }) {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      bg="#f2f3f5"
      minHeight="50px"
      width="90%"
      alignSelf={fromMe ? 'flex-end' : 'flex-start'}
      mt="4"
      padding={2}
      textAlign={fromMe ? 'right' : 'left'}
    >
      <Heading fontSize="14px" color="#0d62c5">
        {senderName} to {recipientName}
      </Heading>
      <Text fontSize="14px" color="#000000">
        {children}
      </Text>
    </Flex>
  )
}
