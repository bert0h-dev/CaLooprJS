import { useState, useRef } from 'preact/hooks';

// Hook para el manejo de la fecha en el calendario
export const useCalendarDate = (defaultDate, dispatch) => {
  const [currentDate, setCurrentDate] = useState(defaultDate);

  //Se genera el controller de manejo
  const controller = useRef({
    getDate: () => currentDate,
    setDate: date => {
      setCurrentDate(date);
    },
    goToToday: () => {
      const today = new Date();
      setCurrentDate(today);
    },
    goToDate: targetDate => {
      const newDate = new Date(targetDate);
      setCurrentDate(newDate);
    },
  });

  return [currentDate, controller.current];
};
