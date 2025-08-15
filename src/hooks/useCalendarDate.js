import { useState, useRef, useCallback } from 'preact/hooks';

// Hook para el manejo de la fecha en el calendario
export const useCalendarDate = defaultDate => {
  const [currentDate, setCurrentDate] = useState(defaultDate);

  // Se genera el controller de manejo
  // Usa useCallback para optimizar
  const controller = useRef({
    getDate: () => currentDate,
    setDate: useCallback(date => {
      setCurrentDate(new Date(date));
    }, []),
    goToToday: useCallback(() => {
      setCurrentDate(new Date());
    }, []),
    goToDate: useCallback(targetDate => {
      setCurrentDate(new Date(targetDate));
    }, []),
    navigateMonth: useCallback(direction => {
      setCurrentDate(prevDate => {
        const newDate = new Date(prevDate);
        newDate.setMonth(newDate.getMonth() + direction);
        return newDate;
      });
    }, []),
    navigateYear: useCallback(direction => {
      setCurrentDate(prevDate => {
        const newDate = new Date(prevDate);
        newDate.setFullYear(newDate.getFullYear() + direction);
        return newDate;
      });
    }, []),
  });

  // Actualizar el ref cuando currentDate cambie
  controller.current.getDate = () => currentDate;

  return [currentDate, controller.current];
};
