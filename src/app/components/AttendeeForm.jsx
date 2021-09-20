import React, { useState } from 'react'
import { Input, Button, FormControl, FormLabel, HStack, Box } from '@chakra-ui/react'
import { useMutation, gql } from '@apollo/client'
import { createAttendee, updateAttendee } from '../../graphql/mutations'

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
          <FormLabel fontWeight="bold" textTransform="capitalize">
            Name
          </FormLabel>
          <Input
            placeholder="Type first & last name here"
            type="text"
            value={name}
            onChange={onChangeName}
          />
        </FormControl>

        <FormControl pb="5" isRequired>
          <FormLabel color="darkKnight.700" fontWeight="bold" textTransform="capitalize">
            Email address
          </FormLabel>
          <Input
            placeholder="Type email address here"
            type="email"
            value={email}
            onChange={onChangeEmail}
          />
        </FormControl>
      </Box>
      <HStack spacing="3" marginBlock="3">
        <Button w="100%" size="md" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button w="100%" size="md" onClick={handleSubmit}>
          Save
        </Button>
      </HStack>
    </>
  )
}
