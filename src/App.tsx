import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:name' element={<ProductDetail />} />
        <Route path='*' element={<Navigate to={'/'} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
