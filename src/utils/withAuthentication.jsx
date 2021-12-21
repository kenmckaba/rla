import React, { useState, useEffect } from 'react'
import { Hub } from '@aws-amplify/core'
import { AmplifyAuthenticator } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify'
import { Box, Button, Flex, Image } from '@chakra-ui/react'
import { H3Heading } from '../components/shared/Heading'
import './amplify-styles.css'
import Clock from '../components/Clock'

export const WithAuthentication = (WrappedComponent) => {

  const [currentUser, setCurrentUser] = useState({})

  const logout = async () => {
    try {
      await Auth.signOut()
    } catch (error) {
      console.log('error signing out: ', error)
    }
  }

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
  if (currentUser) {
    return (props) => (
      <Flex width="100%" flexDirection="column">
        <Flex
          position="absolute" 
          top="0"
          right="0"
          paddingX="2em"
          paddingY="2em"
          alignItems="center"
          color="white">
          <Button zIndex={3} marginLeft="5px" size="sm" onClick={logout}>
          Sign out
          </Button>
        </Flex>
        <WrappedComponent {...props} />
      </Flex>
    )
  }
  return () => (
    <Box w="100%" h="100%" bgColor="white">
      <Flex width="100%" flexDirection="column" bgGradient="linear(to-br, rgba(238,174,202,.5), rgba(148,187,233,.5))">
        <Box pos="absolute" w="100%" h="100%" overflow="hidden">
          <Box>
            <Image fit="cover" opacity={.3} src='./images/login-bg.jpg' alt='Sun' ml="-800px" mt="-250px"/>
          </Box>
        </Box>
        <Box pos="absolute" mt="96px" ml="165px" w="500px" zIndex="1" >
          <H3Heading textAlign="center">
          Welcome to Remote Learning Platform
          </H3Heading>
        </Box>
        <Box pos="absolute" bottom="0" left="0" mb="96px" ml="165px" w="500px" zIndex="1" >
          <Clock />
        </Box>
        <Flex width="100%" flexDirection="row-reverse">
          <div id='spacer'></div>
          <AmplifyAuthenticator />
        </Flex>
      </Flex>
    </Box>
  )
}
