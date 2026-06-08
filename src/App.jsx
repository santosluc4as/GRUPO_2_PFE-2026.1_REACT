import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home/Home';
import Sobre from './pages/sobre/Sobre';
import AssocieSe from './pages/associe-se/AssocieSe';
import Newsletter from './pages/newsletter/Newsletter';
import FaqPage from './pages/FAQ/FaqPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/contato" element={<Home />} /> {/* ainda não implementada */}
        <Route path="/insights" element={<Home />} /> {/* ainda não implementada */}
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/associe-se" element={<AssocieSe />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;