import { useState, useEffect } from 'react';
import styles from './CalendarioActividad.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export function CalendarioActividad({ fechaSeleccionada, onFechaChange, actividades = [] }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    useEffect(() => {
        // Asegurar que el mes actual coincida con la fecha seleccionada
        const fechaObj = new Date(fechaSeleccionada);
        if (fechaObj.getMonth() !== currentMonth.getMonth() || 
            fechaObj.getFullYear() !== currentMonth.getFullYear()) {
            setCurrentMonth(new Date(fechaObj.getFullYear(), fechaObj.getMonth(), 1));
        }
    }, [fechaSeleccionada]);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Días del mes anterior para completar la primera semana
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            const prevDate = new Date(year, month, -i);
            days.push({
                date: prevDate,
                isCurrentMonth: false,
                isToday: false,
                isSelected: false,
                hasActividades: false
            });
        }

        // Días del mes actual
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month, day);
            const dateString = currentDate.toISOString().split('T')[0];
            const today = new Date().toISOString().split('T')[0];
            
            days.push({
                date: currentDate,
                isCurrentMonth: true,
                isToday: dateString === today,
                isSelected: dateString === fechaSeleccionada,
                hasActividades: actividades.some(act => act.fecha === dateString)
            });
        }

        // Días del próximo mes para completar la última semana
        const remainingDays = 42 - days.length; // 6 semanas * 7 días
        for (let day = 1; day <= remainingDays; day++) {
            const nextDate = new Date(year, month + 1, day);
            days.push({
                date: nextDate,
                isCurrentMonth: false,
                isToday: false,
                isSelected: false,
                hasActividades: false
            });
        }

        return days;
    };

    const handleDayClick = (day) => {
        if (!day.isCurrentMonth) return;
        
        const dateString = day.date.toISOString().split('T')[0];
        onFechaChange(dateString);
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const formatMonth = (date) => {
        return date.toLocaleDateString('es-ES', { 
            month: 'long', 
            year: 'numeric' 
        });
    };

    const days = getDaysInMonth(currentMonth);
    const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    return (
        <div className={styles.calendarioContainer}>
            {/* Header del calendario */}
            <div className={styles.calendarioHeader}>
                <button 
                    className={styles.navButton}
                    onClick={handlePrevMonth}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                
                <h3 className={styles.monthTitle}>
                    {formatMonth(currentMonth)}
                </h3>
                
                <button 
                    className={styles.navButton}
                    onClick={handleNextMonth}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>

            {/* Días de la semana */}
            <div className={styles.weekDaysGrid}>
                {weekDays.map((day) => (
                    <div key={day} className={styles.weekDay}>
                        {day}
                    </div>
                ))}
            </div>

            {/* Grid de días */}
            <div className={styles.daysGrid}>
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`
                            ${styles.dayCell} 
                            ${!day.isCurrentMonth ? styles.otherMonth : ''}
                            ${day.isToday ? styles.today : ''}
                            ${day.isSelected ? styles.selected : ''}
                            ${day.hasActividades ? styles.hasActividades : ''}
                        `}
                        onClick={() => handleDayClick(day)}
                    >
                        <span className={styles.dayNumber}>
                            {day.date.getDate()}
                        </span>
                        {day.hasActividades && (
                            <div className={styles.actividadIndicator}></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}