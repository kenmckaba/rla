import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/accordion'
import { Box, Text } from '@chakra-ui/layout'
import { useBlueJeans } from '../../bluejeans/useBlueJeans'
import { scrollBarStyle } from '../../theme/components/scrollbar'
import OurModal from '../OurModal'
import { useState } from 'react'
import { Button, Input } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import ChatBox from './ChatBox'

export const SidePanel = ({ chatMessages, attendees, training, attendeeId }) => {
  const { bjnApi, bjnParticipants } = useBlueJeans()
  const [currentParticipant, setCurrentParticipant] = useState()
  const [newName, setNewName] = useState()

  const handleClick = (e, participant) => {
    setCurrentParticipant(participant)
    setNewName(participant.name)
  }

  const editNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewName = () => {
    bjnApi.setName(newName)
    setCurrentParticipant(null)
  }

  return (
    <>
      <Accordion height="100%" isOpen allowMultiple width="40vw" allowToggle defaultIndex={[0, 1]}>
        <AccordionItem p={0} m={0} border="none" isOpen>
          <AccordionButton
            p="2"
            bgGradient="linear(to-b, #284A83 0%, #396AA1 100%, #396AA1 100%)"
            _hover={'bgColor: #284A83'}
            boxShadow={'2xl'}
          >
            <Text marginLeft="2" flex="1" textAlign="left" fontWeight="semibold" fontSize="0.9em">
              Attendees
            </Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel overflowY="auto" padding="0" pb={4} sx={scrollBarStyle}>
            <Box
              minHeight="60px"
              backgroundColor="white"
              color="black"
              paddingLeft="10px"
              borderBottomRadius="8px"
              fontSize="14px"
            >
              {bjnParticipants.map((p, index) => {
                return p.isSelf ? (
                  <Box key={index} cursor="pointer" onClick={(e) => handleClick(e, p)}>
                    {p.name + ' (me)'} {p.isModerator && ' (trainer)'}
                    <EditIcon marginLeft="5px" />
                  </Box>
                ) : (
                  <Box key={index}>
                    {p.name} {p.isModerator && ' (trainer)'}
                  </Box>
                )
              })}
            </Box>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem p={0} m={0} border="none" isOpen>
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
          <AccordionPanel overflowY="auto" padding="0" pb={4} sx={scrollBarStyle}>
            <ChatBox
              messageList={chatMessages}
              attendees={attendees}
              training={training}
              myAttendeeId={attendeeId}
              minHeight='80vh'
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <OurModal
        isOpen={!!currentParticipant}
        header="Change your name"
        footer={
          <>
            <Button width="100%" marginRight="20px" onClick={handleNewName}>
              Save
            </Button>
            <Button variant="outline" onClick={() => setCurrentParticipant(null)}>
              Cancel
            </Button>
          </>
        }
      >
        <Input type="text" onChange={editNewName} value={newName} />
      </OurModal>
    </>
  )
}
