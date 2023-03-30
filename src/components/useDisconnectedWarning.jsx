import { useToast } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useBlueJeans } from '../bluejeans/useBlueJeans'

export const useDisconnectedWarning = (ended) => {
  const { bjnConnectionState } = useBlueJeans()
  const toast = useToast()
  const wasConnected = useRef(false)
  const [errorState, setErrorState] = useState(false)

  useEffect(() => {
    if (ended) {
      setErrorState(false)
    } else if (bjnConnectionState === 'CONNECTED') {
      setErrorState(false)
      wasConnected.current = true
    } else if (wasConnected.current) {
      // ignore initial 'connecting' etc.
      setErrorState(true)
    }
  }, [bjnConnectionState, ended])

  useEffect(() => {
    if (errorState) {
      toast({
        title: 'Disconnected',
        description: 'You\'ve lost connection to our servers. Retrying...',
        status: 'warning',
        duration: null,
      })
    } else {
      toast.closeAll()
    }
  }, [errorState, toast])
}
