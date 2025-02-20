import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  HStack
} from '@chakra-ui/react'

import { ReactComponent as LineIcon } from '../../../../assets/icons/line.svg'

import { Box, Text, Flex, Spacer } from '@chakra-ui/layout'
import Sharescreen from './Sharescreen'

const Header = (props) => (
  <Box
    bgGradient="linear(to-b, #284A83 0%, #396AA1 100%, #396AA1 100%)"
    paddingLeft="4"
    paddingRight="4"
    width="100%"
    borderRadius="8px 8px 0 0"
    height="24px"
    {...props}
  >
    <Flex>
      <Text
        fontWeight="bold"
        mr="8">
        Sharescreen
      </Text>
      <Spacer />
      <HStack mb="1">
        <LineIcon />
      </HStack>
    </Flex>
  </Box>
)


export const SharescreenPanel = () => {
  return (
    <Accordion allowToggle defaultIndex={0}>
      <AccordionItem border="none">
        <AccordionButton
          padding="0"
          as="div">
          <Header />
        </AccordionButton>
        <AccordionPanel padding="0">
          <Sharescreen />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
