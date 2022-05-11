import { gql, useQuery } from '@apollo/client'
import { Table, Tbody, Td, Th, Thead, Tr, Text, TableCaption } from '@chakra-ui/react'
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
  const [inPersonCount, setInPersonCount] = useState(0)
  const [onlineCount, setOnlineCount] = useState(0)

  useEffect(() => {
    if (invitedData) {
      const students = [...invitedData.listInvitedStudents.items]

      students.map((student) => {
        if (student.attendee?.classPreference === 'online') {
          setOnlineCount(onlineCount+1)
        }
        else if (student.attendee?.classPreference === 'inperson') {
          setInPersonCount(inPersonCount+1)
        }
      })

      students.sort((first, second) => {
        // if (first.attendee?.classPreference === 'online') {
        //   setOnlineCount(onlineCount+1)
        // }
        // else if (first.attendee?.classPreference === 'inperson') {
        //   setInPersonCount(inPersonCount+1)
        // }

        if (!second.attendee?.classPreference) {
          return -1 // first comes 1st
        }
        return first.attendee?.classPreference === 'online' ? -1 : 1 // if first == undefined or == 'inperson' then second comes 1st
      })

      setInvited(students)
    }
  }, [inPersonCount, invitedData, onlineCount])

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

  // const inPersonCounter= () => {
  //   setInPersonCount(inPersonCount + 1)
  // }
  // const onlineCounter= () => {
  //   setOnlineCount(onlineCount + 1)
  // }

  // const counter =(student) => {
  //   if(student.attendee?.classPreference === 'online'){
  //     setOnlineCount(onlineCount+1)
  //   }
  //   else if(student.attendee?.classPreference === 'inperson'){
  //     setInPersonCount(inPersonCount+1)
  //   }
  // }

  // if (invited.student?.attendee?.classPreference === 'online') {
  //   setOnlineCount(onlineCount+1)
  // }
  // else if (invited.student?.attendee?.classPreference === 'inperson') {
  //   setInPersonCount(inPersonCount+1)
  // }
  


  return (
    <Table size="sm" variant="striped">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Online ({onlineCount})</Th>
          <Th>In-Person ({inPersonCount})</Th>
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
            // if (student.attendee?.classPreference === 'online') {
            //   onlineCounter()
            // }
            // else if (student.attendee?.classPreference === 'inperson') {
            //   inPersonCounter()
            // }
            // counter(student)
            return ( 
              <Tr>
                <Td>{student.name}</Td>
                <Td>{student.email}</Td>
                <Td>{student.attendee?.classPreference === 'online' ?  <CheckMark /> : '' || ''}</Td>
                <Td>{student.attendee?.classPreference === 'inperson' ? <CheckMark /> : '' || ''}</Td>
                <Td>{toTime(student?.createdAt)}</Td>
                <Td>{toTime(student?.attendee?.createdAt)}</Td>
              </Tr>
            )
            
          })
        )}
        <Text>*Required no. of students in-person is {training.minInPersonAttendees}. Current no. of students registered in-person is {inPersonCount}</Text>
      </Tbody>
    </Table>
  )
}
