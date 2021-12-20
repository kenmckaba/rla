import { Text } from '@chakra-ui/layout'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/accordion'
import { scrollBarStyle } from '../../theme/components/scrollbar'
import ChatBox from './ChatBox'

export const ChatPanel = ({ messages, attendees, training, myAttendeeId }) => {
  return (
    <Accordion width="500px" defaultIndex={0} allowToggle paddingTop="50px">
      <AccordionItem p={0} m={0} border="none">
        <AccordionButton
          p="2"
          bgGradient="linear(to-b, #284A83 0%, #396AA1 100%, #396AA1 100%)"
          _hover={'bgColor: #284A83'}
          boxShadow={'2xl'}
        >
          <Text marginLeft="2" flex="1" textAlign="left" fontWeight="semibold" fontSize="0.9em">
            Chat
          </Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel overflowY="auto" padding="0" pb={4} sx={scrollBarStyle} boxShadow={'2xl'}>
          <ChatBox
            messageList={messages} 
            attendees={attendees}
            training={training}
            myAttendeeId={myAttendeeId}
            minHeight={'850px'}            
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
