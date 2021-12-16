// https://gist.github.com/baumandm/8665a34bc418574737847f7394f98bd9

import React, { forwardRef, useState} from 'react'
import ReactDatePicker from 'react-datepicker'
import { Box, InputGroup, InputRightElement, Input } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import 'react-datepicker/dist/react-datepicker.css'
import './date-picker.css'
import './filtered-date-picker.css'

const FilteredDatePicker = ({
  selectedDate,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  isClearable = false,
  showPopperArrow = false,
  ...props
}) => {

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const onChange = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  function handleCalendar() {
    setIsCalendarOpen(!isCalendarOpen)
    console.log(32)
  }

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <InputGroup>
      <Input
        pl="26px"
        pr="48px"
        bg="white"
        borderColor="blue.600"
        minW="188px"
        minH="37px"
        borderRadius="full"
        color="blue.600"
        fontSize="14px"
        placeholder='SORT BY: LATEST'
        onClick={onClick} ref={ref} value={value}
        _placeholder={{
          color: 'blue.600'
        }}>
      </Input>
      <InputRightElement pointerEvents='none' mr="12px" children={<ChevronDownIcon w="6" h="6" color='blue.600' />} />
    </InputGroup>
  ))
  
  return (
    <Box>
      <ReactDatePicker
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
              <span
                className={
                  'react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'
                }
              >
                {'<'}
              </span>
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
              <span
                className={
                  'react-datepicker__navigation-icon react-datepicker__navigation-icon--next'
                }
              >
                {'>'}
              </span>
            </button>
          </div>
        )}
        selected={selectedDate}
        onChange={onChange}
        isClearable={isClearable}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        showPopperArrow={showPopperArrow}
        monthsShown={2}
        onCalendarClose={() => handleCalendar}
        onCalendarOpen={() => handleCalendar}
        {...props}
      />
    </Box>
  )
}

export default FilteredDatePicker
