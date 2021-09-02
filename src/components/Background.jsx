import React from 'react'
import { Box, Flex, Spacer, Avatar, Heading } from '@chakra-ui/react'

export default function Background({ children }) {
  return (
    <Flex height="100%" minHeight="100vh" direction="column">
      <Box padding="2em">
        <Flex mb="8" alignItems="center" justifyContent="space-between">
          <Box>
            <Heading fontSize="32pt" fontWeight="medium" color="white">
              Remote Learning Platform
            </Heading>
          </Box>
          <Spacer />
          <Box>
            <Avatar name="A" bg="rgba(255, 255, 255, 0.1)" />
          </Box>
        </Flex>
        {children}
      </Box>
    </Flex>
  )
}
