import React from 'react';
import './Signin.css';
import axios from 'axios';

class Signin extends React.Component {
  state = {
    signInEmail: '',
    signInPassword: '',
  };
  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };
  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    const user = {
      email: this.state.signInEmail,
      password: this.state.signInPassword,
    };
    axios
      .post('https://face-recon-api.herokuapp.com/signin', user)
      .then((res) => {
        if (res.data.id) {
          this.props.loadUser(res.data);
          this.props.onRouteChange('home');
        } else {
          console.log('Error!');
        }
      })
      .catch((err) => console.log('Unable to signin'));
  };
  render() {
    return (
      <article className='br2 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center'>
        <main className='pa4 black-80'>
          <div className='measure'>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f1 fw6 ph0 mh0'>Sign In</legend>
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
                  onClick={this.onSubmitSignIn}
                  className='ma1 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                  type='submit'
                  value='Sign in'
                />
              </div>
            </fieldset>

            <div className='lh-copy mt3'>
              <p
                onClick={() => this.props.onRouteChange('register')}
                href='#0'
                className='f6 link dim black  pointer'
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
