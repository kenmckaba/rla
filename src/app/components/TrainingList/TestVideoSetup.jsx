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

const PlayerButton = (props) => (
  <Center
    bg="rgba(255, 255, 255, 0.3)"
    height="63px"
    width="63px"
    borderRadius="full"
    cursor="pointer"
    {...props}>
    <ArrowRight />
  </Center>

)
// TODO: Check the font properties
export default function TestVideoSetup({ onJoinMeetingClick, ...props }) {
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
        height="36px">
        Test Video Setup
      </Center>

      <Box height="230px" padding="2">
        <BlackBox>
          <PlayerButton onClick={() => onJoinMeetingClick()} />
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
            onClick={() => onJoinMeetingClick()}
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
