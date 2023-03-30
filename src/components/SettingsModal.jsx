import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { Selections } from './Selections'
import { useBlueJeans, bjnApi } from '../bluejeans/useBlueJeans'

export default function SettingsModal({ isOpen, onClose }) {
  const { bjnAvailableCameras, bjnAvailableMicrophones, bjnSelectedCamera, bjnSelectedMicrophone } =
    useBlueJeans()

  const closeMe = () => {
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={closeMe} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex color="black" justifyContent="flex-start">
            Settings
          </Flex>
        </ModalHeader>
        <ModalBody color="#444444">
          <VStack align="start" spacing="4">
            <Box width="100%">
              <Text>Camera</Text>
              <Selections
                choices={bjnAvailableCameras}
                selectedId={bjnSelectedCamera?.id}
                changeSelection={bjnApi.selectCamera}
              />
            </Box>
            <Box width="100%">
              <Text>Microphone</Text>
              <Selections
                choices={bjnAvailableMicrophones}
                selectedId={bjnSelectedMicrophone?.id}
                changeSelection={bjnApi.selectMicrophone}
              />
            </Box>
            <HStack paddingBottom="2" width="100%" justifyContent="center">
              <Button width="194px" variant="primary-trueblue" onClick={closeMe}>
                <Text textTransform="capitalize">Close</Text>
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
