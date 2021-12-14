import { ReactComponent as MicMuted } from '../assets/icons/microphone-342-muted.svg'
import { ReactComponent as MicHardMuted } from '../assets/icons/microphone-342-hard-muted.svg'
import { ReactComponent as MicUnmuted } from '../assets/icons/microphone-342.svg'
import { ReactComponent as CamMuted } from '../assets/icons/webcam-muted.svg'
import { ReactComponent as CamHardMuted } from '../assets/icons/webcam-hardmuted.svg'
import { ReactComponent as Cam } from '../assets/icons/webcam.svg'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip,
  Portal,
  Box,
} from '@chakra-ui/react'

export const MicCamIcon = ({ hardMuted, isUnmuted, isMic, onClick }) => {
  const iconToUse = () => {
    if (isMic) {
      return hardMuted ? (
        <MicHardMuted />
      ) : isUnmuted ? (
        <MicUnmuted onClick={() => onClick('mute')} />
      ) : (
        <MicMuted onClick={() => onClick('unmute')} />
      )
    } else {
      return hardMuted ? (
        <CamHardMuted />
      ) : isUnmuted ? (
        <Cam onClick={() => onClick('mute')} />
      ) : (
        <CamMuted onClick={() => onClick('unmute')} />
      )
    }
  }

  if (hardMuted === undefined) {
    return (
      <Tooltip hasArrow label={`Mute ${isMic ? 'audio' : 'video'}`} placement="top">
        <Box width="24px">{iconToUse()}</Box>
      </Tooltip>
    )
  }

  return (
    <Menu>
      <Tooltip hasArrow label={`Mute ${isMic ? 'audio' : 'video'}`} placement="top">
        <MenuButton
          as={IconButton}
          icon={iconToUse()}
          variant="link"
          height="22px"
          maxHeight="22px"
          width="22px"
          minWidth="22px"
        />
      </Tooltip>
      <Portal>
        <MenuList minWidth="50px" color="black">
          <MenuItem onClick={() => onClick('hard')}>Hard mute</MenuItem>
          <MenuItem onClick={() => onClick('soft')}>Soft mute</MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  )
}
