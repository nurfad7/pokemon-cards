import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Detail from './pages/Detail';

function App() {
  return (
    <div className='w-full'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detail/:name' element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App;
