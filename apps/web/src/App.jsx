import { Outlet } from "react-router-dom";
import { Header, Footer, Sidebar } from "./components";

function App(){

  return(
    <>
      <div className="h-screen flex flex-col">
        <Header/>

        <div className="flex flex-1 h-full">
          <Sidebar/>

          <main className="flex-1 p-2 h-full border">
            <Outlet/>
          </main>
        </div>
      </div>
    </>
  )
}

export default App;