import { h, createContext } from 'preact';
import { useContext, useReducer, useMemo } from 'preact/hooks';

import { useCalendarState } from '@/hooks/useCalendarState.js';
import { useCalendarDate } from '@/hooks/useCalendarDate.js';
import { useCalendarActions } from '@/hooks/useCalendarActions.js';
import { appConfig } from '@/utils/initialConfig.js';

// Contexto principal del calendario que centraliza rtodo el estado y las acciones
const CalendarViewContext = createContext();

// Proveedor del contexto del calendario que envuelve toda la aplicación
export const CalendarViewProvider = ({ children, initialConfig = {} }) => {
  // Reducer para manejar el estado del calendario
  const [state, dispatch] = useReducer(useCalendarState, {
    calendar: { ...appConfig.calendar, ...initialConfig.calendar },
    localization: {
      ...appConfig.localization,
      ...initialConfig.localization,
    },
    events: {
      ...appConfig.events,
      ...initialConfig.events,
    },
    ui: {
      ...appConfig.ui,
      ...initialConfig.ui,
    },
  });

  // Controlador de dates
  const newDate = new Date();
  const [currentDate, dateController] = useCalendarDate(newDate);
  // Acciones del calendario mandandole el reducer
  const actions = useCalendarActions(dispatch);

  // Memoizicacion del calendario
  const calendarState = useMemo(() => {
    return {
      calendar: state.calendar,
      currentDate,
      dateController,
    };
  }, [state.calendar, currentDate, dateController]);

  // Memozicacion de los eventos
  const eventsState = useMemo(() => {
    return {
      events: state.events,
    };
  }, [state.events]);

  // Memozicacion de la UI
  const uiState = useMemo(() => {
    return {
      ui: state.ui,
      localization: state.localization,
    };
  }, [state.ui, state.localization]);

  // Valores del contexto con memoizacion
  const contextValue = useMemo(() => {
    return {
      ...calendarState,
      ...eventsState,
      ...uiState,
      actions,
    };
  }, [calendarState, eventsState, uiState, actions]);

  return (
    <CalendarViewContext.Provider value={contextValue}>
      {children}
    </CalendarViewContext.Provider>
  );
};

// Acceder al contexto del calendario
export const useCalendarViewContext = () => {
  const context = useContext(CalendarViewContext);
  if (!context) {
    throw new Error(
      'useCalendarViewContext debe usarse dentro de un componente CalendarViewProvider'
    );
  }
  return context;
};
