import { Route, Routes } from 'react-router'
import './App.css'
import { SideBar } from './components/SideBar'
import { OverView } from './layout/Overview'
import { Transactions } from './layout/Transactions'
import { Budgets } from './layout/Budgets'
import { Pots } from './layout/Pots'
import { RecurringBills } from './layout/RecurringBills'

function App() {

  return (
    <div className='flex flex-row w-screen bg-[#F8F4F0]'>
      <SideBar></SideBar>
      <Routes>
        <Route path='/overview' element={<OverView />}></Route>
        <Route path='/transactions' element={<Transactions />}></Route>
        <Route path='/budgets' element={<Budgets />}></Route>
        <Route path='/pots' element={<Pots />}></Route>
        <Route path='/recurring-bills' element={<RecurringBills />}></Route>
      </Routes>
    </div>
  )
}

export default App
