import { Box, HStack, Input } from '@chakra-ui/react'
import { ReactComponent as AttachIcon } from '../../../../../assets/icons/chat-attach-icon.svg'
export default function ChatInput({onAttachClick, ...props}) {
  return (
    <HStack
      alignItems="center"
      width="100%"
      {...props}>
      <Input
        borderRadius="full"
        bg="#f2f3f5"
        placeholder="Type answer here..."
      />
      <Box
        onClick={() => onAttachClick()}
        cursor="pointer"
      >
        <AttachIcon />
      </Box>
    </HStack>
  )
}
