import React from 'react'
import { Table, Tr, Th, Td, Tbody, Thead, Box, Button, Flex, IconButton, Spacer } from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'

export const SeriesTrainingList = ({ trainings = [], addTraining, startTraining, deleteTraining }) => {

  const deleteThisTraining = (e, training) => {
    e.stopPropagation()
    deleteTraining(training.id)
  }

  return (
    <>
      {/* <Box borderRadius="6px" borderWidth="1px" borderColor="gray.200" mt="3"> */}
      <Flex marginLeft="2px" marginTop="3px" justifyContent="space-between" float="left">
        <Button
          size="xs"
          marginLeft="3px"
          rightIcon={<AddIcon />}
          variant="outline"
          onClick={() => addTraining()}
        >
            Add a training
        </Button>
      </Flex>

      <Table size="sm">
        <Thead>
          <Tr>
            <Th w="12rem" pb="0">
                Trainings
            </Th>
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
                <Tr key={training.id} cursor="pointer" onClick={() => addTraining(training)}>
                  <Td fontSize="12" paddingLeft="16px">
                    {training.title}
                  </Td>
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
                        Delete
                    </IconButton>
                  </Td>
                  <Td fontSize="12" paddingLeft="16px">
                    <Button
                      variant="outline"
                      float="right"
                      color="lightslategray"
                      size="xs"
                      height="14px"
                      onClick={(e) => startTraining(training)}
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
      {/* </Box> */}
    </>
  )
}
