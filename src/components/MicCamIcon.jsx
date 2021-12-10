import { ReactComponent as MicMuted } from '../assets/icons/microphone-342-muted.svg'
import { ReactComponent as MicHardMuted } from '../assets/icons/microphone-342-hard-muted.svg'
import { ReactComponent as MicUnmuted } from '../assets/icons/microphone-342.svg'
import { ReactComponent as CamMuted } from '../assets/icons/webcam-muted.svg'
import { ReactComponent as CamHardMuted } from '../assets/icons/webcam-hardmuted.svg'
import { ReactComponent as Cam } from '../assets/icons/webcam.svg'
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Tooltip, Portal } from '@chakra-ui/react'

export const MicCamIcon = ({ hardMuted, isUnmuted, isMic, onClick }) => {
  const iconToUse = () => {
    if (isMic) {
      return hardMuted ? <MicHardMuted /> : isUnmuted ? <MicUnmuted /> : <MicMuted />
    } else {
      return hardMuted ? <CamHardMuted /> : isUnmuted ? <Cam /> : <CamMuted />
    }
  }

  return (
    <Menu>
      <Tooltip hasArrow label="Mute all" placement="top">
        <MenuButton
          as={IconButton}
          icon={iconToUse()}
          variant="link"
          height="22px"
          width="22px"
          minWidth="22px"
        />
      </Tooltip>
      <Portal>
        <MenuList minWidth="50px" color="black">
          <MenuItem onClick={() => onClick('hard')}>Hard mute</MenuItem>
          <MenuItem onClick={() => onClick('soft')}>Soft mute</MenuItem>
        </MenuList>
      </Portal>{' '}
    </Menu>
  )
}
