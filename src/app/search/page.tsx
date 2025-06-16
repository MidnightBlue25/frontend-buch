"use client";

export const dynamic = "force-dynamic";

import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { Button, Container, Form, Card, ListGroup, InputGroup, Alert, Spinner } from 'react-bootstrap';
import Link from "next/link";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const query = gql`
  query ($id: ID!) {
    buch(id: $id) {
      isbn
      version
      rating
      art
      preis
      lieferbar
      datum
      homepage
      schlagwoerter
      titel {
        titel
    }
      rabatt(short: true)
  }
    }
`;
type Titel = {
  titel: string
  untertitel: string
}

//type Abbildung = {
//  beschriftung: string
//  contentType: string
//}

enum Art {
  EPUB,
  HARDCOVER,
  PAPERBACK
}

type Buch = {
  id: number
  version: number
  isbn: string
  rating: number
  art: Art
  preis: number
  lieferbar: boolean
  datum: string
  homepage: string
  schlagwoerter: [string]
  titel: Titel
  rabatt: string
}

export default function BuchPage() {
  const [id, setId] = useState("");
  const [search, { data, loading, error }] = useLazyQuery<{ buch: Buch }>(query);

const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // wichtig, um das Standard-Formularverhalten zu verhindern
  if (id.trim() !== "") {
    search({ variables: { id: Number(id) } });
  }
};
  const buch = data?.buch;

  return (
    <Container className="mt-5" style={{ maxWidth: "720px" }}>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Startseite</Breadcrumb.Item>
            <Breadcrumb.Item active>Suchen</Breadcrumb.Item>
          </Breadcrumb>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link href="/search/suchkriterien" passHref>
          <Button variant="outline-primary">🔍 Suche mit Kriterien</Button>
        </Link>
    <h2 className="text-center flex-grow-1 mb-0">📚 Buch Details</h2>
    <div style={{ width: "150px" }} /> {/* die titel wird in der mittel */}
  </div>

      <Form onSubmit={handleSearch}>
        <InputGroup className="mb-4">
          <Form.Control
            placeholder="Gib eine Buch-ID ein, z.B. 1"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Button variant="primary" type="submit">
            Suchen
          </Button>
        </InputGroup>
      </Form>

      {loading && (
        <div className="text-center mt-4">
        <Spinner animation="border" />
        </div>
      )}
      {error && (
        <Alert variant="danger" className="mt-4">
        Fehler: {error.message}
        </Alert>
      )}
      {buch ? (
        <Card>
          <Card.Header>Gefundene Buchdaten</Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>ISBN:</strong> {buch.isbn}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Version:</strong> {buch.version}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Rating:</strong> {buch.rating}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Art:</strong> {buch.art}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Preis:</strong> {buch.preis} €
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Lieferbar:</strong> {buch.lieferbar}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Datum:</strong> {buch.datum}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Homepage:</strong>{" "}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Schlagwörter:</strong>{" "}
                {buch.schlagwoerter?.join(", ") || "–"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Titel:</strong> {buch.titel.titel}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Rabatt:</strong> {buch.rabatt}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      ) : (
        !loading && <p className="text-muted text-center">🔍 Keine Daten gefunden.</p>
      )}
    </Container>
  );
};