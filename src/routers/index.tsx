import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useAuth } from '../context/authProvider.tsx'
import { ProtectedRoute } from './ProtectedRouter.tsx'
import { lazy, Suspense } from 'react'
import Error from '~/components/shared/Error/Error.tsx'
import AdminLayout from '~/layout/AdminLayout/index.tsx'
import SendMail from '~/pages/Admin/SendMail.tsx'
import Example from '~/pages/Example.tsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import LoadingPage from '~/components/shared/LoadingPage/LoadingPage.tsx'

const Login = lazy(() => import('~/components/Login.tsx'))
const Logout = lazy(() => import('~/components/Logout.tsx'))
const User = lazy(() => import('~/pages/Admin/User.tsx'))
const Price = lazy(() => import('~/pages/Admin/Price.tsx'))
const Routes = () => {
  const { token } = useAuth()
  let routes: Array<any>

  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: '/',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminLayout>
                <User />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/customer',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminLayout>
                <User />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/price',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminLayout>
                <Price />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/send-mail',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminLayout>
                <SendMail />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/logout',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminLayout>
                <Logout />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/example',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminLayout>
                <DndProvider backend={HTML5Backend}>
                  <Example />
                </DndProvider>
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '*',
          element: <Error />
        }
      ]
    }
  ]

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: '/',
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Login />
        </Suspense>
      )
    },

    {
      path: '*',
      element: <Error />
    }
  ]

  if (token) {
    routes = routesForAuthenticatedOnly
  } else {
    routes = routesForNotAuthenticatedOnly
  }
  const router = createBrowserRouter([...routes])
  // Provide the router configuration using RouterProvider
  return (
    // <Spin spinning={isLoading} size='large' style={{ maxHeight: '100%', zIndex: 1001 }}>
    <RouterProvider router={router} />
    // </Spin>
  )
}

export default Routes
