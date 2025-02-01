import {jest} from '@jest/globals';
import 'react-native-gesture-handler/jestSetup';
jest.mock('react-native-actions-sheet', () => {
  return {
    __esModule: true,
    default: 'ActionSheet',
    useSheetRef: jest.fn(),
  };
});
