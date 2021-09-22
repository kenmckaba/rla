import { Button, Icon, Grid } from '@chakra-ui/react'
import { IoPlay } from 'react-icons/io5'
import { EditButton } from '../shared/Buttons'

export const TrainingToolbar = ({ startTraining, editTraining }) => {
  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <EditButton
          size="sm"
          onClick={editTraining}
        >
          Edit
        </EditButton>
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
