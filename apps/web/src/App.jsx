import { Outlet } from "react-router-dom";
import { Header, Footer, Sidebar } from "./components";
import Home from "./pages/Home";

function App(){

  return(
    <>
    <Header/>
    <Sidebar/>
      <Outlet/>
    <Footer/>
    </>
  )
}

export default App;