import React from 'react'
import { Box, Flex, Avatar } from '@chakra-ui/react'
import { H3Heading } from '../components/shared/Heading'

export default function Background({ children }) {
  return (
    <Flex height="100%" minHeight="100vh" padding="2em" flexDirection="column">
      <Flex mb="12" alignItems="center" justifyContent="space-between">
        <H3Heading>Remote Learning Platform</H3Heading>
        <Avatar name="A" bg="rgba(255, 255, 255, 0.1)" />
      </Flex>
      <Box width="100%" height="100%">
        {children}
      </Box>
    </Flex>
  )
}
