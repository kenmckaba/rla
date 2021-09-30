import { Image } from '@chakra-ui/react'

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Spacer
} from '@chakra-ui/react'
import { ReactComponent as LineIcon } from '../../../../assets/icons/line.svg'
import { Box, Text, Flex, Center, HStack, VStack } from '@chakra-ui/layout'

const Header = ({handleShareScreenVisibility, ...props}) => (
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
      
      <Center onClick={() => handleShareScreenVisibility()} _hover={{cursor: 'pointer'}}>
        <LineIcon />
      </Center>
    </Flex>
  </Box>
)


export default function Sharescreen({flexGrow, handleShareScreenVisibility}) {
  return (
    <VStack height="100%" width="100%" spacing="0" flexGrow={flexGrow}>
      <Header handleShareScreenVisibility={handleShareScreenVisibility}/>
      <Box position="relative"
        backgroundImage={'url("/images/sharescreen/sharescreen.png")'}
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        width="100%"
        height= "100%"
      >
      </Box>
    </VStack>
    
  )
}
