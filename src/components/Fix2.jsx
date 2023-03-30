import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { Center, Button, VStack, Text, Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { updateStudentGroup } from '../graphql/mutations'

const listStudentGroups = /* GraphQL */ `
  query ListStudentGroups($filter: ModelStudentGroupFilterInput, $limit: Int, $nextToken: String) {
    listStudentGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
      }
      nextToken
    }
  }
`

const listStudents = /* GraphQL */ `
  query ListStudents($filter: ModelStudentsFilterInput, $limit: Int, $nextToken: String) {
    listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
      }
      nextToken
    }
  }
`

export const Fix2 = () => {
  const [getGroups] = useLazyQuery(gql(listStudentGroups))
  const [getStudents] = useLazyQuery(gql(listStudents))
  const [updateGroup] = useMutation(gql(updateStudentGroup))
  const [groups, setGroups] = useState([])
  const [inProgress, setInProgress] = useState(false)

  useEffect(() => {
    const processStudents = async () => {
      const group = groups[0]
      if (!group) {
        setInProgress(false)
        return
      }
      const result = await getStudents({
        variables: {
          limit: 1000,
          filter: { groupId: { eq: group.id } },
        },
      })
      const students = result.data.listStudents.items
      console.log('@ken students', students.length)
      const numStudents = students?.length || 0
      await updateGroup({
        variables: {
          input: {
            id: group.id,
            numStudents,
          },
        },
      })
      setGroups((prev) => prev.filter((g) => g.id !== group.id))
    }
    processStudents()
  }, [groups, getStudents, updateGroup])

  const go = async () => {
    setInProgress(true)
    const result = await getGroups()
    setGroups(result.data.listStudentGroups.items)
  }

  return (
    <Center>
      <VStack color="black">
        <Text>Updates email groups' student count</Text>
        <Button isDisabled={!!inProgress} onClick={go}>
          Go
        </Button>
        {inProgress && <Text>Procesing group {groups.length}</Text>}
        {groups.map((group) => {
          return (
            <Box key={group.id}>
              {group.name} ({group.numStudents})
            </Box>
          )
        })}
      </VStack>
    </Center>
  )
}
