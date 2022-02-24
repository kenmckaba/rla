import { useEffect, useState, useRef } from 'react'

export const useUnreadMsgCount = (chatMessages, chatIsOpen) => {
  const [unreadChatMsgCount, setUnreadMsgCount] = useState(0)
  const chatMsgCount = useRef(0)

  useEffect(() => {
    const newMsgCount = chatMessages.length
    if (chatIsOpen) {
      setUnreadMsgCount(0)
      chatMsgCount.current = newMsgCount
    } else {
      setUnreadMsgCount(newMsgCount - chatMsgCount.current)
    }
  }, [chatMessages, chatIsOpen])

  return unreadChatMsgCount
}
