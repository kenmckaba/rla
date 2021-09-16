import React, { useState, useEffect } from 'react'
import {
  Input,
  FormControl,
  FormLabel,
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  IconButton,
  Spacer,
  HStack,
  Button,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router-dom'
const O1LoginModal = ({ isModalOpen, onModalClose, isLogin }) => {
  let history = useHistory()
  const openDashboardPage = () => {
    history.push('/dashboard')
  }

  return (
    <>
      <Modal isOpen={isModalOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent color="darkKnight.700">
          <ModalHeader>
            <Flex>
              <Box>{isLogin ? 'Login' : 'Register'}</Box>
              <Spacer></Spacer>
              <Box>
                <IconButton
                  variant="icon-button"
                  aria-label="Close form"
                  icon={<CloseIcon boxSize={3} />}
                  onClick={onModalClose}
                />
              </Box>
            </Flex>
          </ModalHeader>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel fontWeight="bold" mt="0">
                User ID
              </FormLabel>
              <Input
                autoFocus
                maxLength="25"
                variant="filled"
                /*                 value={title}
                onChange={onChangeTitle} */
                placeholder="Type here"
              />
            </FormControl>
            <FormControl mt="4" isRequired>
              <FormLabel fontWeight="bold" mt="0">
                PASSWORD
              </FormLabel>
              <Input
                variant="filled"
                type="password"
                /*                 value={title}
                onChange={onChangeTitle} */
                placeholder="Type here"
              />
            </FormControl>
            {!isLogin && (
              <FormControl mt="4">
                <FormLabel fontWeight="bold">Name</FormLabel>
                <Input
                  maxLength="25"
                  variant="filled"
                  /*                 value={description}
                onChange={onChangeDescription} */
                  placeholder="Optional"
                />
              </FormControl>
            )}
            <HStack spacing="3" marginBlock="3">
              <Button w="100%" variant="outline" onClick={onModalClose}>
                Cancel
              </Button>
              <Button onClick={() => openDashboardPage()} w="100%">
                {isLogin ? 'Login' : 'Sign Up'}
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default O1LoginModal
