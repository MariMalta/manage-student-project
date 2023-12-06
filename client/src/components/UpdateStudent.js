import React, { useState } from 'react';
import axios from 'axios';
import InputForm from './InputForm';

function UpdateStudent() {
  const [student, setStudent] = useState({
    id: '',
    name: '',
    age: '',
    firstGrade: '',
    secondGrade: '',
    professorName: '',
    classNumber: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleUpdateStudent = () => {
    axios.put(`http://localhost:3001/estudantes/${student.id}`, student)
      .then((response) => {
        console.log('Estudante atualizado com sucesso');
      })
      .catch((error) => {
        console.error('Erro ao atualizar estudante: ' + error);
      });
  };

  return (
    <div>
      <h2 className='title-name'>Atualizar Estudante</h2>
      <div className='input-form'>
        {InputForm(handleInputChange)}
      </div>
      <button className='student-button' onClick={handleUpdateStudent}>Atualizar Estudante</button>
    </div>
  );
}

export default UpdateStudent;