import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import { useRef } from 'react'

export const ConfirmationModal = ({ headerMsg, msg, okLabel, isOpen, onCancel, onOk }) => {
  const cancelRef = useRef()
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onCancel}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader color="black" fontSize="lg" fontWeight="bold">
            {headerMsg}
          </AlertDialogHeader>

          <AlertDialogBody whiteSpace="pre-wrap" color="black">
            {msg}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCancel}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onOk} ml={3}>
              {okLabel}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
