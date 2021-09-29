import React from 'react'
import { H1Heading } from '../shared/Heading'

export default function TrainingListHeader({ trainings }) {
  const timestampAsDate = (dt) => new Date(+dt)
  const timestampToTime = dt => timestampAsDate(dt).getHours() + ':' + timestampAsDate(dt).getMinutes()
  const today = () => new Date()

  const isToday = training => {
    const date = timestampAsDate(training.scheduledTime)


    return date.getDate() === today().getDate() &&
      date.getMonth() === today().getMonth() &&
      date.getFullYear() === today().getFullYear()
  }

  const trainingsOfToday = trainings.filter(training => isToday(training))

  const isThereATrainingToday = Array.isArray(trainingsOfToday) && trainingsOfToday.length

  const nextTrainingOfToday = () => {
    if (isThereATrainingToday) {
      const todayTraningsSorted = trainingsOfToday.sort((a, b) => a.scheduledTime - b.scheduledTime)
      const nextTraining = todayTraningsSorted.filter(training => +training.scheduledTime <= +today())[0]
      return nextTraining ? timestampToTime(nextTraining.scheduledTime) : 0
    }
    return 0
  }

  return (
    <H1Heading mb="24">
      Good afternoon Ken.<br />
      {nextTrainingOfToday() === 0 ? 'You don\'t have any meetings today' : 'Your next meeting is scheduled at ' + nextTrainingOfToday()}
    </H1Heading>
  )
}
