import { Routes, Route } from 'react-router-dom';
import Sobre from './pages/sobre/Sobre';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/sobre" element={<Sobre />} />
        <Route path="*" element={<Sobre />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

