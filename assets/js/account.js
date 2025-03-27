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

// JustValidate - Register Form Validation
const registerForm = document.querySelector('#register-form')
if (registerForm) {
  const validator = new JustValidate('#register-form')

  validator
    .addField('#fullName', [
      {
        rule: 'required',
        errorMessage: 'Please enter your full name!'
      },
      {
        rule: 'minLength',
        value: 5,
        errorMessage: 'Full name must be at least 5 characters!'
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: 'Full name must not exceed 50 characters!'
      }
    ])
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
      },
      {
        validator: (value) => value.length >= 8,
        errorMessage: 'Password must be at least 8 characters!'
      },
      {
        validator: (value) => /[A-Z]/.test(value),
        errorMessage: 'Password must contain at least one uppercase letter!'
      },
      {
        validator: (value) => /[a-z]/.test(value),
        errorMessage: 'Password must contain at least one lowercase letter!'
      },
      {
        validator: (value) => /\d/.test(value),
        errorMessage: 'Password must contain at least one digit!'
      },
      {
        validator: (value) => /[@$!%*?&]/.test(value),
        // validator: (value) => /\W/.test(value),
        errorMessage: 'Password must contain at least one special character!'
      }
    ])
    .addField('#agree', [
      {
        rule: 'required',
        errorMessage: 'Please agree to our terms!'
      }
    ])
    .onSuccess((event) => {
      const fullName = event.target.fullName.value
      const email = event.target.email.value
      const password = event.target.password.value
      const agree = event.target.agree.checked

      console.log('Full Name:', fullName)
      console.log('Email:', email)
      console.log('Password:', password)
      console.log('Agree:', agree)
    })
}
// End JustValidate - Register Form Validation

// JustValidate - Forgot Password Form Validation
const forgotPasswordForm = document.querySelector('#forgot-password-form')
if (forgotPasswordForm) {
  const validator = new JustValidate('#forgot-password-form')

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
    .onSuccess((event) => {
      const email = event.target.email.value
      console.log('Email:', email)
    })
}
// End JustValidate - Forgot Password Form Validation
