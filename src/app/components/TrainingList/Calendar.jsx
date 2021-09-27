import { useState } from 'react'
import Calendar from 'react-calendar'
import './Calendar.css'
import { Box } from '@chakra-ui/react'

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
        fontSize="13px"
        lineHeight="33px"
      >
        <Calendar onChange={setDate} value={date}></Calendar>
      </Box>
    </>
  )
}

export default TrainingCalendar
