"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function generateIsbn13(): string {
  const prefix = "978";
  const registrant = Array.from({ length: 9 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
  const base = prefix + registrant;

  const sum = base
    .split("")
    .map(Number)
    .reduce((acc, digit, idx) => acc + digit * (idx % 2 === 0 ? 1 : 3), 0);
  const checkDigit = (10 - (sum % 10)) % 10;

  return base + checkDigit;
}

function formatIsbn(isbn: string): string {
  // Beispiel-Format: 978-3-16-148410-0
  return `${isbn.slice(0, 3)}-${isbn.slice(3, 4)}-${isbn.slice(
    4,
    7
  )}-${isbn.slice(7, 12)}-${isbn.slice(12)}`;
}

export default function IsbnGenerator() {
  const [isbn, setIsbn] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const raw = generateIsbn13();
    setIsbn(raw);
    setCopied(false); // Kopierstatus zurücksetzen
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(formatIsbn(isbn));
    setCopied(true); // Kopieren Button Feedback
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-4">
      <h5>ISBN-Generator</h5>
      <Button size="sm" onClick={handleGenerate} className="mb-2">
        Neue ISBN erzeugen
      </Button>

      {isbn && (
        <>
          <Form.Control
            type="text"
            readOnly
            value={formatIsbn(isbn)} // Formatierte Ausgabe
            className="mb-2"
          />
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleCopy}
          >
            {copied ? "✔️ Kopiert" : "📋 Kopieren"} {/* Kopieren-Button */}
          </Button>
        </>
      )}
    </div>
  );
}
