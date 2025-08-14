import { useCallback } from 'preact/hooks';

const createActionBase = dispatch => {
  // Vistas
  const setActiveView = useCallback(
    view => {
      dispatch({ type: 'SET_ACTIVE_VIEW', payload: view });
    },
    [dispatch]
  );

  // Asignar errores
  const setError = useCallback(
    error => {
      dispatch({ type: 'SET_ERROR', payload: error });
    },
    [dispatch]
  );

  // Limpiar errores
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, [dispatch]);

  // Asignar Loading
  const setLoading = useCallback(
    isLoading => {
      dispatch({ type: 'SET_LOADING', payload: isLoading });
    },
    [dispatch]
  );

  return {
    setActiveView,
    setError,
    clearError,
    setLoading,
  };
};

export const useCalendarActions = dispatch => {
  const actions = createActionBase(dispatch);

  // Acciones de vista
  const viewActions = {
    showMonthView: useCallback(() => {
      actions.setActiveView('month');
    }, [actions.setActiveView]),
  };

  // Acciones utiles
  const utilsActions = {
    setError: actions.setError,
    setLoading: actions.setLoading,
    clearError: actions.clearError,
  };

  return {
    view: viewActions,
    utils: utilsActions,
  };
};
