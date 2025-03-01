'use client'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { useRef } from 'react';

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>(null)

    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }

    const persistor = useRef(persistStore(storeRef.current));

    return <Provider store={storeRef.current}>
        <PersistGate loading={null} persistor={persistor.current}>
            {children}
        </PersistGate>
    </Provider>
}