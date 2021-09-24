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
import TrainerCam from './ParticipantCams/TrainerCam'
import AttendeesCamsList from './ParticipantCams/AttendeesCamsList'

const Header = (props) => (
  <Box
    bgGradient="linear(to-b, #284A83 0%, #396AA1 100%, #396AA1 100%)"
    paddingLeft="4"
    paddingRight="4"
    height="24px"
    borderRadius="8px 8px 0 0"
    {...props}
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

export default function ParticipantCams(props) {
  return (
    <Accordion allowToggle defaultIndex={0} {...props}>
      <AccordionItem border="none" >
        <AccordionButton
          padding="0"
          as="div">
          <Header width="30vw" maxWidth="500px"/>
        </AccordionButton>
        <AccordionPanel padding="0" width="30vw" maxWidth="500px">
          <TrainerCam />
          <AttendeesCamsList />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
