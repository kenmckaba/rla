import { gql, useMutation } from '@apollo/client'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Box, Button, Input, HStack, Link } from '@chakra-ui/react'
import { useState } from 'react'
import { updateTraining } from '../graphql/mutations'

export const TrainerWhiteboard = ({ trainingId, url, shared, editWhiteboard, onClose }) => {
  const [updateCurrentTraining] = useMutation(gql(updateTraining))
  const [urlValue, setUrlValue] = useState(url)

  const shareWhiteboard = (e) => {
    e.preventDefault()

    updateCurrentTraining({
      variables: {
        input: {
          id: trainingId,
          whiteboardUrl: urlValue,
          whiteboardShared: !shared,
        },
      },
    })
  }

  const handleChange = (e) => {
    setUrlValue(e.target.value)
  }

  return (
    <Box fontWeight="500" fontSize="14px" flex="1" textAlign="left">
      <Link href="https://www.mindmeister.com/folders" isExternal cursor="pointer">
        MindMeister site <ExternalLinkIcon marginBottom="3px" />
      </Link>
      <HStack marginTop="10px">
        <Input value={urlValue} onChange={handleChange} />
        <Button size="xs" marginLeft="3px" variant="outline" onClick={shareWhiteboard}>
          {shared ? 'Unshare' : 'Share'}
        </Button>
      </HStack>
      <Button onClick={onClose} float="right" marginTop="5px">
        Done
      </Button>
    </Box>
  )
}
