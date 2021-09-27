import { useState } from 'react'
import Calendar from 'react-calendar'
<<<<<<< HEAD
import './Calendar.css'
import { Box } from '@chakra-ui/react'

const TrainingCalendar = ({ props }) => {
  const [date, setDate] = useState(new Date())
=======
import { Box } from '@chakra-ui/react'

const TrainingCalendar = ({ props }) => {
  const [value, onChange] = useState(new Date())
>>>>>>> develop

  return (
    <>
      <Box
<<<<<<< HEAD
=======
        p={4}
>>>>>>> develop
        mr="16px"
        height="266px"
        width="22vw"
        bg="rgba(255, 255, 255, 0.1)"
        borderRadius="md"
        overflow="hidden"
        marginBottom="10px"
<<<<<<< HEAD
        fontSize="13px"
        lineHeight="33px"
      >
        <Calendar onChange={setDate} value={date}></Calendar>
=======
        fontSize="m"
        lineHeight="33px"
      >
        <Calendar onChange={onChange} value={value} />
>>>>>>> develop
      </Box>
    </>
  )
}

export default TrainingCalendar
