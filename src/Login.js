import React from 'react';

class Login extends React.Component {

    handleChange = (events) => {
        this.setState({name: events.target.value});
    }

    state = {
        name: null
    }

    render() {
        return(
            <div style={{textAlign: 'center'}}>

                <div style={{fontSize: '50px', marginTop: '300px'}}>
                    <label for="username">Create Username: </label>
                    <input style={{fontSize: '50px', borderRadius: '15px', margin: '20px'}} id="username" name="username" placeholder="johndoe235"/>
                    <button style={{fontSize: '50px', borderRadius: '15px'}}>Join</button>
                </div>

            </div>
        )
    }
}

export default Login;