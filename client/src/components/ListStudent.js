import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/estudantes')
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar estudantes: ' + error);
      });
  }, []);

  return (
    <div>
      <h2 className='title-name'>Lista de Estudantes</h2>
      <ul className="students-list">
        {students.map((student) => (
          <li className="list-item" key={student.id}>{student.name}, 
          {student.age} anos,
           Id: {student.id},
            Primeira Nota: {student.firstGrade},
            Segunda Nota: {student.secondGrade},
            Nome do Professor: {student.professorName},
            Numero da Sala: {student.classNumber}
            </li>
        ))}
      </ul>
    </div>
  );
}

export default ListStudents;