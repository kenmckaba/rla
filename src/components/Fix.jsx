import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { Box, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { updateStudentGroup } from '../graphql/mutations'
import { listStudentGroups, listStudents } from '../graphql/queries'

export const Fix = () => {
  const [queryGroups, { data: groupListData }] = useLazyQuery(gql(listStudentGroups))
  const [getGroupStudents, { data: studentData }] = useLazyQuery(gql(listStudents))
  const [updateGroup] = useMutation(gql(updateStudentGroup))

  useEffect(() => {
    const processGroup = async (students) => {
      const numStudents = students?.length || 0
      const groupId = students[0]?.id
      if (groupId !== undefined) {
        await updateGroup({
          variables: {
            input: {
              id: groupId,
              numStudents,
            },
          },
        })
      }
    }

    if (studentData) {
      const students = studentData.listStudents.items
      return processGroup(students)
    }
  }, [studentData, updateGroup])

  useEffect(() => {
    const fixGroups = async (groups) => {
      await Promise.all(
        groups.map(async (group) => {
          return getGroupStudents({
            variables: { limit: 1000, filter: { groupId: { eq: group.id } } },
          })
        }),
      )
    }

    if (groupListData) {
      const groups = groupListData.listStudentGroups.items
      fixGroups(groups)
    }
  }, [getGroupStudents, groupListData])

  const [inProgress, setInProgress] = useState(false)

  const go = async () => {
    setInProgress(true)
    await queryGroups()
    setInProgress(false)
  }

  return (
    <Box>
      <Button disabled={inProgress} onClick={go}>
        Go
      </Button>
    </Box>
  )
}
