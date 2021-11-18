import { Box, HStack, Button, Table, Thead, Tr, Td, Th, Tbody, Checkbox } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'

export const EmailSelection = ({ students: studentsIn, onSelectedStudents }) => {
  const [itemsChecked, setItemsChecked] = useState([])

  const students = useMemo(() => {
    const sorted = [...studentsIn]
    sorted.sort((first, second) => (first.firstName > second.firstName ? 1 : -1))
    return sorted
  }, [studentsIn])

  const onCheckbox = (e, index) => {
    console.log(itemsChecked)
    const isChecked = e.target.checked
    if (isChecked === undefined) {
      return
    }
    if (isChecked) {
      setItemsChecked((prev) => [...prev, index])
    } else {
      setItemsChecked((prev) => prev.filter((c) => c !== index))
    }
  }

  useEffect(() => {
    const items = itemsChecked.reduce((acc, index) => {
      acc.push(students[index])
      return acc
    }, [])
    onSelectedStudents(items)
  }, [itemsChecked, students, onSelectedStudents])

  const selectAll = () => {
    const newItems = []
    for (let index = 0; index < students.length; index++) {
      newItems.push(index)
    }
    setItemsChecked(newItems)
  }

  const selectNone = () => {
    setItemsChecked([])
  }

  return (
    <>
      <HStack marginTop="10px">
        <Button size="xs" variant="link" onClick={selectAll}>
          Select all
        </Button>
        <Box width="10px" />
        <Button size="xs" variant="link" onClick={selectNone}>
          Clear all
        </Button>
      </HStack>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th pb="0"></Th>
            <Th pb="0">Name</Th>
            <Th pn="0">Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map((attendee, index) => {
            return (
              <Tr key={index}>
                <Td onClick={(e) => onCheckbox(e, index)}>
                  <Checkbox
                    onClick={(e) => onCheckbox(e, index)}
                    isChecked={itemsChecked.includes(index)}
                  />
                </Td>
                <Td>
                  {attendee.firstName} {attendee.lastName}
                </Td>
                <Td>{attendee.email}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </>
  )
}
