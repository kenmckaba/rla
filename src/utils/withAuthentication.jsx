import { AmplifyAuthenticator } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify'
import { Button, Flex } from '@chakra-ui/react'
import './amplify-styles.css'

export const WithAuthentication = (WrappedComponent) => {
  const logout = async () => {
    try {
      await Auth.signOut()
    } catch (error) {
      console.log('error signing out: ', error)
    }
  }

  return (props) => (
    <Flex width="100%" flexDirection="column">
      <Flex width="100%" flexDirection="row-reverse">
        <div id='spacer'></div>
        <AmplifyAuthenticator />
      </Flex>
      <Flex
        position="absolute" 
        top="0"
        right="0"
        paddingX="2em"
        paddingY="2em"
        alignItems="center"
        color="white">
        <Button marginLeft="5px" size="sm" onClick={logout}>
          Sign out
        </Button>
      </Flex>
      <WrappedComponent {...props} />
    </Flex>
  )
}
