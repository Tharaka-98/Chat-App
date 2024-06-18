"use client";
//app/page.tsx
import { Provider } from 'react-redux';
import { store, persistor } from '../store/store';
import BodyContent from '../components/BodyContent'
// import MessageInput from '../components/MessageInput';
// import MessageList from '../components/MessageList';
import { PersistGate } from 'redux-persist/integration/react';

export default function Home() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BodyContent />
      </PersistGate>
    </Provider>
  );
}
