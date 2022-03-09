import React, { useEffect, useState } from 'react'
import { H1Heading } from './shared/Heading'
import { Auth } from 'aws-amplify'
import {
  Box,
  VStack,
  IconButton,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuDivider,
  MenuList,
  MenuGroup,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import SunBackground from './SunBackground'
import useTodayDate from '../hooks/useTodayDate'
import OurModal from './OurModal'
import { useDisclosure } from '@chakra-ui/hooks'
import { EmailListForm } from './EmailListForm'
import { PollsCatalog } from './PollsCatalog'

export default function TrainingListHeader({ trainings }) {
  const [userName, setUserName] = useState()
  const [hour, setHour] = useState()
  const today = useTodayDate()
  const location = window.location.pathname

  const logout = async () => {
    try {
      await Auth.signOut()
    } catch (error) {
      console.log('error signing out: ', error)
    }
  }
  const capitalize = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : ''
  }
  const { isOpen: isEmailsOpen, onOpen: onEmailsOpen, onClose: onEmailsClose } = useDisclosure()
  const { isOpen: isPollsOpen, onOpen: onPollsOpen, onClose: onPollsClose } = useDisclosure()

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
      const validTodays = todayTraningsSorted.filter(function (value, index, arr) {
        return !value.endedAt
      })
      const nextTraining = validTodays.filter(
        (training) => training.scheduledTime >= today.toISOString(),
      )
      const theFirstTraining =
        nextTraining && nextTraining.length > 0 ? nextTraining[0]['scheduledTime'] : false
      return theFirstTraining ? timestampToTime(theFirstTraining) : 0
    }
    return 0
  }

  return (
    <>
      <SunBackground hour={hour} />
      <Flex
        position="absolute"
        top="-1.5"
        right="0"
        paddingX="2em"
        paddingY="2em"
        alignItems="center"
        color="white"
        zIndex={5}
      >
        {location === '/' && userName && (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              title="Options"
              icon={<HamburgerIcon />}
              borderRadius={'50%'} // remove to keep button a square
              bgGradient="linear-gradient(30deg, #283683 0%, #396AA1 100%, #283683 100%)"
            />
            <MenuList bgGradient="linear-gradient(0deg, #283683 0%, #396AA1 100%, #283683 100%)">
              <MenuGroup>
                <MenuItem _focus={{ color: '#283683', bg: 'white' }} onClick={onEmailsOpen}>
                  Manage email lists
                </MenuItem>
                <MenuItem _focus={{ color: '#283683', bg: 'white' }} onClick={onPollsOpen}>
                  Manage polls catalog
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup>
                <MenuItem _focus={{ bg: '#FF4E4E' }} onClick={logout}>
                  Sign Out
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        )}
      </Flex>
      <Box paddingBottom={{ '2xl': '1em', md: '2em', sm: '2.5em' }}>
        <VStack justifyContent="center" alignItems="center">
          <H1Heading zIndex="1" textAlign="center">
            Good{' '}
            {`${(hour < 12 && 'morning') || (hour < 18 && 'afternoon') || 'evening'} ${capitalize(
              userName,
            )}`}
            <br />
            {nextTrainingOfToday() === 0
              ? 'You don\'t have any meetings today'
              : 'Your next meeting is scheduled at ' + nextTrainingOfToday()}
          </H1Heading>
          <OurModal isOpen={isEmailsOpen} header="Manage email lists">
            <EmailListForm onClose={onEmailsClose} />
          </OurModal>
          <PollsCatalog isOpen={isPollsOpen} onClose={onPollsClose} />
        </VStack>
      </Box>
    </>
  )
}
