// JustValidate - Login Form Validation
const loginForm = document.querySelector('#login-form')
if (loginForm) {
  const validator = new JustValidate('#login-form')

  validator
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Please enter your email!'
      },
      {
        rule: 'email',
        errorMessage: 'Email is invalid!'
      }
    ])
    .addField('#password', [
      {
        rule: 'required',
        errorMessage: 'Please enter your password!'
      }
    ])
    .onSuccess((event) => {
      const email = event.target.email.value
      const password = event.target.password.value
      const rememberPassword = event.target.rememberPassword.checked
      console.log('Email:', email)
      console.log('Password:', password)
      console.log('Remember Password:', rememberPassword)
    })
}
// End JustValidate - Login Form Validation
