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

        // Agregar mensaje del usuario
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
            // Llamar a la API de Gemini
            const response = await fetch('http://localhost:3001/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    message: `Eres un asistente de bienestar llamado GestHabit. Responde de forma amigable, breve y útil sobre temas de: hidratación, meditación, ejercicio y sueño. Pregunta del usuario: ${inputMessage}` 
                }),
            });

            const data = await response.json();

            // Agregar respuesta del bot
            const botResponse = {
                id: Date.now() + 1,
                text: data.text || "Lo siento, hubo un error al procesar tu mensaje.",
                isBot: true,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            console.error('Error al conectar con Gemini:', error);
            
            // Mensaje de error
            const errorMessage = {
                id: Date.now() + 1,
                text: "❌ No pude conectarme al servidor. Por favor, verifica que el servidor esté corriendo en http://localhost:3001",
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