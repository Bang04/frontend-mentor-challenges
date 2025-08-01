import { Route, Routes } from 'react-router'
import './App.css'
import { SideBar } from './layout/SideBar'
import { OverView } from './layout/Overview'
import { Transactions } from './layout/Transactions'
import { Budgets } from './layout/budget/Budgets'
import { Pots } from './layout/pots/Pots'
import { RecurringBills } from './layout/RecurringBills'
import { ToastProvider } from "./components/toast/provider";

function App() {

  return (
    <ToastProvider>
      <div className='flex flex-row bg-[#F8F4F0]' style={{fontFamily: 'publicSans'}}>
        {/* 임시 */}
        <div className='hidden fixed lg:block'> 
          <SideBar></SideBar>
        </div>
        <div className='lg:ml-[16rem]'>
          <Routes>
            <Route path='/overview' element={<OverView />}></Route>
            <Route path='/transactions' element={<Transactions />}></Route>
            <Route path='/budgets' element={<Budgets />}></Route>
            <Route path='/pots' element={<Pots />}></Route>
            <Route path='/recurring-bills' element={<RecurringBills />}></Route>
          </Routes>
        </div>
      </div>
     </ToastProvider>
  )
}

export default App
