import React, { useMemo, useState } from 'react'
import { Table, Tr, Th, Td, Tbody, Thead, Button, Flex, useDisclosure } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { SharedDocModal } from './SharedDocModal'
import { updateSharedDoc } from '../graphql/mutations'
import { gql, useMutation } from '@apollo/client'

export const SharedDocs = ({ trainingId, sharedDocs, trainerMode, saveTraining }) => {
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const [currentSharedDoc, setCurrentSharedDoc] = useState()
  const [updateCurrentSharedDoc] = useMutation(gql(updateSharedDoc))

  const addSharedDoc = () => {
    // if (saveTraining) {
    //   saveTraining()
    // }
    setCurrentSharedDoc(null)
    onModalOpen()
  }

  const docs = useMemo(() => {
    const editSharedDoc = (sharedDoc) => {
      setCurrentSharedDoc(sharedDoc)
      onModalOpen()
    }

    const buttonTitle = (sharedDoc) => {
      if (trainerMode) {
        return sharedDoc.shared ? 'Unshare' : 'Share'
      }
      return 'Open'
    }

    const handleShare = (e, doc) => {
      e.preventDefault()
      e.stopPropagation()

      if (trainerMode) {
        updateCurrentSharedDoc({
          variables: {
            input: {
              id: doc.id,
              shared: !doc.shared,
            },
          },
        })
      } else {
        window.open(doc.url)
      }
    }

    let docs
    if (trainerMode) {
      docs = sharedDocs
    } else {
      docs = sharedDocs.reduce((acc, sd) => {
        if (sd.shared) {
          acc.push(sd)
        }
        return acc
      }, [])
    }
    if (docs.length === 0) {
      return (
        <Tr>
          <Td>*None*</Td>
        </Tr>
      )
    }
    return docs.map((sharedDoc) => {
      return (
        <Tr key={sharedDoc.id} cursor="pointer" onClick={() => editSharedDoc(sharedDoc)}>
          <Td fontSize="12" paddingLeft="16px">
            {sharedDoc.title}
          </Td>
          <Td fontSize="12" paddingLeft="16px">
            {sharedDoc.type}
          </Td>
          <Td>
            <Button
              size="xs"
              float="right"
              marginLeft="3px"
              variant="outline"
              marginRight="0"
              onClick={(e) => handleShare(e, sharedDoc)}
            >
              {buttonTitle(sharedDoc)}
            </Button>
          </Td>
        </Tr>
      )
    })
  }, [sharedDocs, trainerMode, updateCurrentSharedDoc, onModalOpen])

  return (
    <>
      <Flex marginLeft="12px" marginTop="3px" justifyContent="space-between" float="right">
        {trainerMode && (
          <Button
            size="xs"
            marginRight="3px"
            rightIcon={<AddIcon />}
            variant="outline"
            onClick={addSharedDoc}
          >
            Add a document
          </Button>
        )}
      </Flex>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th w="12rem" pb="0">
              Title
            </Th>
            <Th pb="0">Type</Th>
          </Tr>
        </Thead>
        <Tbody>{docs}</Tbody>
      </Table>

      <SharedDocModal
        onClose={onModalClose}
        sharedDoc={currentSharedDoc}
        isOpen={isModalOpen}
        trainingId={trainingId}
      />
    </>
  )
}
