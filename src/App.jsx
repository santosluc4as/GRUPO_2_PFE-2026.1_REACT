import { Routes, Route } from 'react-router-dom';
import Sobre from './pages/sobre/Sobre';

const App = () => {
  return (
    <Routes>
      {/* Rota principal e fallback direcionadas para a página Sobre */}
      <Route path="/sobre" element={<Sobre />} />
      <Route path="*" element={<Sobre />} />
    </Routes>
  );
};

export default App;

