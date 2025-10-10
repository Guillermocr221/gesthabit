import { useState } from 'react';
import styles from './CalendarioActividad.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export function CalendarioActividad({ selectedDate, onDateSelect }) {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const meses = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const diasSemana = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    // Obtener días del mes
    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Obtener el primer día de la semana del mes
    const getFirstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

    // Crear array de días
    const days = [];
    
    // Días del mes anterior (espacios vacíos)
    for (let i = 0; i < firstDay; i++) {
        const prevMonthDays = getDaysInMonth(currentMonth - 1, currentYear);
        days.push({
            day: prevMonthDays - firstDay + i + 1,
            isCurrentMonth: false,
            isToday: false
        });
    }

    // Días del mes actual
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === today.getDate() && 
                       currentMonth === today.getMonth() && 
                       currentYear === today.getFullYear();
        
        days.push({
            day,
            isCurrentMonth: true,
            isToday
        });
    }

    // Días del próximo mes para completar la grilla
    const totalCells = 42; // 6 semanas × 7 días
    const remainingCells = totalCells - days.length;
    for (let day = 1; day <= remainingCells; day++) {
        days.push({
            day,
            isCurrentMonth: false,
            isToday: false
        });
    }

    const handleDayClick = (day) => {
        if (day.isCurrentMonth) {
            const newDate = new Date(currentYear, currentMonth, day.day);
            onDateSelect(newDate);
        }
    };

    return (
        <div className={styles.calendarioContainer}>
            {/* Header del calendario */}
            <div className={styles.calendarioHeader}>
                <div className={styles.yearMonth}>
                    <span className={styles.year}>{currentYear}</span>
                    <div className={styles.monthSelector}>
                        <span className={styles.month}>{meses[currentMonth]}</span>
                        <FontAwesomeIcon icon={faChevronDown} className={styles.chevron} />
                    </div>
                </div>
            </div>

            {/* Días de la semana */}
            <div className={styles.diasSemana}>
                {diasSemana.map(dia => (
                    <div key={dia} className={styles.diaSemana}>
                        {dia}
                    </div>
                ))}
            </div>

            {/* Grilla de días */}
            <div className={styles.diasGrid}>
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`${styles.dia} ${
                            !day.isCurrentMonth ? styles.diaOtroMes : ''
                        } ${day.isToday ? styles.diaHoy : ''}`}
                        onClick={() => handleDayClick(day)}
                    >
                        {day.day}
                    </div>
                ))}
            </div>
        </div>
    );
}