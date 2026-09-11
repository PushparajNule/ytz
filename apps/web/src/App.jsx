import { login } from "./api/auth.api.js";

const loginFn = async (username, email, password) => {
  const data = {
    username : username,
    email : email,
    password : password
  }
  const res = await login(data)
  return res
}

const user = await loginFn("marimo69", "marimo69@gmail.com", "Marimo8008569")
function App(){

  console.log(user.data.data)
  return(
    <>
      <button onClick={loginFn}>Login</button>
      <h1></h1>
    </>
  )
}

export default App;