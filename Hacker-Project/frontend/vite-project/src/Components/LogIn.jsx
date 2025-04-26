import React , {useState} from 'react'
import { loginUser } from '../../Api/ApiService'

const LoginForm = () => {
    const [logData , setlogData] = useState({
        username: '',
        password: '',
    })

    const handleChange = (e) => {
        setlogData({
            ...logData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(logData);
            const {token , username} = response.data;
           
            localStorage.setItem("token", token);
            localStorage.setItem("username", username);
            alert("Success Log");
        }catch(error)
        {
            alert("Error please Check username or password" ,error)
        }
    }

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
      };
    
      const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      };
    
      const inputStyle = {
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '1em',
      };
    
      const buttonStyle = {
        padding: '12px 20px',
        backgroundColor: '#ff6600',
        color: "#000000",
        border: 'none',
        borderRadius: '4px',
        fontSize: '1.1em',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
      };
    

      const titleStyle = {
        fontSize: '2em',
        marginBottom: '20px',
        color: '#333',
      };

      return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>LogIn</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <input 
                    type='text'
                    name='username'
                    value={logData.username}
                    onChange={handleChange}
                    placeholder='Name'
                    required
                    style={inputStyle}
                ></input>
                <input 
                    type='password'
                    name='password'
                    value={logData.password}
                    onChange={handleChange}
                    placeholder='Password'
                    required
                    style={inputStyle}
                    ></input>
                    <button 
                        type='submit'
                        style={buttonStyle}
                    >LogIn</button>
            </form>
        </div>
      )
}

export default LoginForm;