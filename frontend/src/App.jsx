import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Article from './pages/Article'
import Add from './pages/Add'
import Update from './pages/Update'



function App() {
  

  return (
    <React.StrictMode>
            <Router future={{
    v7_relativeSplatPath: true,
  }}>
              <Header />
                <Routes >
                    <Route future={{v7_relativeSplatPath: true,}} path="/" element={<Home />}/>
                    <Route path='/articles/:articleId' element={<Article />} />
                    <Route path="/add" element={<Add />} />
                    <Route path="/articles/update/:articleId" element={<Update />} />
                </Routes>
            </Router>
        </React.StrictMode>
    
  )
}

export default App
