import React, { useState, useEffect } from 'react';

import ThoughtList from 'components/ThoughtList';
import ThoughtForm from 'components/ThoughtForm';

// const API_URL = 'https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/'
const API_URL = 'https://project-happy-thoughts-api-ircjrh2jfq-lz.a.run.app/'

// PREVIOUSLY App.js from Happy Thoughts
export const ThoughtsApp = () => {
  const [thoughtList, setThoughtList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newThought, setNewThought] = useState('');

  const fetchThoughts = () => {
    setLoading(true);
    fetch(`${API_URL}thoughts`)
      .then((res) => res.json())
      .then((data) => setThoughtList(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchThoughts();
  }, []);

  const handleNewLikeChange = (_id) => {
    const options = { method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      } }
    fetch(`${API_URL}thoughts/${_id}/like`, options)
      .then((res) => res.json())
      .then(() => fetchThoughts())
  }

  const handleNewThoughtChange = (event) => {
    setNewThought(event.target.value)
  }

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: newThought
      })
    }

    fetch(`${API_URL}thoughts`, options)
      .then((res) => res.json())
      .then(() => fetchThoughts())
      .finally(() => setNewThought(''));
    // .catch((err) => console.error(err));
  }
  return (
    <div>
      <ThoughtForm
        newThought={newThought}
        onNewThoughtChange={handleNewThoughtChange}
        onFormSubmit={onFormSubmit} />
      <ThoughtList
        loading={loading}
        thoughtList={thoughtList}
        setThoughtList={setThoughtList}
        handleNewLikeChange={handleNewLikeChange} />
    </div>
  );
}