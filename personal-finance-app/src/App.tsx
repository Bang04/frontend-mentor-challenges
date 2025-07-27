import { Route, Routes } from 'react-router'
import './App.css'
import { SideBar } from './layout/SideBar'
import { OverView } from './layout/Overview'
import { Transactions } from './layout/Transactions'
import { Budgets } from './layout/budget/Budgets'
import { Pots } from './layout/Pots'
import { RecurringBills } from './layout/RecurringBills'
import { ToastProvider } from "./components/toast/ToastProvider";

function App() {

  return (
    <ToastProvider>
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
     </ToastProvider>
  )
}

export default App
