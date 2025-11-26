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
    const [isLoading, setIsLoading] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (inputMessage.trim() === '' || isLoading) return;

        // Mensaje del usuario
        const userMessage = {
            id: Date.now(),
            text: inputMessage,
            isBot: false,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            // 👉 URL CORREGIDA
            const response = await fetch('https://backend-f4ls.onrender.com/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    message: `Eres un asistente de bienestar llamado GestHabit. Responde de forma amigable, breve y útil sobre temas de: hidratación, meditación, ejercicio y sueño. Pregunta del usuario: ${inputMessage}` 
                }),
            });

            const data = await response.json();

            // Mensaje del bot
            const botResponse = {
                id: Date.now() + 1,
                text: data.text || "Lo siento, hubo un error al procesar tu mensaje.",
                isBot: true,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            console.error('Error al conectar con Gemini:', error);

            const errorMessage = {
                id: Date.now() + 1,
                text: "❌ No pude conectarme al servidor de producción. Intenta nuevamente.",
                isBot: true,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={styles.chatBotContainer}>
            <div className={styles.chatBotButton} onClick={toggleChat}>
                <img src={fotoBot} alt="ChatBot" className={styles.botAvatar} />
            </div>

            {isOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.chatHeader}>
                        <div className={styles.headerInfo}>
                            <img src={fotoBot} alt="Bot" className={styles.headerAvatar} />
                            <div>
                                <h4>Asistente GestHabit</h4>
                                <span className={styles.statusIndicator}>
                                    {isLoading ? '⏳ Escribiendo...' : '✅ En línea'}
                                </span>
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
                            placeholder={isLoading ? "Esperando respuesta..." : "Escribe tu mensaje..."}
                            className={styles.messageInput}
                            disabled={isLoading}
                        />
                        <button 
                            type="submit" 
                            className={styles.sendButton}
                            disabled={isLoading}
                        >
                            {isLoading ? '⏳' : 'Enviar'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
