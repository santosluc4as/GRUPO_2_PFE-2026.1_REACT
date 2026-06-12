import { useState, useEffect } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import "./WhatsAppChat.css";

function WhatsAppChat() {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const phone = "5511997195099";

  const whatsappLink =
    `https://wa.me/${phone}?text=` +
    encodeURIComponent(
      "Olá! Gostaria de mais informações."
    );

  return (
    <div className="wa-container">
      {showMessage && (
        <div className="wa-message">
          <button
            className="wa-close"
            onClick={() => setShowMessage(false)}
          >
            <FaTimes />
          </button>

          <strong>Olá! 👋</strong>
          <p>
            Precisa de ajuda? Fale conosco pelo WhatsApp.
          </p>
        </div>
      )}

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-button"
        aria-label="WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}

export default WhatsAppChat;