import { Flex } from '@chakra-ui/react'
import React from 'react'
import { H3Heading } from './shared/Heading'

export default function Header() {
  return (
    <Flex flexDirection="column">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        paddingX="2em"
        paddingY="2em"
        zIndex={2}
      >
        <H3Heading>Remote Learning Platform</H3Heading>
      </Flex>
    </Flex>
  )
}
