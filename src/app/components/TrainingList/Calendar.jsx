import { useState } from 'react'
import Calendar from 'react-calendar'
import { Box } from '@chakra-ui/react'
import './Calendar.css'

const TrainingCalendar = ({ props }) => {
  const [date, setDate] = useState(new Date())

  return (
    <>
      <Box
        mr="16px"
        height="266px"
        width="22vw"
        bg="rgba(255, 255, 255, 0.1)"
        borderRadius="md"
        overflow="hidden"
        marginBottom="10px"
        fontSize="0.7em"
        lineHeight="33px"
      >
        <Calendar calendarType="US" onChange={setDate} value={date} />
      </Box>
    </>
  )
}

export default TrainingCalendar
