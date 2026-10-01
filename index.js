import { AppRegistry } from 'react-native';
import { enableScreens } from 'react-native-screens';
import App from './App';
import { name as appName } from './app.json';

// Tắt chế độ native screens để navigation dùng stack thuần, triệt tiêu lỗi useAnimatedHeaderHeight
enableScreens(false);

AppRegistry.registerComponent(appName, () => App);