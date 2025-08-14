import { h } from 'preact';
import { CalendarViewProvider } from '@/context/CalendarViewContext.jsx';
import { CalendarContent } from '@/components/common/CalendarContent.jsx';

export const CalendarApp = ({ config = {} }) => {
  return (
    <CalendarViewProvider initialConfig={config}>
      <CalendarContent />
    </CalendarViewProvider>
  );
};
