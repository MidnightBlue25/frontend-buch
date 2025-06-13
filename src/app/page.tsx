'use client';

import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';

export default function HomePage() {
  return (
    <Container className="d-flex flex-column justify-content-start align-items-center text-center pt-5">
      <Row>
        <Col>
          <h1 className="mb-4">Willkommen zur Bibliothek</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          <Image
            src="/images/book.png"
            alt="Ein Buch"
            width={300}
            height={300}
            className="img-fluid"
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Image
            src="/images/HKAQuer.png"
            alt="Logo"
            width={200}
            height={200}
            className="img-fluid"
          />
        </Col>
      </Row>
    </Container>
  );
}
