/* eslint-env jest */

require('react-native-reanimated').setUpTests();

require('@shopify/flash-list/jestSetup');

// Use this instead with React Native >= 0.64
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

jest.mock('react-native-modal', () => {
  const Modal = jest.requireActual('react-native/Libraries/Modal/Modal');
  return (props) => <Modal {...props} />;
});

jest.mock('@shopify/restyle', () => {
  const RealModule = jest.requireActual('@shopify/restyle');
  const RN = jest.requireActual('react-native');
  RealModule.createText = () => RN.Text;
  RealModule.createBox = () => RN.View;
  RealModule.createRestyleComponent = (f, c) => c || RN.View;
  return RealModule;
});
