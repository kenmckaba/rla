import { Avatar, background, Tooltip } from '@chakra-ui/react'
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
        bg="rgba(255, 255, 255, 0.8)"
      />
    </Tooltip>
  )
}
