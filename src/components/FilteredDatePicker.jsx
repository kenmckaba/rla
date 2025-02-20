// https://gist.github.com/baumandm/8665a34bc418574737847f7394f98bd9

import React, { forwardRef, useState } from 'react'
import ReactDatePicker, { CalendarContainer } from 'react-datepicker'
import { Box, InputGroup, InputRightElement, Input, HStack, StackDivider } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import 'react-datepicker/dist/react-datepicker.css'
import './date-picker.css'
import './filtered-date-picker.css'

const FilteredDatePicker = ({
  selectedDate,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  setDisabledTabs,
  showPopperArrow = false,
  ...props
}) => {

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const onChange = (dates) => {
    const [start, end] = dates
    !start && !end ? setDisabledTabs(false) : setDisabledTabs(true)
    setStartDate(start)
    end ? setEndDate(end.setHours(23,59,59)) : setEndDate(null)
  }

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <InputGroup>
      <Input
        pl="26px"
        pr="48px"
        bg="white"
        borderColor="blue.600"
        minH="37px"
        borderRadius="full"
        color="blue.600"
        fontSize="14px"
        cursor="pointer"
        w="100%"
        placeholder={isCalendarOpen ? 'FROM:' : 'SORT BY: LATEST' }
        onClick={onClick} ref={ref} value={value && `FROM: ${new Intl.DateTimeFormat('en-US', {day: 'numeric', month: 'numeric', year: '2-digit'}).format(startDate)}      TO: ${endDate ? new Intl.DateTimeFormat('en-US', {day: 'numeric', month: 'numeric', year: '2-digit'}).format(endDate) : ''}`}
        _placeholder={{
          color: 'blue.600'
        }}>
      </Input>
      <InputRightElement pointerEvents='none' mr="1.5em" children={
        isCalendarOpen ? <ChevronUpIcon w="6" h="6" color='blue.600' /> : <ChevronDownIcon w="6" h="6" color='blue.600' />
      } />
    </InputGroup>
    
  ))

  const MyContainer = ({ className, children }) => {
    return (
      <Box pos="relative" top="10px" right="25%">
        <CalendarContainer className={className}>
          <HStack py={4} align="start" divider={<StackDivider borderColor='gray.200' />} pos="relative">
            {children}
          </HStack>
        </CalendarContainer>
      </Box>
    )
  }

  const renderDayContents = (day, date) => {
    return (Date.parse(date) === Date.parse(startDate) || Date.parse(date) === Date.parse(endDate)) ? (<Box color="white" borderRadius='full' bgColor="blue.600">
      {day}
    </Box>) : (<Box>{day}</Box>)
  }

  return (
    <Box w={isCalendarOpen || startDate ? '273px' : '188px' } mr="10px">
      <ReactDatePicker
        calendarContainer={MyContainer}
        customInput={<ExampleCustomInput />}
        renderCustomHeader={({
          monthDate,
          customHeaderCount,
          decreaseMonth,
          increaseMonth,
        }) => (
          <div>
            <button
              aria-label="Previous Month"
              className={
                'react-datepicker__navigation react-datepicker__navigation--previous'
              }
              style={customHeaderCount === 1 ? { visibility: 'hidden' } : null}
              onClick={decreaseMonth}
            >
              <ChevronLeftIcon h={6} w={6} color="blue.600" className='react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'
              />
            </button>
            <span className="react-datepicker__current-month">
              {monthDate.toLocaleString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <button
              aria-label="Next Month"
              className={
                'react-datepicker__navigation react-datepicker__navigation--next'
              }
              style={customHeaderCount === 0 ? { visibility: 'hidden' } : null}
              onClick={increaseMonth}
            >
              <ChevronRightIcon h={6} w={6} color="blue.600" className='react-datepicker__navigation-icon react-datepicker__navigation-icon--next'
              />
            </button>
          </div>
        )}
        renderDayContents={renderDayContents}
        selected={selectedDate}
        onChange={onChange}
        isClearable={startDate}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        showPopperArrow={showPopperArrow}
        monthsShown={2}
        onCalendarClose={() => setIsCalendarOpen(false)}
        onCalendarOpen={() => setIsCalendarOpen(true)}
        {...props}
      />
    </Box>
  )
}

export default FilteredDatePicker
