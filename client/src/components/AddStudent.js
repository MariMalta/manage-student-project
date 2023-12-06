import React, { useState } from 'react';
import InputForm from './InputForm';
import axios from 'axios';

function AddStudent() {
  const [student, setStudent] = useState({
    name: '',
    age: '',
    id:'',
    firstGrade: '',
    secondGrade: '',
    professorName: '',
    classNumber: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleAddStudent = () => {
    axios.post('http://localhost:3001/estudantes', student)
      .then((response) => {
        console.log('Estudante adicionado com sucesso');
      })
      .catch((error) => {
        console.error('Erro ao adicionar estudante: ' + error);
        alert("Verifique se o ID está corretor. Não é permitido IDs repetidos");
      });
  };

  return (
    <div>
      <h2 className='title-name'>Adicionar Estudante</h2>
      <div className='input-form'>
        {InputForm(handleInputChange)}
      </div>
      <button className='student-button' onClick={handleAddStudent}>Adicionar Estudante</button>
    </div>
  );
}

export default AddStudent;