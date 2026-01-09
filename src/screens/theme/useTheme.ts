import { useColorScheme } from 'react-native';
import { colors } from './colors';

export function useTheme() {
  const scheme = useColorScheme(); // 'dark' | 'light' | null
  const mode = scheme === 'dark' ? 'dark' : 'light';
  return colors[mode];
}
