import React from 'react'
import "@/styles/globals.css"
import "@/styles/markdown.css"
import EventBusContextProvider from '@/components/EventBusContext'
import AppContextProvider from '@/components/AppContext'

const Layout = ( {children}: {children: React.ReactNode} ) => {
  return (
    <html lang='en'>
      <body>
        <AppContextProvider>
          <EventBusContextProvider>
            {children}
          </EventBusContextProvider>
        </AppContextProvider>
      </body>
    </html>
  )
}

export default Layout