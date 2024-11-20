import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';

function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000')
      .then(response => {
        const bufferMessage = Buffer.from(response.data.message, 'utf-8');
        setMessage(bufferMessage.toString());
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default Home;