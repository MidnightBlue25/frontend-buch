"use client";

import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  ListGroup,
  Alert,
  Spinner,
} from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Modal } from 'react-bootstrap';

// hier sind GraphQL-Query
// Die GraphQL-Abfrage heißt `Suche` und nimmt ein Eingabe `suchkriterien`.
// Der Backend sucht in der Datenbank auf diesem Objekt und gibt ein Array von Büchern `buecher` zurück.
const QUERY = gql`
  query Suche($suchkriterien: SuchkriterienInput) {
    buecher(suchkriterien: $suchkriterien) {
      id
      version
      isbn
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
    }
  }
`;

// Typdefinition für Buch gemäß Rückgabedaten von GraphQL
//Diese sind die Daten, die wir vom Backend erwarten.
type Buch = {
  id: number
  version: number
  isbn: string;
  rating: number
  art: string;
  preis: number;
  lieferbar: boolean
  datum: string
  homepage: string
  schlagwoerter: string[];
  titel: {
    titel: string;
  };
};

// React-Komponentes
export default function SuchkriterienPage() {
  // Zustandsvariablen für die Suchkriterien (ist durch die eingabe gesetzt)
  const [isbn, setISBN] = useState("");
  const [titel, setTitel] = useState("");
  const [art, setArt] = useState("");
  const [lieferbar, setLieferbar] = useState("");
  const [schlagwoerter, setSchlagwoerter] = useState<string[]>([]);
  const [gefilterteBuecher, setGefilterteBuecher] = useState<Buch[] | null>(null);   // die Bucher werden hier gespeichert, wenn die Suche erfolgreich ist
  const [selectedBuch, setSelectedBuch] = useState<Buch | null>(null); // aktuelle Buch für Modal
  const [showModal, setShowModal] = useState(false); // ob das Modal angezeigt wird

  const toggleSchlagwort = (wert: string) => {
  setSchlagwoerter((prev) =>
    prev.includes(wert)
      ? prev.filter((w) => w !== wert)
      : [...prev, wert]
  );
};
  // useLazyQuery verwendet, um die Suche bei Klick zulösen
  const [search, { loading, error }] = useLazyQuery<{ buecher: Buch[] }>(QUERY);

  // hier ist Funktion zum Absenden der Suchen
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Verhindert Seitenreload

    // suchkriterien das an die GraphQL-Abfrage übergeben wird
  const filterInput = {
    isbn: isbn || undefined,
    titel: titel || undefined,
    art: art || undefined,
    lieferbar: lieferbar === "" ? undefined : lieferbar === "true",
  };

  search({
    variables: { suchkriterien: filterInput },
    onCompleted: (result) => {
      const alleBuecher = result.buecher;

      // Alle Bücher nehmen wenn keine Schlagwörter ausgewählt sind
      if (schlagwoerter.length === 0) {
        setGefilterteBuecher(alleBuecher);
      } else {
        // Falls es gibt schlagwoerter, dann filtern
        //muss alle Bücher haben, die alle Schlagwörter enthalten
        const gefiltert = alleBuecher.filter((buch) =>
          schlagwoerter.every((tag) =>
            buch.schlagwoerter?.map((w) => w.toUpperCase()).includes(tag)
            )
          );
        setGefilterteBuecher(gefiltert);
      }
    },
  });
  };

  // hier Darstellung im Frontend
  return (
    <Container className="mt-5" style={{ maxWidth: "720px" }}>
    <Breadcrumb>
      <Breadcrumb.Item href="/">Startseite</Breadcrumb.Item>
      <Breadcrumb.Item href="/search">
        Suchen
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Suchkriterien</Breadcrumb.Item>
    </Breadcrumb>


      <h2 className="mb-4 text-center">Suche mit Kriterien</h2>

      {/* suchen form */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            value={isbn}
            onChange={(e) => setISBN(e.target.value)}
            placeholder="ISBN, z.B. 978-3-8362-6760-4"
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Titel</Form.Label>
          <Form.Control
            value={titel}
            onChange={(e) => setTitel(e.target.value)}
            placeholder="z.B. JavaScript Patterns"
          />
        </Form.Group>

<Form.Group className="mb-3">
  <Form.Label>Art</Form.Label>
  <div>
    {["EPUB", "HARDCOVER", "PAPERBACK"].map((value) => (
      <Form.Check
        key={value}
        type="radio"
        label={value}
        name="art" // alle Radio-Buttons müssen denselben Namen haben
        value={value}
        checked={art === value}
        onChange={(e) => setArt(e.target.value)}
      />
    ))}
    <Form.Check
      type="radio"
      label="(beliebig)"
      name="art"
      value=""
      checked={art === ""}
      onChange={() => setArt("")}
    />
  </div>
</Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Lieferbar</Form.Label>
          <Form.Select
            value={lieferbar}
            onChange={(e) => setLieferbar(e.target.value)}
          >
            <option value="">(egal)</option>
            <option value="true">Ja</option>
            <option value="false">Nein</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
  <Form.Label>Schlagwörter</Form.Label>
  <div>
    <Form.Check
      type="checkbox"
      label="JavaScript"
      checked={schlagwoerter.includes("JAVASCRIPT")}
      onChange={() => toggleSchlagwort("JAVASCRIPT")}
    />
    <Form.Check
      type="checkbox"
      label="TypeScript"
      checked={schlagwoerter.includes("TYPESCRIPT")}
      onChange={() => toggleSchlagwort("TYPESCRIPT")}
    />
    <Form.Check
      type="checkbox"
      label="Java"
      checked={schlagwoerter.includes("JAVA")}
      onChange={() => toggleSchlagwort("JAVA")}
    />
    <Form.Check
      type="checkbox"
      label="Python"
      checked={schlagwoerter.includes("PYTHON")}
      onChange={() => toggleSchlagwort("PYTHON")}
    />
  </div>
</Form.Group>

        <Button variant="primary" type="submit" className="mb-4">
           Suchen
        </Button>
      </Form>

      {/* Ladeanzeige  */}
      {loading && (
        <div className="text-center mt-4">
        <Spinner animation="border" />
        </div>
      )}

      {/* error massage */}
      {error && (
        <Alert variant="danger" className="mt-4">
        Fehler: {error.message}
        </Alert>
      )}

      {/* show such ergebniss */}
      {gefilterteBuecher?.length ? (
        <Card className="mt-4 mb-5">
          <Card.Header>Ergebnisse</Card.Header>
          <ListGroup variant="flush">
            {gefilterteBuecher.map((buch, index) => (
              <ListGroup.Item key={index}>
                <strong>ISBN:</strong> {buch.isbn}
               | <strong>Title:</strong> {buch.titel.titel}
               | <strong>Art:</strong> {buch.art}
               | <strong>Preis:</strong> {buch.preis} €
               | <strong>Schlagwörter:</strong> {buch.schlagwoerter.join(", ")}
               <Button
                  variant="info"
                  size="sm"
                  className="ms-2"
                  onClick={() => {
                    setSelectedBuch(buch);
                    setShowModal(true);
                  }}
                >
                  Weitere Info
                </Button>
             </ListGroup.Item>
            ))}
         </ListGroup>
        </Card>
      ) : (
        gefilterteBuecher && (
          <p className="mt-4 text-muted text-center">Keine Treffer gefunden.</p>
        )
      )}

<Modal show={showModal} onHide={() => setShowModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Buchdetails</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedBuch && (
      <>
        <p><strong>ID:</strong> {selectedBuch.id}</p>
        <p><strong>Version:</strong> {selectedBuch.version}</p>
        <p><strong>Title:</strong> {selectedBuch.titel.titel}</p>
        <p><strong>ISBN:</strong> {selectedBuch.isbn}</p>
        <p><strong>Rating:</strong> {selectedBuch.rating}</p>
        <p><strong>Art:</strong> {selectedBuch.art}</p>
        <p><strong>Preis:</strong> {selectedBuch.preis} €</p>
        <p><strong>Lieferbar:</strong> {selectedBuch.lieferbar ? 'Ja' : 'Nein'}</p>
        <p><strong>Datum:</strong> {selectedBuch.datum}</p>
        <p><strong>Homepage:</strong> {selectedBuch.homepage || '–'}</p>
        <p><strong>Schlagwörter:</strong> {selectedBuch.schlagwoerter?.join(', ')}</p>
      </>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Schließen
    </Button>
  </Modal.Footer>
</Modal>

    </Container>
  );
}
