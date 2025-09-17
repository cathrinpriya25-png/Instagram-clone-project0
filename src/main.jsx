import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ViewStory from './viewstory.jsx'
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import Profile from './profile.jsx'
import Code404 from './code404.jsx'
const router= createBrowserRouter(
  [
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/story/:id/:tot',
    element:<ViewStory/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'*',
    element:<Code404/>
  }
]

)

createRoot(document.getElementById('root')).render(
 <RouterProvider router={router}/>
)
