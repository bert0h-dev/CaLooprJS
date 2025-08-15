import { useMemo } from 'preact/hooks';
import { useCalendarViewContext } from '@/context/CalendarViewContext.jsx';

// Hook que se utiliza como helper para el calculo de los dias
export const useCalendarHelpers = () => {
  const { currentDate, localization, events } = useCalendarViewContext();

  return useMemo(
    () => ({
      // Generar días del mes
      getMonthDays: (date = currentDate) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const days = [];
        for (let i = 0; i < 42; i++) {
          const day = new Date(startDate);
          day.setDate(startDate.getDate() + i);
          days.push({
            date: day,
            isCurrentMonth: day.getMonth() === date.getMonth(),
            isToday: day.toDateString() === new Date().toDateString(),
            dayNumber: day.getDate(),
          });
        }
        return days;
      },

      // Obtener días de la semana localizados
      getWeekDays: () => {
        const days = [];
        const date = new Date();
        const startOfWeek = localization.firstDayOfWeek || 0;

        // Generamos los días de la semana empezando desde el primer dia especificado
        for (let index = 0; index < 7; index++) {
          const dayIndex = (startOfWeek + index) % 7;

          // Crea una fecha base para obtener los nombres localizados
          const day = new Date(date);
          day.setDate(date.getDate() - date.getDay() + startOfWeek + index);

          // Agrega los dias con formateo de nombres
          days.push({
            index: dayIndex,
            narrow: day.toLocaleDateString(localization.locale, {
              weekday: 'narrow',
            }),
            short: day.toLocaleDateString(localization.locale, {
              weekday: 'short',
            }),
            long: day.toLocaleDateString(localization.locale, {
              weekday: 'long',
            }),
            isWeekend: dayIndex === 0 || dayIndex === 6,
          });
        }

        return days;
      },

      // Formatear fecha
      formatDate: (date, options = {}) => {
        return new Intl.DateTimeFormat(localization.locale, options).format(
          date
        );
      },

      // Verificar si una fecha tiene eventos
      hasEvents: (date, eventList = events.activeEvents) => {
        return eventList.some(
          event => new Date(event.date).toDateString() === date.toDateString()
        );
      },

      // Obtener eventos de una fecha específica
      getEventsForDate: (date, eventList = events.activeEvents) => {
        return eventList.filter(
          event => new Date(event.date).toDateString() === date.toDateString()
        );
      },
    }),
    [currentDate, localization, events]
  );
};
