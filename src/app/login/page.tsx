'use client'

import { useState } from 'react'
import { Form, Button, Alert, Container } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (username === '' || password === '') {
      setError('Benutzername und Passwort dürfen nicht leer sein.')
      return
    }

    // GraphQL Login Mutation
    const query = `
      mutation {
        token(username: "${username}", password: "${password}") {
          access_token
        }
      }
    `

    try {
      const response = await fetch('https://localhost:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })

      const result = await response.json()

      if (result.data?.token?.access_token) {
        const token = result.data.token.access_token
        localStorage.setItem('access_token', token) // token speichern
        localStorage.setItem('justLoggedIn', 'true');
        setError('')
        router.replace('/');// mit router abbrechen, damit die Seite neu geladen wird
        window.location.href = '/'; // der window gehe zurück zu startseite und dann neu laden
        setError(result.errors?.[0]?.message || 'Unbekannter Fehler beim Login.')
      }
    } catch (err) {
      setError('Fehler beim Senden der Anfrage.')
    }
  }

  return (
    <Container style={{ maxWidth: '400px', marginTop: '100px' }}>
    <Breadcrumb className="mb-4">
      <Breadcrumb.Item href="/">Startseite</Breadcrumb.Item>
      <Breadcrumb.Item active>Login</Breadcrumb.Item>
    </Breadcrumb>

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
