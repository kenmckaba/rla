import { Flex, Heading, Text } from '@chakra-ui/layout'

// Type can be: 'incoming' || 'outgoing'
export default function ChatMessage({type, senderName, children}) {
  const isIncoming = type === 'incoming'
  const defaultOutgoingSenderName = 'You'
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      bg="#f2f3f5"
      minHeight="50px"
      width="216px"
      alignSelf='flex-start'
      mt="4"
      padding={2}>
      <Heading fontSize="10px" color="#0d62c5">{isIncoming ? senderName : defaultOutgoingSenderName}</Heading>
      <Text fontSize="10px" color="#000000">{children}</Text>
    </Flex>
  )
}
