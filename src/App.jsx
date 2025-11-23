
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter.jsx";
import { Navbar } from "./components/NavBar.jsx";

import './styles/App.css'

function App() {

  return (
    <>
      <Navbar />

      {/* <BrowserRouter>
        <AppRouter />
      </BrowserRouter> */}

    </>
  )
}

export default App
