
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter.jsx";
import './styles/App.css'
import { Dashboard } from "./components/Dashboard.jsx";

function App() {

  return (
    <>
   <Dashboard/>

      {/* <BrowserRouter>
        <AppRouter />
      </BrowserRouter> */}

    </>
  )
}

export default App
