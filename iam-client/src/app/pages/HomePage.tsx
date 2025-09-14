"use client"

import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import useKeycloak from '../keycloak/useKeycloak';

import {
  useAuthService
} from "../services/AuthService";

const HomePage: React.FC = () => {
  const { keycloak, authenticated } = useKeycloak();
  const { login, logout, getAccessMessage, getUserProfile } = useAuthService();
  const [user, setUser] = useState({ email: "", firstname: "", lastname: "" });
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const testAdminApi = async () => {
    const message = await getAccessMessage();
    if (!message) {
      toast.error("Unauthorized");
      return;
    }
    toast.info(message);
  };

  const getProfile = async () => {
    const profile = await getUserProfile();
    if (!profile) {
      toast.error("Error fetching profile");
      return;
    }
    setUser(profile);
    setIsOpen(true);
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {!authenticated ? <Button onClick={login}>Login</Button> : <Button onClick={getProfile}>Profile</Button>}
              {authenticated && <Button onClick={testAdminApi}>Test admin API</Button>}
              {authenticated && <Button onClick={logout}>Logout</Button>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
        <h1>Spring boot + keycloak mini demo</h1>
        {authenticated ? (
          <div>
            <p>Hello, {keycloak?.tokenParsed?.preferred_username}</p>
          </div>
        ) : (
          <div>
            <p>Please log in to access your personalized content.</p>
          </div>
        )}
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-gray-700">
            <h2 className="text-xl font-bold mb-4">{user.firstname}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>First name:</strong> {user.firstname}</p>
            <p><strong>Last name:</strong> {user.lastname}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default HomePage