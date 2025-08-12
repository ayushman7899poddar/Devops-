import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function validate(values) {
    const newErrors = {}

    if (!values.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!values.lastName.trim()) newErrors.lastName = 'Last name is required'

    if (!values.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = 'Enter a valid email address'
    }

    if (!values.password) {
      newErrors.password = 'Password is required'
    } else if (values.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (!values.confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password'
    } else if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!values.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms'
    }

    return newErrors
  }

  function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = validate(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true)
      // Simulate API submission
      setTimeout(() => {
        alert(`Signed up as ${formData.firstName} ${formData.lastName} (${formData.email})`)
      }, 200)
    } else {
      setSubmitted(false)
    }
  }

  return (
    <div className="container">
      <h1>Create your account</h1>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="grid">
          <div className="field">
            <label htmlFor="firstName">First name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Jane"
              value={formData.firstName}
              onChange={handleChange}
              aria-invalid={!!errors.firstName}
              aria-describedby="firstName-error"
              required
            />
            {errors.firstName && (
              <p className="error" id="firstName-error">{errors.firstName}</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="lastName">Last name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              aria-invalid={!!errors.lastName}
              aria-describedby="lastName-error"
              required
            />
            {errors.lastName && (
              <p className="error" id="lastName-error">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="jane.doe@example.com"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
            required
          />
          {errors.email && <p className="error" id="email-error">{errors.email}</p>}
        </div>

        <div className="grid">
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
              required
            />
            {errors.password && (
              <p className="error" id="password-error">{errors.password}</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby="confirmPassword-error"
              required
            />
            {errors.confirmPassword && (
              <p className="error" id="confirmPassword-error">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        <div className="checkbox">
          <input
            id="acceptTerms"
            name="acceptTerms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={handleChange}
            aria-invalid={!!errors.acceptTerms}
            aria-describedby="acceptTerms-error"
          />
          <label htmlFor="acceptTerms">
            I agree to the terms and privacy policy
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="error" id="acceptTerms-error">{errors.acceptTerms}</p>
        )}

        <button type="submit" className="submit" disabled={submitted}>
          {submitted ? 'Submitting…' : 'Create account'}
        </button>
      </form>

      <p className="helper">
        Already have an account? <a href="#">Sign in</a>
      </p>
    </div>
  )
}

export default App
