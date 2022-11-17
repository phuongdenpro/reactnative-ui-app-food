import { Button, Icon, InputItem, View, Text, Toast } from '@ant-design/react-native'
import { padding } from '../utils/utils'
// import { IconOutline } from '@ant-design/icons-react-native'
import { Image, ToastAndroid, TouchableOpacity } from 'react-native'
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import api from '../utils/apis'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/loader';

const win = Dimensions.get('window');

export default LoginScreen = (props) => {
    const navigation = useNavigation();
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const onLogin = async () => {
        console.log("login...")
        setIsLoading(true)
        try {
            const res = await api.account.login({
                phone: phone,
                password: password,
            })
            // console.log(res.data)
            if (res.data.code == 1) {
                api.account.save_token(res)
                handleVerifyCustomer()
                navigation.navigate("Home")
            } else {
                ToastAndroid.showWithGravityAndOffset(
                    "Sai số điện thoại hoặc mật khẩu!",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }
            setIsLoading(false)
        } catch (error) {
            console.log('Failed:', error)
            ToastAndroid.showWithGravityAndOffset(
                "Có lỗi xảy ra, vui lòng thử lại sau ít phút!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            setIsLoading(false)
        }
    }

    const handleVerifyCustomer = async () => {
        let token = await AsyncStorage.getItem("access");
        // console.log("access", token)
        try {
            const res = await api.account.get_info()
            // console.log(res)
            if (res.data.code == 1) {
                api.account.save_info(res)
                return
            }
        } catch (error) {
            console.log('Failed:', error)
        }
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 50
            }}>
                <Image
                    style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        width: win.width - 50,
                        height: 300,
                    }}
                    source={require("../../assets/Discount-rafiki.png")}
                />
            </View>
            <View style={{
                ...padding(10, 20),
            }}>
                <InputItem
                    placeholder='Số điện thoại'
                    onChangeText={setPhone}
                    type="phone">
                </InputItem>
                <InputItem
                    type='password'
                    placeholder='Mật khẩu'
                    onChangeText={setPassword}>
                </InputItem>
                <Button type="primary" style={{
                    marginTop: 10,
                    marginBottom: 10
                }}
                    onPress={onLogin}
                >Đăng nhập</Button>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                    }}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("Forgot") }}>
                        <Text>Quên mật khẩu</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Loader isLoading={isLoading} />
        </View>
    )
}