import { createContext, useContext, useEffect } from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState'

const DarkModeContext = createContext()

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
    'isDarkMode'
  )
  useEffect(() => {
    const rootElement = document.documentElement
    if (isDarkMode) {
      rootElement.classList.remove('light-mode')
      rootElement.classList.add('dark-mode')
    } else {
      rootElement.classList.remove('dark-mode')
      rootElement.classList.add('light-mode')
    }
  }, [isDarkMode])

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark)
  }
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

function useDarkMode() {
  const context = useContext(DarkModeContext)
  if (!context)
    throw new Error('DarkModeContext was used outside of DarkModeProvider')
  return context
}

export { DarkModeProvider, useDarkMode }
