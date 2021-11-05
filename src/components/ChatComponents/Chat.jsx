import ChatBox from './ChatBox'

export default function Chat({ isOpen, messages, attendees, training, myAttendeeId }) {
  return (
    <ChatBox
      attendees={attendees}
      isOpen={isOpen}
      messageList={messages}
      training={training}
      myAttendeeId={myAttendeeId}
    />
  )
}
