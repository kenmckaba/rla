import {
  Button,
  Icon,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuDivider,
  MenuList,
  MenuGroup,
  IconButton,
} from '@chakra-ui/react'
import { IoPlay } from 'react-icons/io5'
import { EditButton } from './shared/Buttons'
import { DeleteIcon, HamburgerIcon } from '@chakra-ui/icons'

export const TrainingToolbar = ({
  training,
  startTraining,
  editTraining,
  deleteTraining,
  trainingReport,
  invitedReport,
  duplicateTraining,
}) => {
  const eatEvent = (e, func) => {
    e.preventDefault()
    e.stopPropagation()
    func()
  }

  return (
    <>
      <Box>
        {training.type !== 'SERIES' &&
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              title="Options"
              icon={<HamburgerIcon />}
              variant="outline"
              border="none"
            />
            <MenuList>
              <MenuItem onClick={trainingReport}>Training report</MenuItem>
              <MenuItem onClick={invitedReport}>Invited students</MenuItem>
              <MenuItem onClick={duplicateTraining}>Duplicate training</MenuItem>
              <MenuItem onClick={deleteTraining}>Delete training</MenuItem>
            </MenuList>
          </Menu>
        } 
        {training.type === 'SERIES' &&
          <Button
            margin="5px"
            width="100px"
            borderRadius="full"
            size="xs"
            onClick={(e) => eatEvent(e, deleteTraining)}
          >
            Delete
          </Button>
        }
        <EditButton
          margin="5px"
          width="100px"
          borderRadius="full"
          size="xs"
          onClick={(e) => eatEvent(e, editTraining)}
        >
          Edit
        </EditButton>
        {training.type !== 'SERIES' &&
          <Button
            margin="5px"
            width="100px"
            borderRadius="full"
            onClick={(e) => eatEvent(e, startTraining)}
            variant="primary-trueblue"
            size="xs"
            leftIcon={<Icon as={IoPlay} />}
            isDisabled={new Date().toISOString().substr(0, 10) !== training.scheduledTime.substr(0, 10)}
          >
            Start
          </Button>
        }
      </Box>
    </>
  )
}
