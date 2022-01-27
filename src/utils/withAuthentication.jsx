import React, { useState, useEffect } from 'react'
import { Hub } from '@aws-amplify/core'
import { AmplifyAuthenticator } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify'
import { H3Heading } from '../components/shared/Heading'
import './amplify-styles.css'

// export const WithAuthentication = (WrappedComponent) => {

//   const [currentUser, setCurrentUser] = useState({})

//   const logout = async () => {
//     try {
//       await Auth.signOut()
//     } catch (error) {
//       console.log('error signing out: ', error)
//     }
//   }

//   useEffect(() => {
//     let updateUser = async () => {
//       try {
//         let user = await Auth.currentAuthenticatedUser()
//         setCurrentUser(user)
//       } catch {
//         setCurrentUser(null)
//       }
//     }
//     Hub.listen('auth', updateUser) // listen for login/signup events
//     updateUser() // check manually the first time because we won't get a Hub event
//     return () => Hub.remove('auth', updateUser) // cleanup
//   }, [])
//   if (currentUser) {
//     return (props) => (
//       <Flex width="100%" flexDirection="column">
//         <Flex
//           position="absolute" 
//           top="0"
//           right="0"
//           paddingX="2em"
//           paddingY="2em"
//           alignItems="center"
//           color="white">
//           <Button zIndex={3} marginLeft="5px" size="sm" onClick={logout}>
//           Sign out
//           </Button>
//         </Flex>
//         <WrappedComponent {...props} />
//       </Flex>
//     )
//   }
//   return () => (
//     <Box w="100%" h="100%" bgColor="transparent">
//       <VStack width="100%" flexDirection="column">
//         <Box pos="absolute" w="100%" h="100%" overflow="hidden">
//           <div className="multi-background"></div>
//         </Box>
//         <Box pos="absolute" mt="96px" ml="60px" w="700px" zIndex="1" >
//           <H3Heading color="black" fontSize="2.5em" lineHeight="44px" textAlign="center">
//           Welcome to <br/> Remote Learning Platform
//           </H3Heading>
//         </Box>
//         {/*<Box display={{ base: 'none', lg: 'block' }} pos="absolute" bottom="0" left="0" mb="96px" ml="165px" w="500px" zIndex="1" >*/}
//         {/*  <Clock />*/}
//         {/*</Box>*/}
//         <Flex width="100%" flexDirection="row-reverse">
//           <div id='spacer'></div>
//           <AmplifyAuthenticator />
//         </Flex>
//       </VStack>
//     </Box>
//   )
// }


import { Button, Flex, Stack, Image, } from '@chakra-ui/react'

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
    <Stack minH={'90vh'} direction={{ base: 'column', md: 'row' }} maxH='99.99vh' overflow={{ base: 'scroll', md: 'hidden' }} >
      <Flex p={8} align={'center'} justify={'center'}>
        <Stack w={'full'} maxW={'md'}>
          <H3Heading color="black" fontSize="2.5em" textAlign="center" mt='200px' mb='0'>
            Welcome to <br/> Remote Learning Platform
          </H3Heading>
          <AmplifyAuthenticator />
        </Stack>
      </Flex>
      <Flex >
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={'./images/shutterstock_1642992973.jpg'}
        />
      </Flex>
    </Stack>
  )
}
