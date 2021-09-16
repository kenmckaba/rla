import { Button, Icon, Grid } from '@chakra-ui/react'
import { IoPlay } from 'react-icons/io5'
import { EditIcon } from '@chakra-ui/icons'

//TODO: Export to an organism/molecule file
export const TrainingToolbar = ({ startTraining, editTraining }) => {
  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Button
          onClick={editTraining}
          variant="secondary-ghost-outline"
          size="sm"
          leftIcon={<EditIcon />}
        >
          Edit
        </Button>
        <Button
          onClick={startTraining}
          variant="primary-trueblue"
          size="sm"
          leftIcon={<Icon as={IoPlay} />}
        >
          Start
        </Button>
      </Grid>
    </>
  )
}
