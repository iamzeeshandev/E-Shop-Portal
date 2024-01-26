import { LoginPage, SignupPage } from './routes';
import './styles/tailwind.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path="/sign-up" element={<SignupPage />} />
    </Routes>
    </BrowserRouter>
  )
}


export default App
