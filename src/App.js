import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { AttendeeLanding } from './components/AttendeeLanding'
import theme from './theme/index'
import Fonts from './theme/fonts'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { TrainerInSession } from './components/TrainerInSession'
import { Registration } from './components/Registration'
import { RegistrationUpdate } from './components/RegistrationUpdate'
import { V1Splashscreen } from './components/views/V1Splashscreen/V1Splashscreen'
import { V2TrainingList } from './components/views/V2TrainingList/V2TrainingList'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Fonts />
      <BrowserRouter>
        <Switch>
          <Route path="/attendee/:attendeeId" component={AttendeeLanding} />
          <Route path="/trainerInSession/:trainingId" component={TrainerInSession} />
          <Route path="/registration-update/:attendeeId" component={RegistrationUpdate} />
          <Route path="/registration/:trainingId" component={Registration} />
          <Route path="/dashboard" component={V2TrainingList} />
          <Route path="/" component={V1Splashscreen} />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
