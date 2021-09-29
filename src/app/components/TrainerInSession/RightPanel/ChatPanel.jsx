import { Collapse } from '@chakra-ui/transition'
import { ReactComponent as DoubleArrowRightIcon } from '../../../../assets/icons/double-arrow-right.svg'
import { ReactComponent as DoubleArrowLeftIcon } from '../../../../assets/icons/double-arrow-left.svg'
import { Box, Text, Flex, Spacer, Center } from '@chakra-ui/layout'
import Chat from './Chat'
import { useState } from 'react'

const Header = ({ isOpen, onDisplayClick, ...props }) => (
  <Box
    bgGradient="linear(to-b, #284A83 0%, #396AA1 100%, #396AA1 100%)"
    paddingLeft="4"
    paddingRight="4"
    height="24px"
    width="100%"
    borderRadius="8px 8px 0 0"
    onClick={onDisplayClick}
    {...props}
  >
    <Flex>
      <Text
        fontWeight="bold"
        mr="8">
        Chat
      </Text>
      <Spacer />

      <Center _hover={{cursor: 'pointer'}}>
        {isOpen ? <DoubleArrowRightIcon/> : <DoubleArrowLeftIcon/>}
      </Center>
    </Flex>
  </Box>
)

export const ChatPanel = () => {

  const [isOpen, setIsOpen] = useState(true)

  return (
    <Box
      height="100vh"
      paddingY="4">
      <Header isOpen={isOpen} onDisplayClick={() => setIsOpen(!isOpen)} />
      <Collapse in={isOpen} >
        <Chat />
      </Collapse>
    </Box>
  )
}
