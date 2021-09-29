import React from 'react'
import { Box, HStack, Select, useColorMode } from '@chakra-ui/react'

export default function ThemeToggle() {
  const { colorMode, setColorMode } = useColorMode()

  const chooseColorMode = (e) => {
    setColorMode(e.target.value)
  }

  return (
    <HStack>
      <Box>Theme:</Box>
      <Select color="black" value={colorMode} size="xs" onChange={chooseColorMode}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </Select>
    </HStack>
  )
}
