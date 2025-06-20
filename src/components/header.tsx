import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Link from 'next/link';
import SimpleOffcanvas from '@/components/offcanvas';
import ToggleButton from '@/components/toggle-button';
import HeaderLoginButton from '@/components/header-loginButton';

export default function Header() {
  return (
    <div>
      {/* Navbar: Navigationsleiste oben auf der Seite, z.B. für Logo, Links, Suche, Buttons */}
      <Navbar expand="lg" className="bg-dark navbar-dark">
        {/* Container: sorgt für einen zentrierten Inhalt mit automatischen Seitenabständen */}
        <Container>
          {/* Nav: Container für eine Gruppe von Navigationslinks */}
          <Nav className="me-auto fs-2 fw-bold">
            <Link href="/" className="nav-link">
              Startseite
            </Link>
          </Nav>
          <Nav className="ms-auto fs-4 align-items-center">
            <Link href="/search" className="nav-link">
              Suche
            </Link>
            <Link href="/add" className="nav-link">
              Neu
            </Link>
            <div style={{ width: '2rem' }}></div> {/* Abstand */}
            <HeaderLoginButton />
            {/* Offcanvas-Button und Sidebar */}
            <SimpleOffcanvas />
            <div style={{ marginLeft: '1rem' }}>
              <ToggleButton />
            </div>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
