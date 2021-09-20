// https://gist.github.com/baumandm/8665a34bc418574737847f7394f98bd9

import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { useColorMode } from '@chakra-ui/react'
import 'react-datepicker/dist/react-datepicker.css'
import './date-picker.css'

const DatePicker = ({
  selectedDate,
  onChange,
  isClearable = false,
  showPopperArrow = false,
  ...props
}) => {
  const isLight = useColorMode().colorMode === 'light'
  return (
    <div className={isLight ? 'light-theme' : 'dark-theme'}>
      <ReactDatePicker
        selected={selectedDate}
        onChange={onChange}
        isClearable={isClearable}
        showPopperArrow={showPopperArrow}
        className="react-datapicker__input-text"
        {...props}
      />
    </div>
  )
}

export default DatePicker
