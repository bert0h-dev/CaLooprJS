import { h } from 'preact';
import { useCalendarViewContext } from '@/context/CalendarViewContext.jsx';
import { useLazyViews } from '@/hooks/useLazyViews.js';

export const CalendarViews = () => {
  // Obtiene del contexto la vista actual
  const { calendar } = useCalendarViewContext();

  // Obtiene la vista para que solo carge la que se este trabajando
  const LazyComponent = useLazyViews(calendar.activeView);

  // Retorna la vista
  return (
    <main className='animate-fade-in'>
      <LazyComponent />
    </main>
  );
};
