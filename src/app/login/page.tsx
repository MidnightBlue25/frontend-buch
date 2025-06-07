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
      setError('用户名和密码不能为空')
    } else {
      setError('')
      alert(`登录成功！欢迎 ${username}`)
      // 这里你可以做真实登录请求
    }
  }

  return (
    <Container style={{ maxWidth: '400px', marginTop: '100px' }}>
      <h2>登录</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>用户名</Form.Label>
          <Form.Control
            type="text"
            placeholder="输入用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>密码</Form.Label>
          <Form.Control
            type="password"
            placeholder="输入密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          登录
        </Button>
      </Form>
    </Container>
  )
}
