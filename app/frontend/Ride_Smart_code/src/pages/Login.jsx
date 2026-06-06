import { useState } from 'react'
export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const loginData = {username:username,
        password:password};
        fetch("http://localhost:3000/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        }).then(resp=>{
            if(resp.status===200){
                alert("login sucessfull");
                return resp.json();
            }
            else if(resp.status===401){
                throw new Error("Invalid credntials");
            }else{
                throw new Error(`request failed with status ${resp.status}`);
            }
        }).then(data=>{
            console.log("login sucessfull",data);
            localStrorage.setItem("token",data.token);
        }).catch(err=>{
            console.error("login failed",err);
            alert("login failed: "+err.message);
        }); 
    }
    return (
        <>
        <div>
            <h1>Login Page</h1>
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <br />
                <input type="submit" value="Login" onClick={handleSubmit} />
            </form>
        </div>
        <div>
            <p>Username: {username}</p>
            <p>Password: {password}</p>
        </div>

        </>
    );
}