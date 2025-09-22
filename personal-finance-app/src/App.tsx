import { Route, Routes } from 'react-router'
import './App.css'
import { SideBar } from './layout/SideBar'
import { ToastProvider } from "./components/toast/provider";
import { Suspense, lazy } from 'react'
import { Loading } from './components/Loading';
const Overview = lazy(()=> import('./layout/Overview'));
const Transactions = lazy(()=> import('./layout/Transactions'));
const Budgets = lazy(()=> import('./layout/budget/Budgets'));
const Pots = lazy(()=> import('./layout/pots/Pots'));
const RecurringBills = lazy(()=> import('./layout/RecurringBills'));

function App() {
  return (
    <ToastProvider>
      <div className='flex flex-row bg-[#F8F4F0]' style={{fontFamily: 'publicSans'}}>
        {/* 임시 */}
        <SideBar></SideBar>
        <div className='flex w-full lg:ml-[16rem]'>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path='/' element={<Overview />}></Route>
              <Route path='/overview' element={<Overview />}></Route>
              <Route path='/transactions' element={<Transactions />}></Route>
              <Route path='/budgets' element={<Budgets />}></Route>
              <Route path='/pots' element={<Pots />}></Route>
              <Route path='/recurring-bills' element={<RecurringBills />}></Route>
            </Routes>
          </Suspense>
        </div>
      </div>
     </ToastProvider>
  )
}

export default App
