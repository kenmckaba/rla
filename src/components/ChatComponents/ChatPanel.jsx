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

export const ChatPanel = ({ messages, attendees, training, myAttendeeId, paddingTop='0px' }) => {
  return (
    <Accordion width="40vw" paddingTop={'1vh'} defaultIndex={0} allowToggle px='1'>
      <AccordionItem p={0} m={0} border="none">
        <AccordionButton
          p="2"
          _hover={'bgColor: #284A83'}
          bgGradient="linear-gradient(180deg, #283683 0%, #396AA1 100%, #283683 100%);"
          boxShadow={'2xl'}
          borderRadius={'10px 10px 0 0'}
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
            minHeight={'60vh'}
            maxHeight={'calc(100vh - 8vh)'}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
