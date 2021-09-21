import { Box, Center } from '@chakra-ui/layout'
import React from 'react'


const BlackBox = () => (
  <Center>
    <Box
      bg="black"
      height="177px"
      width="315px"
      mt="2"
    />
  </Center>)
export default function TestVideoSetup(props) {
  return (
    <Box
      bg="rgba(255, 255, 255, 0.1)"
      borderRadius="20px"
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

      <BlackBox />

    </Box>
  )
}
