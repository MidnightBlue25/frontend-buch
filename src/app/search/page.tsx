"use client";

export const dynamic = "force-dynamic";

import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";

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

  const handleSearch = () => {
    if (id.trim() !== "") {
      search({ variables: { id: Number(id) } });
    }
  };
  const buch = data?.buch;

  return (
    <div>
        <h1 className="text-2xl font-bold mb-4">Buch Details</h1>
        <input
        type="text"
        className="border p-2 w-full mb-2"
        placeholder="Gib eine Buch-ID ein z.B. 1"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSearch}
      >
        Suchen
      </button>
        {loading && <p>Lade Daten...</p>}
        {error && <p>Fehler beim Laden der Daten: {error.message}</p>}
    {buch ? (
        <ul className="list-disc ml-4">
          <li><strong>ISBN:</strong> {buch.isbn}</li>
          <li><strong>version:</strong> {buch.version}</li>
          <li><strong>rating:</strong> {buch.rating}</li>
          <li><strong>art:</strong> {buch.art}</li>
          <li><strong>preis:</strong> {buch.preis}</li>
          <li><strong>lieferbar:</strong> {buch.lieferbar}</li>
          <li><strong>datum:</strong> {buch.datum}</li>
          <li><strong>homepage:</strong> {buch.homepage}</li>
          <li><strong>schlagwoerter:</strong> {buch.schlagwoerter}</li>
          <li><strong>titel:</strong> {buch.titel.titel}</li>
          <li><strong>rabatt:</strong> {buch.rabatt}</li>
        </ul>
      ) : (
        <p>Keine Daten gefunden.</p>
      )}
    </div> )
};