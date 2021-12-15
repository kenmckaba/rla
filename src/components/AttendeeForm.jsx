import React, { useState } from 'react'
import { Input, Button, FormControl, FormLabel, HStack, Box, Checkbox } from '@chakra-ui/react'
import { useMutation, gql } from '@apollo/client'
import { createAttendee, createInvitedStudent, updateAttendee } from '../graphql/mutations'
import { sendJoinEmail } from '../utils/sendJoinEmail'

const emptyAttendee = {
  name: '',
  email: '',
}

export const AttendeeForm = ({ training, onClose, attendee = emptyAttendee }) => {
  const [name, setName] = useState(attendee.name)
  const [email, setEmail] = useState(attendee.email)
  const [addNewAttendee, { error }] = useMutation(gql(createAttendee))
  const [updateCurrentAttendee, { error: updateError }] = useMutation(gql(updateAttendee))
  const [sendEmail, setSendEmail] = useState(attendee.name === '')
  const [addAttendeeInvitation] = useMutation(gql(createInvitedStudent))

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
            trainingId: training.id,
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
            trainingId: training.id,
            audioStateKey: 1,
            videoStateKey: 1,
          },
        },
      })
      await addAttendeeInvitation({
        variables: {
          input: {
            trainingId: training.id,
            timeSent: new Date().toISOString(),
            name,
            email,
          },
        },
      })
      if (sendEmail) {
        sendJoinEmail(result.data.createAttendee.id, name, email, training)
      }
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
      <HStack width="100%" mt="3" mb="3" justifyContent="space-between">
        {attendee.name === '' && (
          <Checkbox isChecked={sendEmail} onChange={(e) => setSendEmail(e.target.checked)}>
            Email join link
          </Checkbox>
        )}
        <Box>
          <Button size="md" onClick={handleSubmit}>
            Save
          </Button>
          <Button size="md" variant="outline" onClick={handleCancel} marginLeft="10px">
            Cancel
          </Button>
        </Box>
      </HStack>
    </>
  )
}
