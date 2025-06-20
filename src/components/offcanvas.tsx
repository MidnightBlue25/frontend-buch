'use client';

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { RxHamburgerMenu } from 'react-icons/rx';
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
          {/* <h5>Tools</h5>  {/* → Überschrift */}
          <IsbnGenerator />
          <br />
          <p>&quot;Hier werden noch Sachen folgen.&quot; – Developer</p>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
