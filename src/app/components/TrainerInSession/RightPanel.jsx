import { ChatPanel } from './RightPanel/ChatPanel'

export default function RightPanel({chatIsOpen, handleChatVisibility}) {
  return (
    <ChatPanel isOpen={chatIsOpen} handleChatVisibility={handleChatVisibility} />
  )
}
