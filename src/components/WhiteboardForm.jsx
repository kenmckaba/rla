import React, { useState } from 'react'
import { Input, Button, FormControl, FormLabel, HStack, Box } from '@chakra-ui/react'
import { useMutation, gql } from '@apollo/client'
import { updateTraining } from '../graphql/mutations'

export const WhiteboardForm = ({ trainingId, onClose, url }) => {
  const [whiteboardUrl, setUrl] = useState(url || '')
  const [updateCurrentTraining, { error: updateError }] = useMutation(gql(updateTraining))

  if (updateError) {
    return <p>Error!</p>
  }

  const handleSubmit = async () => {
    updateCurrentTraining({
      variables: {
        input: {
          id: trainingId,
          whiteboardUrl,
        },
      },
    })
    onClose()
  }

  const onChangeUrl = (event) => {
    setUrl(event.target.value)
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <>
      <Box>
        <FormControl pb={1} isRequired>
          <FormLabel>URL</FormLabel>
          <Input
            type="url"
            value={whiteboardUrl}
            onChange={onChangeUrl}
            pattern="https://.*"
            placeholder="https://example.com"
            required
          />
        </FormControl>
      </Box>
      <HStack float="right" mt="3" mb="3">
        <Button size="md" onClick={handleSubmit}>
          Save
        </Button>
        <Button size="md" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
      </HStack>
    </>
  )
}
