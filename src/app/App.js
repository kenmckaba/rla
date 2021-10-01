import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { AttendeeLanding } from './components/AttendeeLanding'
import theme from './theme/index'
import Fonts from './theme/fonts'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { TrainerInSession } from './pages/TrainerInSession/TrainerInSession'
import { Registration } from './components/Registration'
import { RegistrationUpdate } from './components/RegistrationUpdate'
import { TrainingList } from './pages/TrainingList/TrainingList'
import { Splashscreen } from './pages/Splashscreen/Splashscreen'
import { StudentView } from './pages/StudentView/StudentView'



function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Fonts />
      <BrowserRouter>
        <Switch>
          <Route path="/attendee/:attendeeId" component={AttendeeLanding} />
          <Route path="/trainerInSession/:trainingId" component={TrainerInSession} />
          <Route path="/studentView/:trainingId" component={StudentView} />
          <Route path="/registration-update/:attendeeId" component={RegistrationUpdate} />
          <Route path="/registration/:trainingId" component={Registration} />
          <Route path="/dashboard" component={TrainingList} />
          <Route path="/" component={Splashscreen} />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
