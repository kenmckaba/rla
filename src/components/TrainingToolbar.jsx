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
        <EditButton
          margin="5px"
          width="100px"
          borderRadius="full"
          size="xs"
          onClick={(e) => eatEvent(e, editTraining)}
        >
          Edit
        </EditButton>
        <Button
          margin="5px"
          width="100px"
          borderRadius="full"
          onClick={(e) => eatEvent(e, startTraining)}
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
