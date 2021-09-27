import { HStack, Input } from '@chakra-ui/react'
import { ReactComponent as AttachIcon } from '../../../../../assets/icons/chat-attach-icon.svg'
export default function ChatInput(props) {
  return (
    <HStack alignItems="center" {...props}>
      <Input
        borderRadius="full"
        bg="#f2f3f5"
        placeholder="Type answer here..."
      />
      <AttachIcon />
    </HStack>
  )
}
