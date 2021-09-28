import TestVideoSetup from './TestVideoSetup'
import TrainingCalendar from './Calendar'
import { Flex } from '@chakra-ui/react'

const TrainingSidePanel = ({ date, trainingNum }) => {
  return (
    <>
      <Flex direction="column">
        <TrainingCalendar date={date} />
        <TestVideoSetup onJoinMeetingClick={trainingNum} />
      </Flex>
    </>
  )
}

export default TrainingSidePanel
