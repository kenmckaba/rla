import { Box, HStack, Input } from '@chakra-ui/react'

export default function ChatInput({ onSend }) {
  return (
    <HStack alignItems="center" width="100%">
      <Input borderRadius="full" bg="#f2f3f5" placeholder="Type message here..." />
      <Box
        onClick={onSend}
        borderRadius="20px"
        paddingTop="8px"
        font-size="13px"
        textAlign="center"
        cursor="pointer"
        height="40px"
        width="55px"
        color="white"
        backgroundColor="#0D62C5"
      >
        Send
      </Box>
    </HStack>
  )
}
