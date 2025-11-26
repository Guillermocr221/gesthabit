import { useState } from 'react';
import styles from './ChatBot.module.css';
import fotoBot from '../assets/fotoBot.png';

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "¡Hola! Soy tu asistente de bienestar. ¿En qué puedo ayudarte hoy?",
            isBot: true,
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim() === '') return;

        // Agregar mensaje del usuario
        const userMessage = {
            id: Date.now(),
            text: inputMessage,
            isBot: false,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);

        // Simular respuesta del bot (por ahora solo HTML básico)
        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                text: getBotResponse(inputMessage),
                isBot: true,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1000);

        setInputMessage('');
    };

    const getBotResponse = (message) => {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hidratacion') || lowerMessage.includes('agua')) {
            return "💧 Excelente pregunta sobre hidratación. Te recomiendo beber al menos 2 litros de agua al día. ¿Has probado poner recordatorios en tu teléfono?";
        }
        if (lowerMessage.includes('meditacion') || lowerMessage.includes('relajacion')) {
            return "🧘‍♀️ La meditación es muy beneficiosa. Te sugiero empezar con 5-10 minutos al día. ¿Te gustaría que te recomiende algunas técnicas básicas?";
        }
        if (lowerMessage.includes('ejercicio') || lowerMessage.includes('deporte')) {
            return "🏃‍♂️ ¡Perfecto! El ejercicio es clave para el bienestar. Te recomiendo empezar con 30 minutos de actividad moderada al día. ¿Qué tipo de ejercicio prefieres?";
        }
        if (lowerMessage.includes('sueño') || lowerMessage.includes('dormir')) {
            return "😴 El descanso es fundamental. Intenta mantener un horario regular de sueño y dormir 7-8 horas. ¿Tienes problemas para conciliar el sueño?";
        }
        
        return "Gracias por tu mensaje. Estoy aquí para ayudarte con consejos sobre hidratación, meditación, ejercicio y descanso. ¿Sobre qué tema te gustaría conversar?";
    };

    const formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={styles.chatBotContainer}>
            {/* Botón flotante del ChatBot */}
            <div className={styles.chatBotButton} onClick={toggleChat}>
                <img src={fotoBot} alt="ChatBot" className={styles.botAvatar} />
            </div>

            {/* Ventana del chat */}
            {isOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.chatHeader}>
                        <div className={styles.headerInfo}>
                            <img src={fotoBot} alt="Bot" className={styles.headerAvatar} />
                            <div>
                                <h4>Asistente GestHabit</h4>
                                <span>En línea</span>
                            </div>
                        </div>
                        <button className={styles.closeButton} onClick={toggleChat}>
                            ✕
                        </button>
                    </div>

                    <div className={styles.chatMessages}>
                        {messages.map((message) => (
                            <div 
                                key={message.id} 
                                className={`${styles.message} ${message.isBot ? styles.botMessage : styles.userMessage}`}
                            >
                                {message.isBot && (
                                    <img src={fotoBot} alt="Bot" className={styles.messageAvatar} />
                                )}
                                <div className={styles.messageContent}>
                                    <p>{message.text}</p>
                                    <span className={styles.messageTime}>
                                        {formatTime(message.timestamp)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <form className={styles.chatInput} onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Escribe tu mensaje..."
                            className={styles.messageInput}
                        />
                        <button type="submit" className={styles.sendButton}>
                            Enviar
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}