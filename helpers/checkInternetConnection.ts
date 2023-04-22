import {
  NetInfoWifiState,
  NetInfoCellularState,
} from '@react-native-community/netinfo';
import {showErrorMessage} from './showMessages';

export const chechWifiConnection = (networkState: NetInfoWifiState) => {
  const linkSpeed = networkState.details.linkSpeed;
  console.log('linkSpeed is', linkSpeed);

  if (linkSpeed && linkSpeed < 5) {
    showErrorMessage();
    console.log('Your internet connection is slow');
  }
};

export const checkCellularConnection = (networkState: NetInfoCellularState) => {
  const cellularGeneration = networkState.details.cellularGeneration;

  if (cellularGeneration === '2g' || !cellularGeneration) {
    showErrorMessage();
    console.log('Your internet connection is slow');
  }
};
