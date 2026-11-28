import { Outlet } from "react-router";
import { Header, Footer, Sidebar } from "./components";

function App(){

  return(
    <>
      <div className="h-screen flex flex-col relative">
        <div className="sticky top-0 right-0 left-0 bg-amber-50">
          <Header />
        </div>

        <div className="flex flex-1 h-max">
          <div className="">
            <Sidebar/>
          </div>

          <main className="flex-1 p-2 h-full border">
            <Outlet/>
          </main>
        </div>
      </div>
    </>
  )
}

export default App;