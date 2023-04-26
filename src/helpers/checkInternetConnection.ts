import {
  NetInfoWifiState,
  NetInfoCellularState,
} from '@react-native-community/netinfo';

export const chechWifiConnection = (networkState: NetInfoWifiState) => {
  const linkSpeed = networkState.details.linkSpeed;
  console.log('linkSpeed is', linkSpeed);

  if (linkSpeed && linkSpeed < 5) {
    console.log('Your internet connection is slow');
  }
};

export const checkCellularConnection = (networkState: NetInfoCellularState) => {
  const cellularGeneration = networkState.details.cellularGeneration;

  if (cellularGeneration === '2g' || !cellularGeneration) {
    console.log('Your internet connection is slow');
  }
};
