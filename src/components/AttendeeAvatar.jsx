import { Avatar } from '@chakra-ui/avatar'
import { Tooltip } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function AttendeeAvatar({ attendee }) {
  return (
    <Tooltip label={attendee.name}>
      <Avatar
        key={attendee.id}
        size="xs"
        name={attendee.name}
        color="blue.600"
        fontWeight="bold"
        bg="rgba(13, 98, 197, 0.1)"
      />
    </Tooltip>
  )
}
