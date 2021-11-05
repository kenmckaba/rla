import {
  Box,
  Table,
  Tbody,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Center,
  Tr,
  Td,
  Thead,
  Th,
  chakra,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { scrollBarStyle } from '../theme/components/scrollbar'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import { ReactComponent as HandIcon } from '../assets/icons/hand-icon.svg'
import { ReactComponent as HandIcon2 } from '../assets/icons/hand-icon-2.svg'
import { ReactComponent as EyeIcon } from '../assets/icons/eye-icon.svg'
import { ReactComponent as EyeIconRed } from '../assets/icons/eye-icon-red.svg'
import { ReactComponent as CheckMark } from '../assets/icons/check-mark.svg'
import { ReactComponent as XMark } from '../assets/icons/x-mark.svg'

export const ClassRoster = ({ attendees, ...props }) => {
  const data = useMemo(
    () =>
      attendees.map((attendee) => {
        const attendeePresent = attendee.joinedTime && !attendee.leftTime
        const attendeeFacingCam = attendee.posePitch < 15 && attendee.poseYaw < 15
        return {
          name: attendee.name,
          checkIn: attendeePresent,
          eye: attendeeFacingCam,
          hand: attendee.handRaised,
        }
      }),
    [attendees],
  )

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: '',
        accessor: 'checkIn',
        sortType: 'basic',
        Cell: ({ value }) => <Center>{value ? <CheckMark /> : <XMark />}</Center>,
      },
      {
        Header: '',
        accessor: 'eye',
        Cell: ({ value }) => <Center>{value ? <EyeIcon /> : <EyeIconRed />}</Center>,
      },
      {
        Header: '',
        accessor: 'hand',
        Cell: ({ value }) => <Center>{value ? <HandIcon2 /> : <HandIcon />}</Center>,
      },
    ],
    [],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSortBy,
  )

  return (
    <Accordion allowMultiple width="100%" defaultIndex={0} allowToggle>
      <AccordionItem p={0} m={0} border="none">
        <AccordionButton p="2">
          <Box marginLeft="2" flex="1" textAlign="left" fontWeight="semibold" fontSize="0.9em">
            Attendees
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel overflowY="auto" padding="0" sx={scrollBarStyle}>
          {attendees.length !== 0 ? (
            <Table size="sm" width="100%" margin="0" {...getTableProps()}>
              <Thead borderBottom="1px" borderColor="#ffffff">
                {headerGroups.map((headerGroup) => (
                  <Tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <Th
                        color="white"
                        cursor={
                          column.Header === 'Name' || column.Header === 'Check-in'
                            ? 'pointer !important'
                            : 'auto !important'
                        }
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                      >
                        {column.render('Header')}
                        {column.Header === 'Name' ||
                          (column.Header === 'Check-in' && (
                            <chakra.span pl="4">
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <TriangleDownIcon aria-label="sorted descending" />
                                ) : (
                                  <TriangleUpIcon aria-label="sorted ascending" />
                                )
                              ) : null}
                            </chakra.span>
                          ))}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row)
                  return (
                    <Tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                      ))}
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          ) : (
            <Tr>
              <Td>*None*</Td>
            </Tr>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
