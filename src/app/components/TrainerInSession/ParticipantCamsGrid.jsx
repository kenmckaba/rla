import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Spacer
} from '@chakra-ui/react'

import { ReactComponent as LineIcon } from '../../../assets/icons/line.svg'

import { Box, Text, Flex, Center } from '@chakra-ui/layout'
import ParticipantCamsGridList from './ParticipantCams/ParticipantCamsGridList'

const Header = (props) => (
  <Box
    bgGradient="linear(to-b, #284A83 0%, #396AA1 100%, #396AA1 100%)"
    paddingLeft="4"
    paddingRight="4"
    height="24px"
    borderRadius="8px 8px 0 0"
    width="100%"
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
        textTransform="uppercase"
        opacity="0.5">
        view mode: gallery &gt;&gt;
      </Text>

      <Spacer />
      
      <Center _hover={{cursor: 'pointer'}}>
        <LineIcon />
      </Center>
    </Flex>
  </Box>
)

export default function ParticipantCamsGrid({shareScreenLayout, chatIsVisible, ...props}) {
  const flexItemsWidth = chatIsVisible ? '33.33333%' : '25%'
  return (
    <Accordion allowToggle defaultIndex={0} width="100%" paddingY="4" marginRight="4">
      <AccordionItem border="none">
        <AccordionButton
          padding="0"
          as="div">
          <Header  />
        </AccordionButton>
        <AccordionPanel padding="0">
          <ParticipantCamsGridList flex={`1 1 ${flexItemsWidth}`} {...props}/>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
