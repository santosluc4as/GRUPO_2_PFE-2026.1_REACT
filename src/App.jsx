import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home/Home';
import Sobre from './pages/sobre/Sobre';
import ConselheiroPage from './pages/sobre/ConselheiroPage';
import AssocieSe from './pages/Associe-se/AssocieSe';
import Newsletter from './pages/newsletter/Newsletter';
import Contato from './pages/Contato/Contato';
import FaqPage from './pages/FAQ/FaqPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import Insights from './pages/Insights/Insights';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BotaoTopo from './components/BotaoTopo';
import {useBarraProgresso} from './hooks/useBarraProgresso';
import WhatsAppChat from "./components/WhatsappChat/WhatsAppChat";
const App = () => {
  const { pathname, hash } = useLocation();

  useBarraProgresso();

  useEffect(() => {
    if (hash) {
      // Aguarda breve instante para o DOM renderizar, depois rola até o elemento
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/sobre/:slug" element={<ConselheiroPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/associe-se" element={<AssocieSe />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <BotaoTopo />
      <WhatsAppChat />
    </>
  );
};

export default App;