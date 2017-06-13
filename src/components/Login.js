import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
  }


  handleFormSubmit(e) {
    e.preventDefault();

    const { username, password } = this.state;

    if(!username || !password) {
      // display error to user
      return;
    }

    this.props.login(username, password);
  }

  handleTextFieldChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isLoggedIn) {
      this.props.router.push('/dashboard')
    }
  }

  render() {
    const { error, isLoggingIn } = this.props;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleFormSubmit}>
          {error}
          <p>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleTextFieldChange}
              required
            />
          </p>
          <p>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleTextFieldChange}
              minLength={8}
              required
            />
          </p>
          <p>
            <input
              type="submit"
              value={isLoggingIn ? 'Logging in...' : 'Log in'}
              disabled={isLoggingIn}
            />
          </p>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
