import { gql, useMutation } from '@apollo/client'
import { EditIcon } from '@chakra-ui/icons'
import { Box, Button, Link, Text } from '@chakra-ui/react'
import { updateSharedDoc } from '../graphql/mutations'

export const TrainerSharedDoc = ({ sharedDoc, editSharedDoc }) => {
  const [updateCurrentSharedDoc] = useMutation(gql(updateSharedDoc))

  const editThisSharedDoc = (e) => {
    e.preventDefault()
    editSharedDoc()
  }

  const shareDoc = (e) => {
    e.preventDefault()

    updateCurrentSharedDoc({
      variables: {
        input: {
          id: sharedDoc.id,
          shared: !sharedDoc.shared,
        },
      },
    })
  }

  return (
    <Box fontWeight="500" fontSize="14px" flex="1" textAlign="left" >
      <Button
        size="xs"
        marginLeft="3px"
        padding="1px"
        height="15px"
        variant="outline"
        marginRight="5px"
        onClick={shareDoc}
      >
        {sharedDoc.shared ? 'Unshare' : 'Share'}
      </Button>
      <Link href={sharedDoc.url} isExternal cursor="pointer">
        {sharedDoc.title}
      </Link>
      <Text fontWeight="light" display="inline" pl="10px" fontSize="10px" >{sharedDoc.type}</Text> 
      <EditIcon w={2} h={2} float="right" mt="6px" onClick={editThisSharedDoc} cursor="pointer" />
    </Box>
  )
}
