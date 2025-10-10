import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faImage, faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from './ChatBot.module.css'
import botImage from '../assets/fotoBot.png'

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.chatBotContainer}>
      {/* Diálogo de chat */}
      {isOpen && (
        <div className={styles.chatDialog}>
          <div className={styles.chatHeader}>
            <h5>🤖 VitalCoach</h5>
            <button 
              className={styles.closeButton}
              onClick={toggleChat}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className={styles.chatContent}>
            <div className={styles.botMessage}>
              <p>¡Hola! Soy tu asistente personal de hábitos saludables. ¿En qué puedo ayudarte hoy?</p>
            </div>
            <div className={styles.chatInputContainer}>
              <button className={styles.imageButton}>
                <FontAwesomeIcon icon={faImage} />
              </button>
              <input 
                type="text" 
                placeholder="Escribe tu mensaje..."
                className={styles.chatInput}
              />
              <button className={styles.sendButton}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botón flotante del bot */}
      <button 
        className={styles.chatBotButton}
        onClick={toggleChat}
      >
        <img src={botImage} alt="ChatBot" className={styles.botImage} />
      </button>
    </div>
  )
}