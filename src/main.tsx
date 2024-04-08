import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import './index.css';
import './satoshi.css';
import AppProvider from './context/app.context';
import TabsProvider from './context/tabs.context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <Router>
      <TabsProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </TabsProvider>

      <ToastContainer />
    </Router>
  // </React.StrictMode>
);
