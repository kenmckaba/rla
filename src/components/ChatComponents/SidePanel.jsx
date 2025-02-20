import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/accordion'
import { Box, Text } from '@chakra-ui/layout'
import { useBlueJeans, bjnApi } from '../../bluejeans/useBlueJeans'
import { scrollBarStyle } from '../../theme/components/scrollbar'
import OurModal from '../OurModal'
import { useState } from 'react'
import { Button, Input } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import ChatBox from './ChatBox'

export const SidePanel = ({ attendees, training, attendeeId }) => {
  const { bjnParticipants } = useBlueJeans()
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
      {/* @Ken this Accordion item declares the widht of the 'student view' chat and attendees panels */}
      <Box width="270px">
        <Accordion
          width="270px"
          height="100%"
          isOpen
          allowMultiple
          allowToggle
          defaultIndex={[0, 1]}
        >
          <AccordionItem p={0} mt={2.5} border="none" isOpen>
            <AccordionButton
              p="2"
              _hover={'bgColor: #284A83'}
              bgGradient="linear-gradient(180deg, #283683 0%, #396AA1 100%, #283683 100%);"
              boxShadow={'2xl'}
              borderRadius={'10px 10px 0 0'}
            >
              <Text marginLeft="2" flex="1" textAlign="left" fontWeight="semibold" fontSize="0.9em">
                Attendees
              </Text>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel
              overflowY="auto"
              padding="0"
              pb={4}
              h="105px"
              backgroundColor="white"
              borderBottomRadius="8px"
            >
              <Box minHeight="60px" color="black" paddingLeft="10px" fontSize="14px">
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
          <AccordionItem p={0} m={0} mt={1} border="none" isOpen>
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
            <AccordionPanel overflowY="auto" padding="0" pb={4}>
              <ChatBox
                attendees={attendees}
                training={training}
                myAttendeeId={attendeeId}
                ht="calc(100vh - 204px)"
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
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
