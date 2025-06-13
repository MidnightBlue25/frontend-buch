'use client';

import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_BUCH } from '@/graphql/createBuch';

export default function AddBookPage() {
  const [formData, setFormData] = useState({
    isbn: '978-1-491-95035-7',
    rating: 3,
    art: 'EPUB',
    preis: 19.99,
    rabatt: 0.0,
    lieferbar: true,
    datum: '2022-02-28',
    homepage: '',
    schlagwoerter: '',
    titel: { titel: '' },
    abbildungen: [], // optional: leer lassen
  });

  const [createBuch, { data, loading, error }] = useMutation(CREATE_BUCH);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    let newValue: string | number | boolean = value;
    if (['rating'].includes(name)) {
      newValue = parseInt(value);
    } else if (['preis', 'rabatt'].includes(name)) {
      newValue = parseFloat(value);
    } else if (name === 'lieferbar') {
      newValue = value === 'true';
    } else if (name === 'titel') {
      setFormData((prev) => ({
        ...prev,
        titel: { titel: value },
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const input = {
      ...formData,
      schlagwoerter: formData.schlagwoerter
        .split(',')
        .map((wort) => wort.trim())
        .filter((wort) => wort !== ''),
    };

    try {
      const result = await createBuch({ variables: { input } });
      console.log('Buch erfolgreich erstellt:', result.data.create.id);
    } catch (err) {
      console.error('Fehler beim Erstellen:', err);
    }
  };

  return (
    <Container className="mt-5 pb-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2>Neues Buch anlegen</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-3 mb-3" controlId="formTitel">
              <Form.Label>Titel</Form.Label>
              <Form.Control
                type="text"
                name="titel"
                value={formData.titel.titel}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formISBN">
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRating">
              <Form.Label>Rating (1–5)</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                min={1}
                max={5}
                value={formData.rating}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formArt">
              <Form.Label>Buchart</Form.Label>
              <Form.Select name="art" value={formData.art} onChange={handleChange}>
                <option value="EPUB">EPUB</option>
                <option value="HARDCOVER">HARDCOVER</option>
                <option value="PAPERBACK">PAPERBACK</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPreis">
              <Form.Label>Preis (€)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="preis"
                value={formData.preis}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRabatt">
              <Form.Label>Rabatt (%)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="rabatt"
                value={formData.rabatt}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLieferbar">
              <Form.Label>Lieferbar</Form.Label>
              <Form.Select name="lieferbar" value={formData.lieferbar.toString()} onChange={handleChange}>
                <option value="true">Ja</option>
                <option value="false">Nein</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDatum">
              <Form.Label>Veröffentlichungsdatum</Form.Label>
              <Form.Control
                type="text"
                name="datum"
                placeholder="z. B. 2024-01-01"
                value={formData.datum}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formHomepage">
              <Form.Label>Homepage</Form.Label>
              <Form.Control
                type="url"
                name="homepage"
                placeholder="https://..."
                value={formData.homepage}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSchlagwoerter">
              <Form.Label>Schlagwörter (Komma-getrennt)</Form.Label>
              <Form.Control
                type="text"
                name="schlagwoerter"
                value={formData.schlagwoerter}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Speichert...' : 'Buch anlegen'}
            </Button>

            {error && <p className="text-danger mt-3">Fehler: {error.message}</p>}
            {data && <p className="text-success mt-3">Buch erfolgreich angelegt!</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
