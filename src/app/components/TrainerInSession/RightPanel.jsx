import { ChatPanel } from './RightPanel/ChatPanel'

export default function RightPanel({handleShareDocumentsModalVisibility, chatIsOpen, handleChatVisibility}) {
  return (
    <ChatPanel
      isOpen={chatIsOpen}
      handleChatVisibility={handleChatVisibility}
      onAttachClick={handleShareDocumentsModalVisibility}/>
  )
}
