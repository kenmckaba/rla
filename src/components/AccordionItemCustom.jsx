import {
  Box,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react'

export const AccordionItemCustom = ({ title, children }) => {
  return (
    <AccordionItem border="none" mt="3px">
      <AccordionButton
        height="26px"
        borderWidth="1px"
        borderRadius="4px"
        borderColor="rgb(226, 232, 240)"
      >
        <Box flex="1" fontSize="12px" fontWeight="500" textAlign="left">
          {title}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel padding="0" pb={4}>
        {children}
      </AccordionPanel>
    </AccordionItem>
  )
}
