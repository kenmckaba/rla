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
      <AccordionButton borderWidth="1px" borderRadius="lg" borderColor="darkKnight.900">
        <Box fontWeight="semibold" flex="1" fontSize="10pt" textAlign="left">
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
