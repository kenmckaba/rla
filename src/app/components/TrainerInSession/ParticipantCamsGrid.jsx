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
import { useEffect, useState } from 'react'

const Header = ({ chatIsVisible, dimensions, isStudentView, ...props }) => {
  const headerWidth = () => !isStudentView && !chatIsVisible && dimensions.width < 1890 ? '800px' : '1155px'

  return (
    <Box
      bgGradient="linear(to-b, #284A83 0%, #396AA1 100%, #396AA1 100%)"
      paddingLeft="4"
      paddingRight="4"
      height="24px"
      borderRadius="8px 8px 0 0"
      width={() => headerWidth()}
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

        <Center _hover={{ cursor: 'pointer' }}>
          <LineIcon />
        </Center>
      </Flex>
    </Box>
  )
}

export default function ParticipantCamsGrid({ isStudentView, shareScreenLayout, chatIsVisible, onNextCamClick, onPrevCamClick, ...props }) {

  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => window.addEventListener('resize', () => {
    console.log({ width: window.innerWidth, height: window.innerHeight })
    setDimensions({ width: window.innerWidth, height: window.innerHeight })
  }
  ), [])

  const flexItemsWidth = chatIsVisible ? '33.33333%' : '25%'
  return (
    <Accordion allowToggle defaultIndex={0} paddingY="4" marginRight="4">
      <AccordionItem border="none">
        <AccordionButton
          padding="0"
          as="div">
          <Header
            dimensions={dimensions}
            isStudentView={isStudentView}
            chatIsVisible={chatIsVisible}
          />
        </AccordionButton>
        <AccordionPanel padding="0">
          <ParticipantCamsGridList dimensions={dimensions} isStudentView={isStudentView} chatIsVisible={chatIsVisible} onNextCamClick={onNextCamClick} onPrevCamClick={onPrevCamClick} flex={`1 1 ${flexItemsWidth}`} {...props} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
