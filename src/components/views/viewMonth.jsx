import { h } from 'preact';
import { useCalendarViewContext } from '@/context/CalendarViewContext.jsx';
import { useCalendarHelpers } from '@/hooks/useCalendarHelpers.js';

export const ViewMonth = () => {
  const { currentDate } = useCalendarViewContext();
  const { getMonthDays, getWeekDays, hasEvents } = useCalendarHelpers();

  // Se usa el helper para generar los dias del mes
  // Se usa el helper para tomar los dias de la semana
  const monthDays = getMonthDays(currentDate);
  const weekDays = getWeekDays();

  console.log('Dias del mes', monthDays);
  console.log('Dias de la semana', weekDays);

  return (
    <div>
      <h2>Vista de Mes</h2>
    </div>
  );
};
