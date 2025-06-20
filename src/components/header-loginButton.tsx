'use client';

import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { TbLogin, TbLogout } from 'react-icons/tb';

export default function HeaderLoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [showLogoutSuccess, setShowLogoutSuccess] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    const justLoggedIn = localStorage.getItem('justLoggedIn');
    if (justLoggedIn === 'true') {
      setShowLoginSuccess(true);
      setTimeout(() => {
        setShowLoginSuccess(false);
        localStorage.removeItem('justLoggedIn');
      }, 3000);
    }
  }, []);

  const handleLogout = () => setShowLogoutConfirm(true);
  const cancelLogout = () => setShowLogoutConfirm(false);

  const confirmLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    setShowLogoutConfirm(false);
    setShowLogoutSuccess(true);
    setTimeout(() => setShowLogoutSuccess(false), 3000);
  };

  const handleLoginClick = () => router.push('/login');

  return (
    <div style={{ position: 'relative' }}>
      <Button
        variant={isLoggedIn ? 'outline-danger' : 'outline-primary'}
        className="px-3 py-1 d-flex align-items-center gap-2"
        onClick={isLoggedIn ? handleLogout : handleLoginClick}
      >
        {/* icon von login und logout */}
        {isLoggedIn ? (
          <>
            <TbLogout size={18} />
            Logout
          </>
        ) : (
          <>
            <TbLogin size={18} />
            Login
          </>
        )}
      </Button>

      {/* login nachricht */}
      {showLoginSuccess && (
        <div
          className="position-absolute top-100 mt-1 start-50 translate-middle-x px-3 py-2 bg-success text-white rounded shadow text-nowrap"
          style={{ fontSize: '0.9rem', zIndex: 9999 }}
        >
          Erfolgreich eingeloggt!
        </div>
      )}

      {/* logout nachricht */}
      {showLogoutSuccess && (
        <div
          className="position-absolute top-100 mt-1 start-50 translate-middle-x px-3 py-2 bg-info text-white rounded shadow text-nowrap"
          style={{ fontSize: '0.9rem', zIndex: 9999 }}
        >
          Erfolgreich ausgeloggt!
        </div>
      )}

      <Modal show={showLogoutConfirm} onHide={cancelLogout} centered>
        <Modal.Header closeButton>
          <Modal.Title>Abmelden bestätigen</Modal.Title>
        </Modal.Header>
        <Modal.Body>Willst du dich wirklich ausloggen?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelLogout}>
            Nein
          </Button>
          <Button variant="danger" onClick={confirmLogout}>
            Ja
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
