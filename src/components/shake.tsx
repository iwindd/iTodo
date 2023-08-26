import { Vibration } from 'react-native';

export const TodoStatusChangedShake = () => {
    const pattern = [200, 100, 200];

    Vibration.vibrate(pattern);
};