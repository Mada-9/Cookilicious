import { useState, useRef, useEffect } from "react";
import "./chatbot.css";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();

 const sendMessage = () => {
  const text = inputRef.current.value.trim();
  if (!text) return;

  // Ajoute le message utilisateur
  setMessages((prev) => [...prev, { from: "user", text }]);

  // Trouve la bonne réponse selon les mots-clés
  const botReply = getBotAnswer(text);

  // Ajoute la réponse du bot
  setTimeout(() => {
    setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
  }, 400);

  inputRef.current.value = "";
};


  // Base de connaissances du chatbot
const knowledgeBase = [
    {
    keywords: ["bonjour"],
    answer: "Bonjour!"
  },
  {
    keywords: ["prix", "tarif", "coût", "combien"],
    answer: "Nos tarifs dépendent du cokie choisi. Contacte-nous pour une estimation précise 😊"
  },
  {
    keywords: ["contact", "email", "joindre"],
    answer: "Tu peux nous contacter directement via la page contact ou par email : contact@tonsite.com 📩"
  },
  {
    keywords: ["horaires", "heure", "ouverture"],
    answer: "Nous sommes ouverts du lundi au vendredi de 9h à 18h."
  },
  {
    keywords: ["inscription", "s'inscrire", "account", "connexion"],
    answer: "Pour t'inscrire, rends-toi sur la page d'inscription en haut du site ✨"
  },
  {
    keywords: ["aide", "support"],
    answer: "Je suis là pour t'aider 😄 Pose-moi ta question !"
  }
];

// Fonction qui trouve la meilleure réponse
function getBotAnswer(userInput) {
  const text = userInput.toLowerCase();

  for (const item of knowledgeBase) {
    if (item.keywords.some((kw) => text.includes(kw.toLowerCase()))) {
      return item.answer;
    }
  }

  return "Je ne suis pas sûr d'avoir compris 😅 Peux-tu reformuler ?";
}

  return (
    <>
      {/* Bouton flottant */}
      <div id="chatbot-button" onClick={() => setOpen(!open)}>
        💬
      </div>

      {/* Fenêtre */}
      <div id="chatbot-window" className={open ? "active" : ""}>
        <div id="chatbot-header">Chatbot</div>

        <div id="chatbot-messages">
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.from}`}>
              <strong>{m.from === "user" ? "Toi:" : "Bot:"}</strong> {m.text}
            </div>
          ))}
        </div>

        <div id="chatbot-input-area">
          <input
            id="chatbot-input"
            ref={inputRef}
            type="text"
            placeholder="Écris…"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button id="chatbot-send" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}
