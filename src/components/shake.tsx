import { Vibration } from 'react-native';
import { usePermissions } from '../contexts/permission';


export const TodoStatusChangedShake = () => {
    const { hasVibrationPermission} = usePermissions();

    if (!hasVibrationPermission) {
        return false
    }

    const pattern = [200, 100, 200];

    Vibration.vibrate(pattern);
};