import { h } from 'preact';
import { MonthHeader } from '@/components/viewsMonth/MonthHeader.jsx';

export const ViewMonth = () => {
  return (
    <div className='view-month animate-slide-in-up'>
      <MonthHeader />
    </div>
  );
};
