import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import NavBar from './NavBar'
import Activities from './commun/Activities'
import AddActivity from './surveillent/AddActivity'
import UpdateActivity from './surveillent/UpdateActivity'
import Archive from './commun/Archive'
import ActivityDetails from './commun/ActivityDetails'
import Profile from './commun/Profile'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />

        <Route path='/activities' element={<NavBar />}>
          <Route index element={<Activities />} />
          <Route path='/activities/addActivity' element={<AddActivity />} />
          <Route path='/activities/:id/updateActivity' element={<UpdateActivity />} />
          <Route path='/activities/activitiesHistory' element={<Archive />} />
          <Route path='/activities/:id/detailsActivity' element={<ActivityDetails />} />
          <Route path='/activities/users/:id/profile' element={<Profile />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
