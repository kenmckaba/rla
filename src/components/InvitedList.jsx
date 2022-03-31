import { gql, useQuery } from '@apollo/client'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { buildSubscription } from 'aws-appsync'
import { useEffect, useState } from 'react'
import { listInvitedStudents } from '../graphql/queries'
import { onCreateInvitedStudent, onUpdateInvitedStudent } from '../graphql/subscriptions'
import { ReactComponent as CheckMark } from '../assets/icons/check-mark.svg'

export const InvitedList = ({ training }) => {
  const {
    data: invitedData,
    loading: invitedLoading,
    subscribeToMore,
  } = useQuery(gql(listInvitedStudents), {
    variables: { limit: 1000, filter: { trainingId: { eq: training?.id } } },
  })
  const [invited, setInvited] = useState([])

  useEffect(() => {
    if (invitedData) {
      const students = [...invitedData.listInvitedStudents.items]
      const sorted = students.sort((first, second) => {
        return first.attendee?.classPreference === 'online' ? first : second
      })
      setInvited(sorted)
      // setInvited(invitedData.listInvitedStudents.items)
    }
  }, [invitedData])

  useEffect(() => {
    if (subscribeToMore) {
      const cleanupFuncs = [
        subscribeToMore(buildSubscription(gql(onCreateInvitedStudent), gql(listInvitedStudents))),
        subscribeToMore(buildSubscription(gql(onUpdateInvitedStudent), gql(listInvitedStudents))),
      ]
      return () => {
        cleanupFuncs.forEach((func) => func && func())
      }
    }
  }, [subscribeToMore])

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
          <Th>Online</Th>
          <Th>In-Person</Th>
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
            return (
              <Tr>
                <Td>{student.name}</Td>
                <Td>{student.email}</Td>

                <Td>{student.attendee?.classPreference === 'online' ? <CheckMark /> : '' || ''}</Td>
                <Td>
                  {student.attendee?.classPreference === 'inperson' ? <CheckMark /> : '' || ''}
                </Td>
                <Td>{toTime(student?.createdAt)}</Td>
                <Td>{toTime(student?.attendee?.createdAt)}</Td>
              </Tr>
            )
          })
        )}
      </Tbody>
    </Table>
  )
}
