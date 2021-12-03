import React from 'react'
import { Flex } from '@chakra-ui/react'
import { H3Heading } from './shared/Heading'

export default function Background({ children }) {
  return (
    <Flex height="100vh" flexDirection="column">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        paddingX="2em"
        paddingY="1em"
        bgGradient="linear(to-b, rgba(40,74,131,0.9) 0%, rgba(57,106,161, 0.9) 100%)"
      >
        <H3Heading>Remote Learning Platform</H3Heading>
      </Flex>
      <Flex padding="1em" flex="1" height="91%">
        {children}
      </Flex>
    </Flex>
  )
}
