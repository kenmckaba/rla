import React, { useState, useEffect } from 'react'
import { Hub } from '@aws-amplify/core'
import { AmplifySignIn  } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify'
import { H3Heading } from '../components/shared/Heading'
import { Flex, Stack, Image } from '@chakra-ui/react'
import './amplify-styles.css'

export const WithAuthentication = (WrappedComponent) => {
  
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
  if (currentUser) {
    return (props) => (
      <Flex width="100%" flexDirection="column">
        <WrappedComponent {...props} />
      </Flex>
    )
  }
  return () => (
    <Stack minH={'99.99vh'} direction={{ base: 'column', md: 'row' }} maxH='99.99vh' overflow={{ base: 'scroll', md: 'hidden' }} >
      <Flex px={8} align={'center'} justify={'center'}>
        <Stack w={'full'} maxW={'md'}>
          <H3Heading color="black" fontSize="2.5em" textAlign="center" mb='0' zIndex='2'>
            Welcome to Remote Learning Platform
          </H3Heading>
          <AmplifySignIn />
        </Stack>
      </Flex>
      <Flex padding={'20px'} 
        paddingLeft={'10px'}
        marginInlineStart={[0, '0vw !important']}
      >
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={'./images/shutterstock_1642992973.jpg'}
          borderRadius={'50px'}
          boxShadow={'20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff'}
        />
      </Flex>
    </Stack>
  )
}
