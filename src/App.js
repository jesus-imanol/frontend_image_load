import React, { useState } from 'react';
import './App.css';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');

  const url = 'http://localhost:8000/api'

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Creamos un formData para crear el body de la petición (el resultado será un JSON)
    const formData = new FormData();
    //Añadimos los datos que vayamos a guardar, en mi caso nomas un string como name
    formData.append('name', name);
    //Añadimos la imagen que obtuvimos del input file
    formData.append('productImage', file);

    try {
      const response = await fetch(url+'/products', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <input type="text" value={name} onChange={handleNameChange} placeholder="Name" />
        <button type="submit">Upload</button>
      </form>
      <div>
        <p>Uploaded file:</p>
        <img src='http://localhost:8000/uploads/1721360149636-as.jpeg' alt="Uploaded file" style={{ maxWidth: '500px', maxHeight: '500px' }} />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <UploadForm />
    </div>
  );
};

export default App;