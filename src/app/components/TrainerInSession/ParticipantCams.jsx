import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Spacer,
  HStack
} from '@chakra-ui/react'

import { ReactComponent as LineIcon } from '../../../assets/icons/line.svg'

import { Box, Text, Flex } from '@chakra-ui/layout'
import TrainerCam from './TrainerCam'
import AttendeesCams from './AttendeesCams'

const Header = () => (
  <Box
    bgGradient="linear(to-b, #284A83 0%, #396AA1 100%, #396AA1 100%)"
    paddingLeft="4"
    paddingRight="4"
    paddingTop="2"
    paddingBottom="2"
    width="448px"
    borderRadius="8px 8px 0 0"
  >
    <Flex>
      <Text
        fontWeight="bold"
        mr="8">
        Screen
      </Text>

      <Text
        fontWeight="bold"
        textTransform="capitalize"
        opacity="0.5">
        View Mode &gt;&gt;
      </Text>

      <Spacer />
      
      <HStack mb="1">
        <LineIcon />
      </HStack>
    </Flex>
  </Box>
)

export default function ParticipantCams() {
  return (
    <Accordion allowToggle>
      <AccordionItem border="none">
        <AccordionButton
          padding="0"
          as="div">
          <Header />
        </AccordionButton>
        <AccordionPanel padding="0">
          <TrainerCam />
          <AttendeesCams />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
