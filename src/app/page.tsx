'use client';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function Page() {
  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
      <Row>
        <Col className="text-center">
          <h1>Hello Next.js!</h1>
          <Form className="mt-4">
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email-Adresse</Form.Label>
              <Form.Control type="email" placeholder="E-Mail eingeben" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Passwort</Form.Label>
              <Form.Control type="password" placeholder="Passwort eingeben" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
