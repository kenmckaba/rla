import React, { useState } from 'react'
import { Input, Button, FormControl, FormLabel, HStack, Box, Select } from '@chakra-ui/react'
import { useMutation, gql } from '@apollo/client'
import { createSharedDoc, updateSharedDoc } from '../graphql/mutations'

export const SharedDocForm = ({ trainingId, onClose, sharedDoc }) => {
  const [title, setTitle] = useState(sharedDoc?.title || '')
  const [url, setUrl] = useState(sharedDoc?.url || '')
  const [type, setType] = useState(sharedDoc?.type || '')
  const [addNewSharedDoc, { error }] = useMutation(gql(createSharedDoc))
  const [updateCurrentSharedDoc, { error: updateError }] = useMutation(gql(updateSharedDoc))

  if (error || updateError) {
    console.error('rla-log: error', error)
    return <p>Error!</p>
  }

  const onChangeTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleSubmit = async () => {
    if (sharedDoc?.id) {
      updateCurrentSharedDoc({
        variables: {
          input: {
            id: sharedDoc.id,
            title,
            trainingId,
            type,
            url,
          },
        },
      })
      onClose()
    } else {
      await addNewSharedDoc({
        variables: {
          input: {
            title,
            trainingId,
            type,
            url,
          },
        },
      })
      onClose()
    }
  }

  const onChangeUrl = (event) => {
    setUrl(event.target.value)
  }

  const onChangeType = (event) => {
    setType(event.target.value)
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <>
      <Box>
        <FormControl pb={1} isRequired>
          <FormLabel>Title</FormLabel>
          <Input type="text" value={title} onChange={onChangeTitle} placeholder="Required" />
        </FormControl>
        <FormControl pb={1} isRequired>
          <FormLabel>URL</FormLabel>
          <Input
            type="url"
            value={url}
            onChange={onChangeUrl}
            pattern="https://.*"
            placeholder="https://example.com"
            required
          />
        </FormControl>
        <FormControl pb={1}>
          <FormLabel>Type</FormLabel>
          <Select placeholder="Select Option" value={type} onChange={onChangeType}>
            <option value="[Website]">Website</option>
            <option value="[Document]">Document</option>
            <option value="[Folder]">Folder</option>
            <option value="[Image]">Image</option>
            <option value="[Spreadshee]">Spreadsheet</option>
            <option value="[Other]">Other</option>
          </Select>
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
