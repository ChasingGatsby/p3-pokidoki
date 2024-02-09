import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";

import App from './App.jsx'
// change below imports to appropriate pages once setup
// import SearchBooks from './pages/SearchBooks'
// import SavedBooks from './pages/SavedBooks'
import Home from './pages/Home'
import Search from './pages/Search'
import Login from './pages/Login'
import Signup from './pages/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    // change below children to appropriate pages once setup
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/search',
        element: <Search />
      }, {
        path: '/login',
        element: <Login />
      },
      {path: "/signup",
      element: <Signup/>
    },
      {parth: "/login",
      element: <Login/>}
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
