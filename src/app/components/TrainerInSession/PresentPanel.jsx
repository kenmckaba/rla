import { Box, Center, VStack } from '@chakra-ui/layout'
import { ChatPanel } from './PresentPanel/ChatPanel'
import { SharescreenPanel } from './PresentPanel/SharescreenPanel'

export default function PresentPanel(props) {
  return (
    <Center>
      <VStack {...props}>
        <SharescreenPanel />
        <ChatPanel />
      </VStack>
    </Center>
  
  )
}
