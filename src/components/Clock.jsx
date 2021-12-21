import React, { useState, useEffect } from 'react'
import { H1Heading, H3Heading } from '../components/shared/Heading'
import useTodayDate from '../hooks/useTodayDate'

function Clock() {
  const today = useTodayDate()
  const [hour, setHour] = useState(null)
  const [minutes, setMinutes] = useState(null)
  const [date, setDate] = useState(null)

  useEffect(() => {
    setHour(today.getHours())
    setMinutes(today.getMinutes())
    setDate(new Intl.DateTimeFormat('en-GB', {weekday: 'long', day: '2-digit', month: 'long'}).format(today))
  }, [today])

  return(
    <>
      <H1Heading fontSize="150px" lineHeight="183px" textAlign="center">
        {`${hour}:${minutes}`}
      </H1Heading>
      <H3Heading color="white" fontSize="48px" lineHeight="58px" textAlign="center">
        {date}
      </H3Heading>
    </>
  )
}

export default Clock