import {
  Box,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react'

export const AccordionItemCustom = ({ title, children }) => {
  return (
    <AccordionItem border="none" mt="2">
      <AccordionButton
        borderWidth="1px"
        borderRadius="lg"
        borderColor="darkKnight.900"
        _expanded={{ borderBottom: '0', borderBottomRadius: 0 }}
      >
        <Box fontWeight="semibold" flex="1" fontSize="10pt" textAlign="left">
          {title}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel
        p={0}
        borderWidth="1px"
        borderRadius="lg"
        borderColor="darkKnight.900"
        borderTop="0"
        borderTopRadius="0"
      >
        {children}
      </AccordionPanel>
    </AccordionItem>
  )
}
