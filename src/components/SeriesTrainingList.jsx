import React from 'react'
import { Table, Tr, Th, Td, Tbody, Thead, Box, Button, Flex, IconButton } from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'

export const SeriesTrainingList = ({ trainings = [], updateTraining, deleteTraining }) => {
  const startTraining = (e, training) => {
    e.stopPropagation()
    window.open(`/attendee/${training.id}`)
  }

  const deleteThisTraining = (e, training) => {
    e.stopPropagation()
    deleteTraining(training.id)
  }

  return (
    <Box borderRadius="6px" borderWidth="1px" borderColor="gray.200" mt="3">


      <Flex marginLeft="12px" marginTop="3px" justifyContent="space-between" float="right">
        <Button
          size="xs"
          marginRight="3px"
          rightIcon={<AddIcon />}
          variant="outline"
          onClick={() => updateTraining()}
        >
          Add a training
        </Button>
      </Flex>

      <Table size="sm">
        <Thead>
          <Tr>
            <Th w="12rem" pb="0">
              Title
            </Th>
            {/* <Th pb="0">Attended</Th> */}
            <Th pn="0"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {trainings.length === 0 ? (
            <Tr>
              <Td>*None*</Td>
            </Tr>
          ) : (
            trainings.map((training) => {
              return (
                <Tr key={training.id} cursor="pointer" onClick={() => updateTraining(training)}>
                  <Td fontSize="12" paddingLeft="16px">
                    {training.title}
                  </Td>
                  {/* <Td fontSize="12" paddingLeft="16px">
                    {attendee.joinedTime ? '✅' : ''}
                  </Td> */}
                  <Td fontSize="12" padding="0">
                    <IconButton
                      icon={<DeleteIcon />}
                      color="lightslategray"
                      background="white"
                      float="right"
                      size="xs"
                      height="14px"
                      onClick={(e) => deleteThisTraining(e, training)}
                    >
                      Join
                    </IconButton>
                  </Td>
                  <Td fontSize="12" paddingLeft="16px">
                    <Button
                      variant="outline"
                      float="right"
                      color="lightslategray"
                      size="xs"
                      height="14px"
                      onClick={(e) => startTraining(e, training)}
                    >
                      Start
                    </Button>
                  </Td>
                </Tr>
              )
            })
          )}
        </Tbody>
      </Table>
    </Box>
  )
}
