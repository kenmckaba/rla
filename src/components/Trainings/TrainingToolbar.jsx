import { Button, Icon, Grid } from '@chakra-ui/react'
import { IoPlay } from 'react-icons/io5'
import { EditIcon } from '@chakra-ui/icons'
export const TrainingToolbar = ({ editTraining }) => {
  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Button
          onClick={editTraining}
          variant="secondary-ghost-outline"
          size="sm"
          leftIcon={<EditIcon />}
          minW="120px"
        >
          Edit
        </Button>
        <Button variant="primary-trueblue" size="sm" leftIcon={<Icon as={IoPlay} />} minW="120px">
          Start
        </Button>
      </Grid>
    </>
  )
}
