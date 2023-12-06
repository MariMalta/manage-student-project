function InputForm (handleInputChange) {

  return (
    <div>
      <div className='input-form'>
        <input type="number" name="id" placeholder="ID do Estudante" onChange={handleInputChange} />
        <input type="text" name="name" placeholder="Nome" onChange={handleInputChange} />
        <input type="number" name="age" placeholder="Idade" onChange={handleInputChange} />
        <input type="number" name="firstGrade" placeholder="Primeira Nota" onChange={handleInputChange} />
        <input type="number" name="secondGrade" placeholder="Segunda Nota" onChange={handleInputChange} />
        <input type="text" name="professorName" placeholder="Nome do Professor" onChange={handleInputChange} />
        <input type="number" name="classNumber" placeholder="Numero da Sala" onChange={handleInputChange} />
      </div>
    </div>
  )
}

export default InputForm;