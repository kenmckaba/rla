import { Avatar } from '@chakra-ui/avatar'
import { Badge, VStack } from '@chakra-ui/layout'
import React, { useState } from 'react'

export default function AttendeeAvatar({ attendee }) {
  const [showBadge, setShowBadge] = useState(false)
  return (
    <VStack margin="0" width="24px" overflowX="visible">
      <Avatar
        onMouseEnter={() => setShowBadge(true)}
        onMouseLeave={() => setShowBadge(false)}
        key={attendee.id}
        size="xs"
        name={attendee.name}
        color="white"
        bg="rgba(255, 255, 255, 0.25)"
      />
      {showBadge && (
        <Badge
          margin="0"
          color="white"
          background="rgba(0,0,0,0.5)"
          borderRadius="full"
        >
          {attendee.name}
        </Badge>
      )}
    </VStack>
  )
}
