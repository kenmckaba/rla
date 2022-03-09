import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { TrainingList } from './components/TrainingList'
import { AttendeeLanding } from './components/AttendeeLanding'
import theme from './theme/index'
import Fonts from './theme/fonts'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { TrainerInSession } from './components/TrainerInSession'
import { Registration } from './components/Registration'
import { RegistrationUpdate } from './components/RegistrationUpdate'
import { Authenticate } from './components/Authenticate'
import { WithAuthentication } from './utils/withAuthentication'

function App() {
  return (
    <div>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Fonts />
        <BrowserRouter>
          <Switch>
            <Route path="/auth" component={Authenticate} />
            <Route path="/attendee/:attendeeId" component={AttendeeLanding} />
            <Route
              path="/trainerInSession/:trainingId"
              component={WithAuthentication(TrainerInSession)}
            />
            <Route path="/registration-update/:attendeeId" component={RegistrationUpdate} />
            <Route path="/registration/:trainingId/:invitedStudentId?" component={Registration} />
            <Route path="/" component={WithAuthentication(TrainingList)} />
          </Switch>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  )
}

export default App
