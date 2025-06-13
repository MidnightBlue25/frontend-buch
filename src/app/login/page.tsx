'use client'

import { useState } from 'react'
import { Form, Button, Alert, Container } from 'react-bootstrap'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === '' || password === '') {
      setError('Benutzername und Passwort dürfen nicht leer sein.')
    } else {
      setError('')
      alert(`Login erfolgreich! ${username}`)
      // Hier könnte eine API-Anfrage zum Login erfolgen
    }
  }

  return (
    <Container style={{ maxWidth: '400px', marginTop: '100px' }}>
      <h2>Einloggen</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mt-3 mb-3" controlId="formUsername">
          <Form.Label>Benutzername</Form.Label>
          <Form.Control
            type="text"
            placeholder="Geben Sie Ihren Benutzernamen ein"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Passwort</Form.Label>
          <Form.Control
            type="password"
            placeholder="Geben Sie Ihr Passwort ein"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  )
}
