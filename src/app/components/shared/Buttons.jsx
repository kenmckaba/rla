import { Button } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'

export const EditButton = ({ children, onClick, icon = <EditIcon />, ...props }) => (
  <Button
    onClick={onClick}
    variant="secondary-ghost-outline"
    leftIcon={icon}
    {...props}
  >
    {children}
  </Button>
)

export const PrimaryButton = ({ children, onClick, ...props }) => (
  <Button
    onClick={onClick}
    variant="primary-button"
    {...props}
  >
    {children}
  </Button>
)
