import React, { useEffect, useState } from 'react'
import { H1Heading } from './shared/Heading'
import { Auth } from 'aws-amplify'
import { Button, HStack, Box } from '@chakra-ui/react'
import OurModal from './OurModal'
import { useDisclosure } from '@chakra-ui/hooks'
import { EmailListForm } from './EmailListForm'
import { PollsCatalog } from './PollsCatalog'
import SunBackground from './SunBackground'

export default function TrainingListHeader({ trainings }) {
  const [userName, setUserName] = useState()
  const [today, setToday] = useState(new Date())

  const { isOpen: isEmailsOpen, onOpen: onEmailsOpen, onClose: onEmailsClose } = useDisclosure()
  const { isOpen: isPollsOpen, onOpen: onPollsOpen, onClose: onPollsClose } = useDisclosure()
  useEffect(() => {
    Auth.currentUserInfo().then((info) => {
      setUserName(info?.username)
    })

    const timerID = setInterval(
      () => setToday(new Date()),
      1000
    )

    return () => {
      clearInterval(timerID)
    }
  }, [])

  const timestampAsDate = (dt) => new Date(+dt)
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
      const todayTraningsSorted = trainingsOfToday.sort((a, b) => a.scheduledTime - b.scheduledTime)
      const nextTraining = todayTraningsSorted.filter(
        (training) => +training.scheduledTime <= +today(),
      )[0]
      return nextTraining ? timestampToTime(nextTraining.scheduledTime) : 0
    }
    return 0
  }

  const hour = today.getHours()

  return (
    <>
      <SunBackground hour={hour}/>
      <Box marginBottom="20px" paddingTop="125px">
        <Box display="flex" justifyContent="center">
          <H1Heading>
        Good {`${hour < 12 && 'morning' || hour < 18 && 'afternoon' || 'evening'} ${userName}`}.
            <br />
            {nextTrainingOfToday() === 0
              ? 'You don\'t have any meetings today'
              : 'Your next meeting is scheduled at ' + nextTrainingOfToday()}
          </H1Heading>
        </Box>
        <HStack mb="25px">
          <Button size="xs" onClick={onEmailsOpen}>
          Manage email lists
          </Button>
          <Button size="xs" onClick={onPollsOpen}>
          Manage polls catalog
          </Button>
        </HStack>

        <OurModal isOpen={isEmailsOpen} header="Manage email lists">
          <EmailListForm onClose={onEmailsClose} />
        </OurModal>
        <PollsCatalog isOpen={isPollsOpen} onClose={onPollsClose} />
      </Box>
    </>
  )
}
