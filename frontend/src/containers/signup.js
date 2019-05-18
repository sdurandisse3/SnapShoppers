import React from 'react';
import firebase from '../firebase';


class SignUp extends React.Component{
    state = {
        email: '',
        password: '',
        error: ''
      }
      handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }


      render() {
      
        
    
        return (
            <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" name="email" onChange={this.handleChange}  />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" placeholder="Password" onChange={this.handleChange}  />
            </div>
            <button type="submit" className="btn btn-primary" >Sign Up</button>
          </form>
        );
      }
}
export default SignUp;