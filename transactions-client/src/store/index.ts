import { configureStore } from '@reduxjs/toolkit';
import { balanceReducer } from './balance/balance.reducer';
import { transactionsReducer } from '../store/transactions/transactions.reducer';

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    balance: balanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;