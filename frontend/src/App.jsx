import React from 'react'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import { Route,Routes } from 'react-router-dom'


const App = () => {
  const [isLogin, setIsLogin] = React.useState(false)

  return (
    <div>
     <Routes>
        <Route path="/" element={<Signup setIsLogin={setIsLogin} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </div>
  )
}

export default App
