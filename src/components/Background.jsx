import { Flex } from '@chakra-ui/react'
import React from 'react'
import { H3Heading } from './shared/Heading'
const location = window.location.pathname

// TODO: We need a flag or something to know if the user is logged in, in oder to hide/show the title bar and log out button

export default function Background({ children }) {
  return (
    <Flex flexDirection="column">
      {location === '/' && (
        <Flex
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          paddingX="2em"
          paddingY="2em"
        >
          <H3Heading>Remote Learning Platform</H3Heading>
        </Flex>
      )}
      <Flex flex="1" height="100%">
        {children}
      </Flex>
    </Flex>
  )
}
