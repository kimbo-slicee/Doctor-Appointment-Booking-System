import React, {useState} from 'react'

function Login() {
  const [state,setState]=useState("Sign Up");
  const [email,setEmail]=useState('');
  const [password ,setPassword]=useState('');
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const onSubmit=async (event)=>{
    event.preventDefault();
  }
  return (
      <form className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-center p-8 min-w-[340px] sm:min-w-96 border rounded-xl  text-zinc-600 shadow-lg">
          <p className="text-2xl font-semibold uppercase ">{state === "Sign Up" ? "create Account" : "Login"}</p>
          <p className="text-sm font-light">Please {state === "Sign Up" ? "Sign Up" : "Login "} to book appointment ! </p>
          {
              state === "Sign Up" && <div className="w-full ">
                <p>Name</p>
                <input className="border hover:border-primary
              border-zinc-300 rounded w-full p-2 mt-2" type="text" onChange={(e) => (e) => setName(e.target.value)}
                       value={name} required/>
              </div>
          }
          {/*// Phone Number*/}
          {
              state === "Sign Up" && <div className="w-full ">
                <p>Phone</p>
                <input className="border hover:border-primary
              border-zinc-300 rounded w-full p-2 mt-2" type="text" onChange={(e) => (e) => setPhone(e.target.value)}
                       value={phone} required/>
              </div>
          }
          <div className="w-full">
            <p>Email</p>
            <input className="border border-zinc-300 rounded w-full p-2 mt-2 " type="text"
                   onChange={(e) => (e) => setEmail(e.target.value)} value={email} required/>
          </div>
          <div className="w-full">
            <p>Password</p>
            <input className="border border-zinc-300 rounded w-full p-2 mt-2 " type="text" onChange={(e) => (e) => setPassword(e.target.value)} value={password} required/>
          </div>
          <button className="bg-primary text-white w-full py-2 rounded-md text-base" type="submit" onSubmit={()=>onSubmit}>
            {state==="Sign Up"?"create account":"Login"}</button>
          {state==="Sign Up" ?
              <p> Already Have account ?
               <span onClick={()=>setState('Login')} className="text-primary underline text-sm cursor-pointer mx-1"> Login Here </span></p>
              : <p>  Create new Account ?<span onClick={()=>setState("Sign Up")} className="mx-1 text-primary underline text-sm cursor-pointer">Click Here</span></p>}
        </div>
      </form>
  )
}

export default Login