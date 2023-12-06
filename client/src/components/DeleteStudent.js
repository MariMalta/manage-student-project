import React, { useState } from 'react';
import axios from 'axios';

function DeleteStudent() {
  const [studentId, setStudentId] = useState('');

  const handleDeleteStudent = () => {
    axios.delete(`http://localhost:3001/estudantes/${studentId}`)
      .then((response) => {
        console.log('Estudante deletado com sucesso');
      })
      .catch((error) => {
        console.error('Erro ao deletar estudante: ' + error);
      });
  };

  return (
    <div>
      <h2 className='title-name'>Deletar Estudante</h2>
      <div className="delete-input">
        <input className="delete-id" type="number" placeholder="ID do Estudante" onChange={(e) => setStudentId(e.target.value)} />
      </div>
      <button className='student-button' onClick={handleDeleteStudent}>Deletar Estudante</button>
    </div>
  );
}

export default DeleteStudent;