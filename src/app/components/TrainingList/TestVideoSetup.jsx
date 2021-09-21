import { Box, Center } from '@chakra-ui/layout'
import React from 'react'
import { ArrowRight } from '../shared/Shapes'

const BlackBox = ({ children }) => (
  <Center>
    <Center
      bg="#000"
      height="177px"
      width="315px"
      mt="2">
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
      height="100%"
      width="100%"
      overflow="hidden"
      {...props}>

      <Center
        bg="rgba(255, 255, 255, 0.1)"
        height="36px"
      >
        Test Video Setup
      </Center>
      <BlackBox>
        <PlayerButton />
      </BlackBox>
    </Box>
  )
}
