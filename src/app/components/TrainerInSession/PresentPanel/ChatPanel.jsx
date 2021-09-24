import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  HStack
} from '@chakra-ui/react'
import { ReactComponent as LineIcon } from '../../../../assets/icons/line.svg'
import { Box, Text, Flex, Spacer } from '@chakra-ui/layout'
import Chat from './Chat'

const Header = () => (
  <Box
    bgGradient="linear(to-b, #284A83 0%, #396AA1 100%, #396AA1 100%)"
    paddingLeft="4"
    paddingRight="4"

    width="100%"
    height="24px"
    borderRadius="8px 8px 0 0"
  >
    <Flex>
      <Text
        fontWeight="bold"
        mr="8">
        Chat
      </Text>
      <Spacer />
      <HStack mb="1">
        <LineIcon />
      </HStack>
    </Flex>
  </Box>
)


export const ChatPanel = () => {
  return (
    <Accordion allowToggle defaultIndex={0}>
      <AccordionItem border="none">
        <AccordionButton
          padding="0"
          as="div">
          <Header />
        </AccordionButton>
        <AccordionPanel padding="0">
          <Chat />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
