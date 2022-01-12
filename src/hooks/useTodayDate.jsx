import { useEffect, useState } from 'react'

function useTodayDate() {
  const [today, setToday] = useState(new Date())
  useEffect(() => {
    const timerID = setInterval(
      () => setToday(new Date()),
      1000
    )

    return () => {
      clearInterval(timerID)
    }
  }, [])

  return today
}

export default useTodayDate