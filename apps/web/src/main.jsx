import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import {Account, Home, Login, Playlists, PrivacyPolicy, Settings, Signup, Subscriptions} from './pages'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index element={<Home/>}/>
      <Route path='/subscriptions' element={<Subscriptions/>}/>
      <Route path='/playlists' element={<Playlists/>}/>
      <Route path='/accounts' element={<Account/>}/>
      <Route path='/settings' element={<Settings/>}/>
      <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>

      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
    </Route>
  )
)

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={route} />
  </QueryClientProvider>,
)
