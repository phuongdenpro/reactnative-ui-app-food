import { Button, Icon, InputItem, View, Text } from '@ant-design/react-native'
import { padding } from '../utils/utils'
import { IconOutline } from '@ant-design/icons-react-native'
import { Image } from 'react-native'
import { useRef, useState } from 'react'
import { Dimensions } from 'react-native';
import api from '../utils/apis'
import Loader from '../components/loader'
import { ToastAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
const win = Dimensions.get('window');

export default ForgotScreen = (props) => {
    const navigation = useNavigation();
    const [phone, setPhone] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const onSendOTP = async () => {
        setIsLoading(true)
        try {

            const res = await api.account.forgot_password({
                phone: phone
            })
            console.log("onSendOTP", res)
            if (res.data.code == 1) {
                ToastAndroid.showWithGravityAndOffset(
                    "Gửi OTP thành công!",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                navigation.navigate("ForgotVerify", { phone: phone })
            } else {
                ToastAndroid.showWithGravityAndOffset(
                    "Có lỗi xảy ra, vui lòng thử lại sau ít phút!",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }
            setIsLoading(false)
        } catch {
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

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 100
            }}>
                <Image
                    style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        width: 300,
                        height: 300,
                        resizeMode: "contain"
                    }}
                    source={require("../../assets/banner2.png")}
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
                <Button type="primary" style={{
                    marginTop: 10,
                    marginBottom: 10,
                    backgroundColor: "#F9813A",
                    borderColor: "black",
                }} onPress={onSendOTP}>Gửi mã OTP</Button>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                    }}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("Login") }}>
                        <Text>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Loader isLoading={isLoading} />
        </View>
    )
}