'use client';

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaGithub } from "react-icons/fa";
import { SiReactbootstrap } from "react-icons/si";
import { SiNextdotjs } from "react-icons/si";
import IsbnGenerator from './isbnGenerator';

export default function SimpleOffcanvas() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow} className="ms-4">
        <RxHamburgerMenu />
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sidebar</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <IsbnGenerator />
          <hr />
          <div className="mt-2">
            <a
              href="https://github.com/MidnightBlue25/frontend-buch"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center gap-2 mb-2"
            >
              <FaGithub size={24} />
              Zum GitHub-Projekt
            </a>
            <hr />
            <p className="fw-semibold mb-2">Projekt erstellt mit:</p>
            <a
              href="https://nextjs.org/docs/app/getting-started/installation"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center gap-2 mb-2"
            >
              <SiNextdotjs size={24} />
              Next.js
            </a>
            <a
              href="https://react-bootstrap.netlify.app/docs/getting-started/introduction"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center gap-2"
            >
              <SiReactbootstrap size={24} />
              React Bootstrap
            </a>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
