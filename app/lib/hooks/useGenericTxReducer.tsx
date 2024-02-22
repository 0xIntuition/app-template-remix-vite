import { useReducer, type Reducer } from 'react'

/**
 * This hook takes in a reducer and an initial state and returns the state and dispatch function. It's a generic hook that can be used for any reducer and initial state.
 * Without any additional configuration, it uses the default state and reducer in this file, but these can be overridden by passing in a custom reducer and initial state when needed.
 * We can change the default state and reducer to best reflect our usecases.
 *
 * Example usage (with config overrides for specific state and reducer):
 *   const { state, dispatch } = useGenericTxState<TransactionState, TxActionType>(txReducer,initialTxState)
 *
 * Example usage (without overrides, using the default):
 *  const { state, dispatch } = useGenericTxState()
 */

export type DefaultTransactionState = {
  status: DefaultTxState
  txHash?: `0x${string}`
  error?: string
}

type DefaultTxState =
  | 'idle'
  | 'transaction-signing'
  | 'transaction-progress'
  | 'transaction-complete'
  | 'transaction-error'

type DefaultTxActionType =
  | { type: 'START_TRANSACTION' }
  | { type: 'TRANSACTION_SIGNING' }
  | { type: 'TRANSACTION_PROGRESS' }
  | { type: 'TRANSACTION_COMPLETE'; txHash?: `0x${string}` }
  | { type: 'TRANSACTION_ERROR'; error: string }

const defaultTxReducer: Reducer<
  DefaultTransactionState,
  DefaultTxActionType
> = (state: DefaultTransactionState, action: DefaultTxActionType) => {
  switch (action.type) {
    case 'START_TRANSACTION':
      return { ...state, status: 'idle' }
    case 'TRANSACTION_SIGNING':
      return { ...state, status: 'transaction-signing' }
    case 'TRANSACTION_PROGRESS':
      return { ...state, status: 'transaction-progress' }
    case 'TRANSACTION_COMPLETE':
      return {
        ...state,
        status: 'transaction-complete',
        txHash: action.txHash,
      }
    case 'TRANSACTION_ERROR':
      return { ...state, status: 'transaction-error', error: action.error }
    default:
      return state
  }
}

const defaultInitialTransactionState: DefaultTransactionState = {
  status: 'idle',
}

function useGenericTxState(): {
  state: DefaultTransactionState
  dispatch: React.Dispatch<DefaultTxActionType>
}
function useGenericTxState<S, A>(
  reducer: Reducer<S, A>,
  initialState: S,
): {
  state: S
  dispatch: React.Dispatch<A>
}

function useGenericTxState<S, A>(reducer?: Reducer<S, A>, initialState?: S) {
  const [state, dispatch] = useReducer(
    reducer ?? defaultTxReducer,
    initialState ?? defaultInitialTransactionState,
  )
  return { state, dispatch }
}

export default useGenericTxState
