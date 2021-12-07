import React, { useState } from 'react'
import { Input, Button, FormControl, FormLabel, HStack, Box } from '@chakra-ui/react'
import { useMutation, gql } from '@apollo/client'
import { createAttendee, updateAttendee } from '../graphql/mutations'

const emptyAttendee = {
  name: '',
  email: '',
}

export const AttendeeForm = ({ trainingId, onClose, attendee = emptyAttendee }) => {
  const [name, setName] = useState(attendee.name)
  const [email, setEmail] = useState(attendee.email)
  const [addNewAttendee, { error }] = useMutation(gql(createAttendee))
  const [updateCurrentAttendee, { error: updateError }] = useMutation(gql(updateAttendee))

  if (error || updateError) {
    console.error('rla-log: AttendeeForm', error, updateError)
    return <p>Error!</p>
  }

  const onChangeName = (event) => {
    setName(event.target.value)
  }

  const onChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleSubmit = async () => {
    let result
    if (attendee.id) {
      result = await updateCurrentAttendee({
        variables: {
          input: {
            id: attendee.id,
            name: name,
            email: email,
            trainingId,
          },
        },
      })
      onClose(result.data.updateAttendee)
    } else {
      const result = await addNewAttendee({
        variables: {
          input: {
            name: name,
            email: email,
            trainingId,
            audioStateKey: 1,
            videoStateKey: 1,
          },
        },
      })
      onClose(result.data.createAttendee)
    }
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <>
      <Box>
        <FormControl pb="5" isRequired>
          <FormLabel>Name</FormLabel>
          <Input type="text" value={name} onChange={onChangeName} />
        </FormControl>

        <FormControl pb="5" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type="email" value={email} onChange={onChangeEmail} />
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
