import ChatBox from './ChatComponents/ChatBox'

export default function Chat(props) {

  const chat = [
    {
      senderName: 'Participant Name',
      type: 'incoming',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit'
    },
    {
      senderName: 'Participant Name',
      type: 'incoming',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit'
    },
    {
      senderName: 'Participant Name',
      type: 'incoming',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit'
    },
    {
      type: 'outgoing',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    }
  ]

  return (
    <ChatBox messageList={chat} />
  )
}
