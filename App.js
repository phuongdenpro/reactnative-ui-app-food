import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import LoginScreen from "./src/screens/login";
import ForgotScreen from "./src/screens/forgot";
import ForgotVerifyScreen from "./src/screens/forgot-verify";
import HomeScreen from "./src/screens/home";
import DetailsScreen from "./src/screens/DetailsScreen";
import ChangePassScreen from "./src/screens/change-pass";
import OrderDetail from "./src/components/order/order_detail";
import OrderDetailScreen from "./src/components/order/order_detail";
import BarcodeScanner from "./src/components/barcode/barcode_scanner";
import ProductDetailScreen from "./src/screens/product_detail";
import PromotionDetailScreen from "./src/screens/promotion_detail";
import WelcomeScreen from "./src/screens/welcome";
import BottomNavigator from "./src/navigation/BottomNavigator";
import { OrderProvider } from "./src/context/orderContext";
import { FavoriteProvider } from "./src/context/favoriteContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <OrderProvider>
      <FavoriteProvider>
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          //   screenOptions={{
          //     headerShown: false
          // }}
        >
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Đăng nhập", headerShown: false }}
          />

          <Stack.Screen
            name="Forgot"
            component={ForgotScreen}
            options={{ title: "Quên mật khẩu" }}
          />

          <Stack.Screen
            name="ForgotVerify"
            component={ForgotVerifyScreen}
            options={{ title: "Xác thực số điện thoại" }}
          />

          <Stack.Screen
            name="ChangePassword"
            component={ChangePassScreen}
            options={{ title: "Đổi mật khẩu" }}
          />

          <Stack.Screen
            name="Home"
            component={BottomNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailsScreen"
            component={DetailsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
    </FavoriteProvider>
    </OrderProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
