import React, { useEffect, useState } from 'react'
import { H1Heading } from './shared/Heading'
import { Auth } from 'aws-amplify'
import { Box } from '@chakra-ui/react'
import SunBackground from './SunBackground'
import useTodayDate from '../hooks/useTodayDate'

export default function TrainingListHeader({ trainings }) {
  const [userName, setUserName] = useState()
  const [hour, setHour] = useState()
  const today = useTodayDate()
  const capitalize = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : ''
  }
  useEffect(() => {
    Auth.currentUserInfo().then((info) => {
      setUserName(info?.username)
    })
  }, [])

  useEffect(() => {
    setHour(today.getHours())
  }, [today])

  const timestampAsDate = (dt) => new Date(dt)
  const timestampToTime = (dt) =>
    timestampAsDate(dt).getHours() + ':' + timestampAsDate(dt).getMinutes()

  const isToday = (training) => {
    const date = timestampAsDate(training.scheduledTime)
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const trainingsOfToday = trainings.filter((training) => isToday(training))

  const isThereATrainingToday = Array.isArray(trainingsOfToday) && trainingsOfToday.length

  const nextTrainingOfToday = () => {
    if (isThereATrainingToday) {
      const todayTraningsSorted = trainingsOfToday.sort((a, b) => b.scheduledTime - a.scheduledTime)
      const validTodays = todayTraningsSorted.filter(function(value, index, arr){ return !value.endedAt })
      const nextTraining = validTodays.filter(
        (training) => training.scheduledTime >= today.toISOString()
      )
      const theFirstTraining = nextTraining && nextTraining.length > 0 ? nextTraining[0]['scheduledTime'] : false
      return theFirstTraining ? timestampToTime(theFirstTraining) : 0
    }
    return 0
  }

  return (
    <>
      <SunBackground hour={hour}/>
      <Box paddingBottom={{'2xl': '1em', md:'2em', sm:'2.5em'}}>
        <Box display="flex" justifyContent="center">
          <H1Heading zIndex="1" textAlign="center">
        Good {`${hour < 12 && 'morning' || hour < 18 && 'afternoon' || 'evening'} ${capitalize(userName)}`}
            <br />
            {nextTrainingOfToday() === 0
              ? 'You don\'t have any meetings today'
              : 'Your next meeting is scheduled at ' + nextTrainingOfToday()}
          </H1Heading>
        </Box>
      </Box>
    </>
  )
}
