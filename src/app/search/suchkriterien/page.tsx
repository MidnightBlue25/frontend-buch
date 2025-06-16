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

// ==================== 第 1 部分：GraphQL 查询语句 ====================
// GraphQL 查询名为 `Suche`，带一个输入参数 `suchkriterien`（对象）
// 后端会根据这个对象进行数据库搜索，并返回图书数组 buecher,也就是说这里的会影响他能找到什么。如果这里没有isbn那么他搜出来的isbn也是空的
const QUERY = gql`
  query Suche($suchkriterien: SuchkriterienInput) {
    buecher(suchkriterien: $suchkriterien) {
      isbn
      art
      preis
      schlagwoerter
      titel {
        titel
      }
    }
  }
`;

// ==================== 第 2 部分：图书类型定义（匹配 GraphQL 返回数据） ====================
//这些字段是我“期望”从后端拿到的内容。
type Buch = {
  isbn: string;
  art: string;
  preis: number;
  schlagwoerter: string[];
  titel: {
    titel: string;
  };
};

// ==================== 第 3 部分：React 组件 ====================
export default function SuchkriterienPage() {
  // --- 搜索条件的状态变量（用户输入什么就存到这些变量里） ---
  const [isbn, setISBN] = useState("");
  const [titel, setTitel] = useState("");
  const [art, setArt] = useState("");
  const [lieferbar, setLieferbar] = useState("");
  const [schlagwoerter, setSchlagwoerter] = useState<string[]>([]);

  const toggleSchlagwort = (wert: string) => {
  setSchlagwoerter((prev) =>
    prev.includes(wert)
      ? prev.filter((w) => w !== wert)
      : [...prev, wert]
  );
};
  // --- 查询执行器：调用 search() 会发送 GraphQL 请求 ---
  const [search, { data, loading, error }] = useLazyQuery<{ buecher: Buch[] }>(QUERY);

  // ==================== 第 4 部分：点击“搜索”时的处理函数 ====================
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 阻止表单默认提交行为（防止页面刷新）

    // 构造 suchkriterien 对象，只有填写的字段才会被传给后端
    search({
      variables: {
        suchkriterien: {
          isbn: isbn || undefined, // 如果输入为空，则传 undefined
          titel: titel || undefined,
          art: art || undefined,
          lieferbar:
            lieferbar === "" ? undefined : lieferbar === "true",
          schlagwoerter: schlagwoerter.length > 0 ? schlagwoerter : undefined,
        },
      },
    });
  };

  // ==================== 第 5 部分：前端页面展示 ====================
  return (
    <Container className="mt-5" style={{ maxWidth: "720px" }}>
    <Breadcrumb>
      <Breadcrumb.Item href="/">Startseite</Breadcrumb.Item>
      <Breadcrumb.Item href="/search">
        Suchen
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Suchkriterien</Breadcrumb.Item>
    </Breadcrumb>


      <h2 className="mb-4 text-center">🔍 Suche mit Kriterien</h2>

      {/* 搜索表单 */}
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
        name="art" // 所有 radio 的 name 必须一样才能单选
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
  <Form.Label>Schlagwört</Form.Label>
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

        <Button variant="primary" type="submit">
          🔎 Suchen
        </Button>
      </Form>

      {/* 加载状态 */}
      {loading && (
        <div className="text-center mt-4">
        <Spinner animation="border" />
        </div>
      )}

      {/* 错误信息 */}
      {error && (
        <Alert variant="danger" className="mt-4">
        Fehler: {error.message}
        </Alert>
      )}

      {/* 显示搜索结果 */}
      {data?.buecher.length ? (
        <Card className="mt-4">
          <Card.Header>Ergebnisse</Card.Header>
          <ListGroup variant="flush">
            {data.buecher.map((buch, index) => (
              <ListGroup.Item key={index}>
                <strong>ISBN:</strong> {buch.isbn}
                |<strong>Title:</strong> {buch.titel.titel}
                |<strong> Art:</strong> {buch.art} 
                |<strong> Preis:</strong> {buch.preis} €
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      ) : (
        data && (
          <p className="mt-4 text-muted text-center">Keine Treffer gefunden.</p>
        )
      )}
    </Container>
  );
}
