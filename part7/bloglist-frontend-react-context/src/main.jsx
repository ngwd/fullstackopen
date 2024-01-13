import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { NotificationContextProvider } from './NotificationContext'
import { AuthProvider } from './AuthenticationContext' 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </NotificationContextProvider>
    </QueryClientProvider>
  )