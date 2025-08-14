import { h } from 'preact';
import { useCalendarViewContext } from '@/context/CalendarViewContext.jsx';
import { CalendarHeader } from '@/components/common/CalendarHeader.jsx';

export const CalendarContent = () => {
  const objContext = useCalendarViewContext();
  console.log('Contexto del Calendario:', objContext);

  return (
    <div className='container mx-auto p-4'>
      <CalendarHeader />
    </div>
  );
};
