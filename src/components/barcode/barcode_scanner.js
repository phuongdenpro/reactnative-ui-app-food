import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import api from '../../utils/apis';
import { ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BarcodeScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
    console.log("scanned", scanned)
  }, [scanned]);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    try {
      const res = await api.product.get(data)
      console.log(res.data) 
      if (res.data.code == 1) {
        // setScanned(false)
        navigation.navigate("ProductDetail", { product: res.data.data })
        return
      } else {
        setScanned(false)
        ToastAndroid.showWithGravityAndOffset(
          `Không tồn tại sản phẩm có mã vạch là ${data}!`,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      }
    } catch (error) {
      setScanned(false)
      console.log('Failed:', error)
      ToastAndroid.showWithGravityAndOffset(
        "Có lỗi xảy ra, vui lòng thử lại sau ít phút!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{
      width: '100%',
      height: '100%',
      // backgroundColor: 'red'
    }}>
      <BarCodeScanner
        focusable
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Nhấn để quét lại'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({

});

export default BarcodeScanner