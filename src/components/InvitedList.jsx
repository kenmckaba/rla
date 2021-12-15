import { gql, useQuery } from '@apollo/client'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { listInvitedStudents } from '../graphql/queries'

export const InvitedList = ({ training }) => {
  const { data: invitedData } = useQuery(gql(listInvitedStudents), {
    variables: { filter: { trainingId: { eq: training?.id } } },
  })
  const [invited, setInvited] = useState([])

  useEffect(() => {
    if (invitedData) {
      setInvited(invitedData.listInvitedStudents.items)
    }
  }, [invitedData])

  return (
    <Table size="sm" variant="striped">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Invited</Th>
          <Th>Registered</Th>
        </Tr>
      </Thead>
      <Tbody>
        {invited.length === 0 ? (
          <Tr>
            <Td>*none*</Td>
          </Tr>
        ) : (
          invited.map((student) => {
            const invitedTime = new Date(student.createdAt).toLocaleString()
            const found = training.attendees.items.find((att) => att.email === student.email)
            const registeredTime = !found ? '' : new Date(found.createdAt).toLocaleString()
            return (
              <Tr>
                <Td>{student.name}</Td>
                <Td>{student.email}</Td>
                <Td>{invitedTime}</Td>
                <Td>{registeredTime}</Td>
              </Tr>
            )
          })
        )}
      </Tbody>
    </Table>
  )
}
