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
      <Flex width="100%" flexDirection="column">
        <Box pos="absolute" w="100%" h="100%" overflow="hidden">
          <Image h="100%" w="100%" src='./images/login-bg.png' alt='Background'/>
        </Box>
        <Box pos="absolute" mt="96px" ml="60px" w="700px" zIndex="1" >
          <H3Heading color="white" fontSize="36px" lineHeight="44px" textAlign="center">
          Welcome to <br/> Remote Learning Platform
          </H3Heading>
        </Box>
        <Box display={{ base: 'none', lg: 'block' }} pos="absolute" bottom="0" left="0" mb="96px" ml="165px" w="500px" zIndex="1" >
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
