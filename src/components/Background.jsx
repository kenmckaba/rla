import React from 'react'
import { Box, Flex, Spacer, Avatar, Heading } from '@chakra-ui/react'

export default function Background({ children }) {
  return (
    <Flex
      height="100%"
      minHeight="100vh"
      padding="2em"
      justifyContent="space-between"
      flexDirection="column"
    >
      <Box width="100%" height="100%">
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
      </Box>
      <Box width="100%" height="100%">
        {children}
      </Box>
      <Box />
    </Flex>
  )
}
