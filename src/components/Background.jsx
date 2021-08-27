import React from 'react'
import { Box, Flex } from '@chakra-ui/react'

export default function Background({ children }) {
  return (
    <Flex height="100vh" direction="column">
      <Flex
        alignItems="center"
        h="3rem"
        minHeight="3rem"
        bg="brand.500"
        color="white"
        paddingLeft="1rem"
        justifyContent="space-between"
      >
        <Box>Verizon Remote Learing Platform - POC</Box>
      </Flex>
      <Box height="100vh" padding="10px" bgGradient="linear(to-br, brand.100, brand.500)">
        {children}
      </Box>
    </Flex>
  )
}
