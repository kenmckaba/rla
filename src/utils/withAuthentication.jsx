import React, { useState, useEffect } from 'react'
import { Hub } from '@aws-amplify/core'
import { AmplifyAuthenticator } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify'
import { Box, Button, Flex } from '@chakra-ui/react'
import './amplify-styles.css'


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
        <Flex width="100%" flexDirection="row-reverse">
          <div id='spacer'></div>
          <AmplifyAuthenticator />
        </Flex>
      </Flex>
    </Box>
  )
}
