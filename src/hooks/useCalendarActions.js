import { useCallback, useMemo } from 'preact/hooks';

export const useCalendarActions = dispatch => {
  // Acciones de navegación de fechas
  const dateActions = useMemo(
    () => ({
      setCurrentDate: useCallback(
        date => {
          dispatch({ type: 'SET_CURRENT_DATE', payload: date });
        },
        [dispatch]
      ),
    }),
    [dispatch]
  );

  // Acciones de vistas
  const viewActions = useMemo(
    () => ({
      setActiveView: useCallback(
        view => {
          dispatch({ type: 'SET_ACTIVE_VIEW', payload: view });
        },
        [dispatch]
      ),

      showMonthView: useCallback(() => {
        dispatch({ type: 'SET_ACTIVE_VIEW', payload: 'month' });
      }, [dispatch]),

      showWeekView: useCallback(() => {
        dispatch({ type: 'SET_ACTIVE_VIEW', payload: 'week' });
      }, [dispatch]),

      showDayView: useCallback(() => {
        dispatch({ type: 'SET_ACTIVE_VIEW', payload: 'day' });
      }, [dispatch]),
    }),
    [dispatch]
  );

  // Acciones de eventos
  const eventActions = useMemo(
    () => ({
      addEvent: useCallback(
        event => {
          const eventWithId = { ...event, id: Date.now().toString() };
          dispatch({ type: 'ADD_EVENT', payload: eventWithId });
        },
        [dispatch]
      ),

      removeEvent: useCallback(
        eventId => {
          dispatch({ type: 'REMOVE_EVENT', payload: eventId });
        },
        [dispatch]
      ),

      updateEvent: useCallback(
        event => {
          dispatch({ type: 'UPDATE_EVENT', payload: event });
        },
        [dispatch]
      ),
    }),
    [dispatch]
  );

  // Acciones de UI
  const uiActions = useMemo(
    () => ({
      setError: useCallback(
        error => {
          dispatch({ type: 'SET_ERROR', payload: error });
        },
        [dispatch]
      ),

      clearError: useCallback(() => {
        dispatch({ type: 'CLEAR_ERROR' });
      }, [dispatch]),

      setLoading: useCallback(
        isLoading => {
          dispatch({ type: 'SET_LOADING', payload: isLoading });
        },
        [dispatch]
      ),
    }),
    [dispatch]
  );

  return {
    date: dateActions,
    event: eventActions,
    view: viewActions,
    ui: uiActions,
  };
};
