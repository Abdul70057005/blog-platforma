import { createContext } from 'react'
import { useSelector } from 'react-redux'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const userCur = useSelector((state) => state.listArticles.userCurrent)

  console.log(userCur)

  return <AuthContext.Provider value={userCur}>{children}</AuthContext.Provider>
}
