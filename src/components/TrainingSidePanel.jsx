import TrainingCalendar from './Calendar'
import { Flex } from '@chakra-ui/react'

const TrainingSidePanel = ({ date }) => {
  return (
    <>
      <Flex direction="column">
        <TrainingCalendar date={date} />
      </Flex>
    </>
  )
}

export default TrainingSidePanel
