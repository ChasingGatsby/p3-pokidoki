import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
// change below imports to appropriate pages once setup
// import SearchBooks from './pages/SearchBooks'
// import SavedBooks from './pages/SavedBooks'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    // change below children to appropriate pages once setup
    children: [
      {
        index: true,
        element: <SearchBooks />
      }, {
        path: '/saved',
        element: <SavedBooks />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
