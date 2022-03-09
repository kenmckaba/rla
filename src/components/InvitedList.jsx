import { gql, useQuery } from '@apollo/client'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { listInvitedStudents } from '../graphql/queries'

export const InvitedList = ({ training }) => {
  const { data: invitedData, loading: invitedLoading } = useQuery(gql(listInvitedStudents), {
    fetchPolicy: 'cache-and-network',
    variables: { filter: { trainingId: { eq: training?.id } } },
  })
  const [invited, setInvited] = useState([])

  useEffect(() => {
    if (invitedData) {
      setInvited(invitedData.listInvitedStudents.items)
    }
  }, [invitedData])

  if (invitedLoading) {
    return <p>Loading...</p>
  }

  const toTime = (date) => {
    return date ? new Date(date).toLocaleString() : '-'
  }

  return (
    <Table size="sm" variant="striped">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Invited</Th>
          <Th>Registered</Th>
          <Th>Registered as</Th>
          <Th>Email</Th>
        </Tr>
      </Thead>
      <Tbody>
        {invited.length === 0 ? (
          <Tr>
            <Td>*none*</Td>
          </Tr>
        ) : (
          invited.map((student) => {
            return (
              <Tr>
                <Td>{student.name}</Td>
                <Td>{student.email}</Td>
                <Td>{toTime(student?.createdAt)}</Td>
                <Td>{toTime(student?.attendee?.createdAt)}</Td>
                <Td>{student.attendee?.name || '-'}</Td>
                <Td>{student.attendee?.email || '-'}</Td>
              </Tr>
            )
          })
        )}
      </Tbody>
    </Table>
  )
}
