import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import {Account, Home, Playlists, PrivacyPolicy, Settings, Subscriptions} from './pages'

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index element={<Home/>}/>
      <Route path='/subscriptions' element={<Subscriptions/>}/>
      <Route path='/playlists' element={<Playlists/>}/>
      <Route path='/accounts' element={<Account/>}/>
      <Route path='/settings' element={<Settings/>}/>
      <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>,
)
