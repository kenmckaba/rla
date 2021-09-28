import { Button, Icon, Box } from '@chakra-ui/react'
import { IoPlay } from 'react-icons/io5'
import { EditButton } from '../shared/Buttons'
import { DeleteIcon } from '@chakra-ui/icons'

export const TrainingToolbar = ({ startTraining, editTraining, deleteTraining }) => {
  return (
    <>
      <Box>
        <EditButton
          margin="5px"
          width="100px"
          border="1px solid #FFFFFF"
          borderRadius="500px"
          size="xs"
          onClick={deleteTraining}
          leftIcon={<Icon as={DeleteIcon} />}
        >
          Delete
        </EditButton>
        <EditButton
          margin="5px"
          width="100px"
          border="1px solid #FFFFFF"
          borderRadius="500px"
          size="xs"
          onClick={editTraining}
        >
          Edit
        </EditButton>
        <Button
          margin="5px"
          width="100px"
          border="1px solid #FFFFFF"
          borderRadius="500px"
          onClick={startTraining}
          variant="primary-trueblue"
          size="xs"
          leftIcon={<Icon as={IoPlay} />}
        >
          Start
        </Button>
      </Box>
    </>
  )
}
