import React from 'react';
import './Register.css';
import axios from 'axios';

class Register extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  onSubmitRegister = () => {
    const user = this.state;
    axios
      .post('https://face-recon-api.herokuapp.com/register', user)
      .then((res) => {
        if (res.data.id) {
          this.props.loadUser(res.data);
          this.props.onRouteChange('home');
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => console.log('Unable to register'));
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };
  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };
  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };
  render() {
    return (
      <article className='br2 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center'>
        <main className='pa4 black-80'>
          <div className='measure'>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f1 fw6 ph0 mh0'>Register</legend>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='name'>
                  Name
                </label>
                <input
                  onChange={this.onNameChange}
                  className='pa2 singinInput email-address input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='text'
                  name='name'
                  id='name'
                />
              </div>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  className='pa2 singinInput email-address input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='email'
                  name='email-address'
                  id='email-address'
                />
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f6' htmlFor='password'>
                  Password
                </label>
                <input
                  onChange={this.onPasswordChange}
                  className='b singinInput password q  pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='password'
                  name='password'
                  id='password'
                />
              </div>
              <div className=''>
                <input
                  onClick={this.onSubmitRegister}
                  className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                  type='submit'
                  value='Register'
                />
              </div>
            </fieldset>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
