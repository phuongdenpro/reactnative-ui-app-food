import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import LoginScreen from './src/screen/login'
import ForgotScreen from './src/screen/forgot'
import ForgotVerifyScreen from './src/screen/forgot-verify'
import HomeScreen from './src/screen/home';
import ChangePassScreen from './src/screen/change-pass';
import OrderDetail from './src/components/order/order_detail';
import OrderDetailScreen from './src/components/order/order_detail';
import BarcodeScanner from './src/components/barcode/barcode_scanner';
import ProductDetailScreen from './src/screen/product_detail';
import PromotionDetailScreen from './src/screen/promotion_detail';
import WelcomeScreen from './src/screen/welcome';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'
        //   screenOptions={{
        //     headerShown: false
        // }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen}
            options={{ headerShown: false }} />

          <Stack.Screen name="Login" component={LoginScreen}
            options={{ title: 'Đăng nhập', headerShown: false }} />

          <Stack.Screen name="Forgot" component={ForgotScreen}
            options={{ title: 'Quên mật khẩu' }} />

          <Stack.Screen name="ForgotVerify" component={ForgotVerifyScreen}
            options={{ title: 'Xác thực số điện thoại' }} />

          <Stack.Screen name="ChangePassword" component={ChangePassScreen}
            options={{ title: 'Đổi mật khẩu' }} />

          <Stack.Screen name="Home" component={HomeScreen}
            options={{ headerShown: false }} />

          <Stack.Screen name="OrderDetail" component={OrderDetailScreen}
            options={{ title: 'Chi tiết hóa đơn' }} />

          <Stack.Screen name="BarcodeScanner" component={BarcodeScanner}
            options={{ title: 'Quét mã vạch sản phẩm' }} />

          <Stack.Screen name="ProductDetail" component={ProductDetailScreen}
            options={{ title: 'Chi tiết sản phẩm' }} />

          <Stack.Screen name="PromotionDetail" component={PromotionDetailScreen}
            options={{ title: 'Khuyến mãi' }} />

        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
