import { Flex } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { Hub } from '@aws-amplify/core'
import { AmplifyAuthenticator } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify'
import { H3Heading } from './shared/Heading'
const location = window.location.pathname

export default function Background({ children }) {
  const [currentUser, setCurrentUser] = useState({})
  useEffect(() => {
    let updateUser = async () => {
      try {
        let user = await Auth.currentAuthenticatedUser()
        setCurrentUser(user)
      } catch {
        setCurrentUser(null)
      }
    }
    Hub.listen('auth', updateUser) // listen for login/signup events
    updateUser() // check manually the first time because we won't get a Hub event
    return () => Hub.remove('auth', updateUser) // cleanup
  }, [])
  return (
    <Flex minHeight="100vh" flexDirection="column">
      {location === '/' && currentUser && (
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
