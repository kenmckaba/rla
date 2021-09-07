import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import Background from './components/Background'
import { TrainingList } from './components/TrainingList'
import { AttendeeLanding } from './components/AttendeeLanding'
import theme from './theme/index'
import Fonts from './theme/fonts'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { TrainerInSession } from './components/TrainerInSession'
import { Registration } from './components/Registration'
import { RegistrationUpdate } from './components/RegistrationUpdate'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Fonts />
      <BrowserRouter>
        <Switch>
          <Route path="/trainerInSession/:trainingId" component={TrainerInSession} />
          <Background>
            <Route path="/attendee/:attendeeId" component={AttendeeLanding} />
            <Route path="/registration-update/:attendeeId" component={RegistrationUpdate} />
            <Route path="/registration/:trainingId" component={Registration} />
            <Route path="/" component={TrainingList} />
          </Background>
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
