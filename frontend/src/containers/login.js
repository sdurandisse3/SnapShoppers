import React from 'react';
import firebase from '../firebase';

class Login extends React.Component{
    state = {
        email: '',
        password: '',
        error: ''
      }

      render(){
        const { email, password, error } = this.state;
        const displayError = error === '' ? '' : <div className="alert alert-danger" role="alert">{error}</div>
        const displayForm = <>
      <h1>Login</h1>
      {displayError}
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={email} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" placeholder="Password" value={password} name="password" onChange={this.handleChange} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Login</button>
      </form>
      </>;

          return(

          )
      }
}
export default Login;