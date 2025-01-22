import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import store from './store/index';


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App/>
  </Provider>
)
