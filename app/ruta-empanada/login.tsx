'use client'

import { LoginAcc } from "@/actions/login"
import React from "react"

export default function Login () {
  // Handle input changes and login logic here
  // You can use React.useState and React.useEffect to manage state and side effects
  // For example:
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'username') {
      setUsername(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle login logic here
    // console.log('Logging in...')
    // console.log('Username:', username)
    // console.log('Password:', password)
    const logeo = await LoginAcc({username, password})
    if(logeo.message) {
      return console.log("LOGUEO")
    }
    return console.log("NO LOGUEO")
    //console.log(logeo, "LOGUEO")
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" name="username" onChange={handleChange} />
        <input type="password" placeholder="Password" name="password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}