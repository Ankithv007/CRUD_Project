import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateBook from './CreateBook';
import Books from './Books';
import { Updatebook } from './Updatebook';
import Nav from './Nav';

function App() {
  return (
    <BrowserRouter>
     <Nav />
      <Routes>
        <Route path='/' element={<Books />} />
        <Route path='/create' element={<CreateBook />} />
        <Route path='/update/:id' element={<Updatebook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
