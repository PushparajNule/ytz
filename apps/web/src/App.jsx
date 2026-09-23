import { Outlet } from "react-router-dom";
import { Header, Footer, Sidebar } from "./components";

function App(){

  return(
    <>
      <div className="h-screen flex flex-col">
        <Header/>

        <div className="flex flex-1">
          <Sidebar/>

          <main className="flex-1 p-2 h-screen border">
            <Outlet/>
          </main>
        </div>

        <Footer/>
      </div>
    </>
  )
}

export default App;