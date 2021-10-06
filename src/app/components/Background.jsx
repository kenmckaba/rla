import React from 'react'
import { Box, Flex, Avatar } from '@chakra-ui/react'
import { H3Heading } from '../components/shared/Heading'

export default function Background({ children }) {
  return (
    <Flex height="100%" minHeight="100vh"  flexDirection="column">
      <Flex
        mb="12"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        paddingX="2em"
        paddingY="1em"
        bgGradient="linear(to-b, rgba(40,74,131,0.9) 0%, rgba(57,106,161, 0.9) 100%)"
      >
        <H3Heading>Remote Learning Platform</H3Heading>
        <Avatar name="A" bg="rgba(255, 255, 255, 0.1)" />
      </Flex>
      <Box padding="2em" width="100%" height="100%">
        {children}
      </Box>
    </Flex>
  )
}
