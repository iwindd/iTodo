import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

type Permissions = {
    hasVibrationPermission: boolean;
    requestVibrationPermission: () => Promise<void>;
};

interface PermissionsProvider {
    children: ReactNode;
}

const initialPermissions: Permissions = {
    hasVibrationPermission: false,
    requestVibrationPermission: async () => { },
};

const PermissionsContext = createContext<Permissions>(initialPermissions);

export const usePermissions = () => {
    return useContext(PermissionsContext);
};


export const PermissionsProvider: React.FC<PermissionsProvider> = ({ children  }) => {
    const [hasVibrationPermission, setHasVibrationPermission] = useState(false);

    useEffect(() => {
        checkVibrationPermission();
    }, []);

    const checkVibrationPermission = async () => {
        if (Platform.OS === 'android') {
            const permission = PermissionsAndroid.PERMISSIONS.VIBRATE;
            const granted = await PermissionsAndroid.check(permission);
            setHasVibrationPermission(granted);
        } else {
            setHasVibrationPermission(true); // For iOS or other platforms
        }
    };

    const requestVibrationPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const permission = PermissionsAndroid.PERMISSIONS.VIBRATE;
                const granted = await PermissionsAndroid.request(permission);
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setHasVibrationPermission(true);
                } else {
                    console.log('Vibration permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            setHasVibrationPermission(true); // For iOS or other platforms
        }
    };

    return (
        <PermissionsContext.Provider
            value={{ hasVibrationPermission, requestVibrationPermission }}
        >
            {children}
        </PermissionsContext.Provider>
    );
};
