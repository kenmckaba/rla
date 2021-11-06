import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/accordion'
import { Box, HStack, Text } from '@chakra-ui/layout'
import { useBlueJeans } from '../../bluejeans/useBlueJeans'
import { scrollBarStyle } from '../../theme/components/scrollbar'
import OurModal from '../OurModal'
import { useState } from 'react'
import Chat from './Chat'
import { Button, Input } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'

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
      <Accordion height="100%" isOpen allowMultiple width="340px" allowToggle defaultIndex={[0, 1]}>
        <AccordionItem p={0} m={0} border="none" isOpen>
          <AccordionButton p="2">
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
              {bjnParticipants.map((p) => {
                return p.isSelf ? (
                  <Box cursor="pointer" onClick={(e) => handleClick(e, p)}>
                    {p.name + ' (me)'} {p.isModerator && ' (Trainer)'}
                    <EditIcon marginLeft="5px" />
                  </Box>
                ) : (
                  <Box>
                    {p.name} {p.isModerator && ' (Trainer)'}
                  </Box>
                )
              })}
            </Box>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem p={0} m={0} border="none" isOpen>
          <AccordionButton p="2">
            <Text marginLeft="2" flex="1" textAlign="left" fontWeight="semibold" fontSize="0.9em">
              Chat
            </Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel overflowY="auto" padding="0" pb={4} sx={scrollBarStyle}>
            <Chat
              messages={chatMessages}
              attendees={attendees}
              training={training}
              myAttendeeId={attendeeId}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <OurModal isOpen={!!currentParticipant} header="Change your name">
        <Input type="text" onChange={editNewName} value={newName} />
        <HStack marginTop="10px">
          <Button width="100%" marginRight="20px" onClick={handleNewName}>
            Save
          </Button>
          <Button variant="outline" onClick={() => setCurrentParticipant(null)}>
            Cancel
          </Button>
        </HStack>
      </OurModal>
    </>
  )
}
