import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from 'react-router-dom'
import {Account, Channel, CreatePost, Home, LikedPosts, Login, MyPosts, Playlists, PrivacyPolicy, Settings, Signup, Subscriptions} from './pages'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './features/AuthContext.jsx'

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index element={<Home/>}/>
      <Route path='/subscriptions' element={<Subscriptions/>}/>
      <Route path='/playlists' element={<Playlists/>}/>
      <Route path='/:username/account' element={<Account/>}/>
      <Route path='/settings' element={<Settings/>}/>
      <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>

      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>

      <Route path='/:username/channel' element={<Channel/>}>
        <Route index element={<Navigate to={"playlists"}/>}/>
        <Route path='playlists' element={<Playlists/>}/>
        <Route path='my-posts' element={<MyPosts/>}/>
        <Route path='liked-posts' element={<LikedPosts/>}/>
      </Route>

      <Route path='/createPost' element={<CreatePost/>}/>
    </Route>
  )
)

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={route} />
    </AuthProvider>
  </QueryClientProvider>,
)
