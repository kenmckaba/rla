import { AddIcon } from '@chakra-ui/icons'
import {
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import { ListTable } from '../views/V2TrainingList/V2TrainingList'
import O3TrainingTable from './O3TrainingTable'

export default function O2TrainingListHeader({
  onNewTraining,
  trainings,
  setTrainingHovered,
  trainingHovered,
  handleTrainingClick,
  openRegPage
}) {
  return (
    <Tabs height="100%" width="100%" variant="solid-rounded">
      <Flex>
        <TabList>
          <Tab
            textTransform="uppercase"
            color="#ffffff"
            height="32px"
            fontSize="10pt"
            paddingInline="26px"
            minW="120px"
            fontWeight="bold"
            borderRadius="full"
            bg="rgba(255, 255, 255, 0.1);"
            mr="16px"
            _focus={{
              boxShadow: 'none',
            }}
            _selected={{
              color: 'darkKnight.700',
              bg: 'ghost.50',
            }}
          >
            Upcoming training
          </Tab>
          <Tab
            textTransform="uppercase"
            color="#ffffff"
            height="32px"
            fontSize="10pt"
            paddingInline="26px"
            minW="120px"
            fontWeight="bold"
            borderRadius="full"
            bg="rgba(255, 255, 255, 0.1);"
            _focus={{
              boxShadow: 'none',
            }}
            _selected={{
              color: 'darkKnight.700',
              bg: 'ghost.50',
            }}
          >
            Completed training
          </Tab>
        </TabList>
        <Spacer />
        <Button
          variant="primary-transparent"
          size="sm"
          leftIcon={<AddIcon />}
          onClick={onNewTraining}
          fontSize="10pt"
          fontWeight="bold"
          minW="170px"
        >
          New training
        </Button>
      </Flex>
      <TabPanels
        minHeight="75vh"
        width="100%"
        color="white"
        borderRadius="5px"
        bg="rgba(255, 255, 255, 0.1)"
        mt="4"
      >
        <TabPanel p={0} m={0}>
          <ListTable>
            <O3TrainingTable past={false}
              trainings={trainings}
              setTrainingHovered={setTrainingHovered}
              trainingHovered={trainingHovered}
              handleTrainingClick={handleTrainingClick}
              openRegPage={openRegPage}
            />
          </ListTable>
        </TabPanel>
        <TabPanel p={0} m={0}>
          <O3TrainingTable past={true}
            trainings={trainings}
            setTrainingHovered={setTrainingHovered}
            trainingHovered={trainingHovered}
            handleTrainingClick={handleTrainingClick}
            openRegPage={openRegPage}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
