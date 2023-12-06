import AddStudent from './components/AddStudent';
import ListStudents from './components/ListStudent';
import UpdateStudent from './components/UpdateStudent';
import DeleteStudent from './components/DeleteStudent';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='studant-form'>
        <AddStudent />
        <UpdateStudent />
        <DeleteStudent />       
        <ListStudents />
      </div>
    </div>
  );
}

export default App;
