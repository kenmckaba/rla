import { useState } from 'react'
import Calendar from 'react-calendar'
import { Box } from '@chakra-ui/react'

const TrainingCalendar = ({ props }) => {
  const [value, onChange] = useState(new Date())

  return (
    <>
      <Box
        p={4}
        mr="16px"
        height="266px"
        width="22vw"
        bg="rgba(255, 255, 255, 0.1)"
        borderRadius="md"
        overflow="hidden"
        marginBottom="10px"
        fontSize="m"
        lineHeight="33px"
      >
        <Calendar onChange={onChange} value={value} />
      </Box>
    </>
  )
}

export default TrainingCalendar
