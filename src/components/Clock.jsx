import React, { useState, useEffect } from 'react'
import { H1Heading, H3Heading } from '../components/shared/Heading'
import useTodayDate from '../hooks/useTodayDate'

function Clock() {
  const today = useTodayDate()
  const [time, setTime] = useState(null)
  const [date, setDate] = useState(null)

  useEffect(() => {
    setTime(new Intl.DateTimeFormat('en-GB', {timeStyle: 'short'}).format(today))
    setDate(new Intl.DateTimeFormat('en-GB', {weekday: 'long', day: '2-digit', month: 'long'}).format(today))
  }, [today])

  return(
    <>
      <H1Heading fontSize="10em" lineHeight="183px" textAlign="center">
        {time}
      </H1Heading>
      <H3Heading color="white" fontSize="3.3em" lineHeight="58px" textAlign="center">
        {date}
      </H3Heading>
    </>
  )
}

export default Clock