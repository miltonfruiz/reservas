import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Reservation {
  date: Date;
  time: string;
  userId: string;
  status: string;
}

interface User {
  id: string;
  name: string;
}

const App: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [availability, setAvailability] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      setIsLoggedIn(true);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
      });
      const data = await response.json();
      setIsLoggedIn(false);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetReservations = async () => {
    try {
      const response = await fetch(`${API_URL}/api/reservations`, {
        method: 'GET',
      });
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateReservation = async (reservation: Reservation) => {
    try {
      const response = await fetch(`${API_URL}/api/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservation),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetReservationById = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/reservations/${id}`, {
        method: 'GET',
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateReservation = async (id: string, reservation: Reservation) => {
    try {
      const response = await fetch(`${API_URL}/api/reservations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservation),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteReservation = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/reservations/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetAvailability = async () => {
    try {
      const response = await fetch(`${API_URL}/api/availability`, {
        method: 'GET',
      });
      const data = await response.json();
      setAvailability(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: 'GET',
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetUserById = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/users/${id}`, {
        method: 'GET',
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Sistema de Reservas</h1>
      {isLoggedIn ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleGetReservations}>Get Reservations</button>
          <button onClick={handleGetAvailability}>Get Availability</button>
          <button onClick={handleGetUsers}>Get Users</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;