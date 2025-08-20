import { useMemo } from 'preact/hooks';
import { useCalendarViewContext } from '@/context/CalendarViewContext.jsx';
import { startMonth, endMonth, isCurrentMonth } from '@/loopr/common/months';
import { startWeek, endWeek } from '@/loopr/common/weeks';
import { isCurrentToday, isWeekendDay } from '@/loopr/common/days';
import { getIntervalDays } from '@/loopr/utils/intervalUtils';

// Hook que se utiliza como helper para el calculo de los dias
export const useCalendarHelpers = () => {
  const { currentDate, localization, events } = useCalendarViewContext();

  return useMemo(
    () => ({
      // Generar días del mes
      getMonthDays: (date = currentDate) => {
        // Se obtiene el primer y ultimo dia del mes
        const monthStart = startMonth(date);
        const monthEnd = endMonth(date);

        // Se obtiene el rango completo de semanas para el calendario
        const calendarStart = startWeek(monthStart, localization);
        const calendarEnd = endWeek(monthEnd, localization);

        // Se obtiene el rango de dias de las fechas
        const allDays = getIntervalDays({
          start: calendarStart,
          end: calendarEnd,
        });

        return allDays.map(objDate => ({
          date: objDate,
          isToday: isCurrentToday(objDate),
          isWeekend: isWeekendDay(objDate),
          isCurrentMonth: isCurrentMonth(objDate, date),
        }));
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
