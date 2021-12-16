// https://gist.github.com/baumandm/8665a34bc418574737847f7394f98bd9

import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { Box } from '@chakra-ui/react'
import 'react-datepicker/dist/react-datepicker.css'
import './date-picker.css'

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

  const onChange = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }
  return (
    <Box color="blue">
      <ReactDatePicker
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
        {...props}
      />
    </Box>
  )
}

export default FilteredDatePicker
