import { h } from 'preact';
import { useCalendarHelpers } from '@/hooks/useCalendarHelpers';

export const MonthHeader = () => {
  const { getWeekDays } = useCalendarHelpers();
  const weekDays = getWeekDays();

  return (
    <div className='relative grid grid-cols-7'>
      {weekDays.map(day => {
        return (
          <div
            className={`view-month-header-name text-center text-sm font-semibold relative py-3 bg-secondary ${day.isWeekend ? 'text-error font-bold' : ''}`}
            key={day.index}
          >
            {day.long}
          </div>
        );
      })}
    </div>
  );
};
