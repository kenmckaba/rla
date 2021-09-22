import { Box, Center, Flex, Spacer } from '@chakra-ui/layout'
import React from 'react'
import { EditButton, PrimaryButton } from '../shared/Buttons'
import { ArrowRight } from '../shared/Shapes'

const BlackBox = ({ children }) => (
  <Center>
    <Center
      bg="#000"
      height="177px"
      width="315px">
      {children}
    </Center>
  </Center>)

// TODO: This will probably gonna be wrapped on a Button to do the redirect
const PlayerButton = () => (
  <Center
    bg="rgba(255, 255, 255, 0.3)"
    height="63px"
    width="63px"
    borderRadius="full"
    cursor="pointer"
  >
    <ArrowRight />
  </Center>

)
// TODO: Check the font properties
export default function TestVideoSetup(props) {
  return (
    <Box
      bg="rgba(255, 255, 255, 0.1)"
      borderRadius="8px"
      height="266px"
      width="332px"

      overflow="hidden"
      {...props}>

      <Center
        bg="rgba(255, 255, 255, 0.1)"
        height="36px"
      >
        Test Video Setup
      </Center>

      <Box height="230px" padding="2">
        <BlackBox>
          <PlayerButton />
        </BlackBox>

        {/* TODO: Standardize the xs font size to 10px */}
        <Flex mt="2.5">
          <EditButton
            size="xs"
            fontSize="10px">
            SETTINGS
          </EditButton>
          <Spacer />
          <PrimaryButton
            onClick={() => console.log('click')}
            variant="primary-button"
            size="xs"
            width="89px"
            fontSize="10px">
            JOIN MEETING
          </PrimaryButton>
        </Flex>
      </Box>
    </Box>
  )
}
