import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { NotFoundPage } from './pages/NotFoundPage.jsx'

import './index.scss'
import { OverviewPage } from './pages/OverviewPage.jsx'
import { DocumentationPage } from './pages/DocumentationPage.jsx'
import { ExploreTopicsPage } from './pages/tools/ExploreTopicsPage.jsx'
import { ProduceEventsPage } from './pages/tools/ProduceEventsPage.jsx'
import { QueryEventsPage } from './pages/tools/QueryEventsPage.jsx'
import { SettingsPage } from './pages/tools/SettingsPage.jsx'

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  errorElement: <NotFoundPage />,
  children: [
    {
      path: "/",
      element: <OverviewPage />
    },
    {
      path: "/documentation",
      element: <DocumentationPage />
    },
    {
      path: "/tools/topics/explore",
      element: <ExploreTopicsPage />
    },
    {
      path: "/tools/events/produce",
      element: <ProduceEventsPage />
    },
    {
      path: "/tools/events/query",
      element: <QueryEventsPage />
    },
    {
      path: "/tools/settings",
      element: <SettingsPage />
    },
  ]
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
