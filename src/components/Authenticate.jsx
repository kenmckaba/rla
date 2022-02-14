import { AmplifyAuthenticator } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify'
import { Button, Flex } from '@chakra-ui/react'
import { useHistory } from 'react-router'

export const Authenticate = () => {
  const history = useHistory()

  const logout = async () => {
    try {
      await Auth.signOut()
    } catch (error) {
      console.log('error signing out: ', error)
    }
  }

  return (
    <Flex width="100%" height="100%" alignItems="center" flexDirection="column">
      <AmplifyAuthenticator />
      <Flex position="absolute" top="14px" right="20px" alignItems="center" color="white">
        <Button marginLeft="5px" size="sm" onClick={logout}>
          Sign out
        </Button>
      </Flex>
      <Button onClick={() => history.push('/')}>Proceed!</Button>
    </Flex>
  )
}
