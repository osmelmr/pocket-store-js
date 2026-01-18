import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router/dom'
import { router } from './router.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './auth/authContext.jsx'

const client = new QueryClient()

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <QueryClientProvider client={client}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </AuthProvider>
)
