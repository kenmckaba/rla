import { Image } from '@chakra-ui/react'

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Spacer
} from '@chakra-ui/react'
import { ReactComponent as LineIcon } from '../../../../assets/icons/line.svg'
import { Box, Text, Flex, Center } from '@chakra-ui/layout'

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
        Sharescreen
      </Text>

      <Spacer />
      
      <Center _hover={{cursor: 'pointer'}}>
        <LineIcon />
      </Center>
    </Flex>
  </Box>
)


export default function Sharescreen({width, maxWidth, maxHeight}) {
  return (
    <Accordion allowToggle defaultIndex={0} >
      <AccordionItem border="none">
        <AccordionButton
          padding="0"
          as="div">
          <Header  />
        </AccordionButton>
        <AccordionPanel padding="0">
          <Image src="/images/sharescreen/sharescreen.png" alt="Sharescreen" maxW="1028px"  />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    
  )
}
