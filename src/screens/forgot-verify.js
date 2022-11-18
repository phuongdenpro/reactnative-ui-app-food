import { Button, Icon, InputItem, View, Text, Grid } from '@ant-design/react-native'
import { padding } from '../utils/utils'
// import { IconOutline } from '@ant-design/icons-react-native'
import { Image } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { Dimensions } from 'react-native';
// import { CodeField } from 'react-native-confirmation-code-field'
import Loader from '../components/loader'
import api from '../utils/apis'
import { ToastAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native'
const win = Dimensions.get('window');

export default ForgotVerifyScreen = (props) => {
    const navigation = useNavigation();
    const [otp, setOtp] = useState([])
    const [value, setValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [phone, setPhone] = useState()

    useEffect(() => {
        if (props.route.params.phone) {
            setPhone(props.route.params.phone)
        }
    }, [props.route.params.phone])

    useEffect(() => {
        let inputItems = []
        for (var i = 0; i < 6; i++)
            inputItems.push(<InputItem style={{
                flex: 1,
            }} placeholder='x' underlineColor="transparent"></InputItem>)
        setOtp(inputItems)
    }, [])

    const onVerify = async () => {
        setIsLoading(true)
        try {

            const res = await api.account.forgot_password_verify({
                phone: phone,
                code: value
            })
            // console.log("onVerify", res)
            if (res.data.code == 1) {
                ToastAndroid.showWithGravityAndOffset(
                    "Xác thực thành công, mật khẩu sẽ được gửi đến số điện thoại của bạn!",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                navigation.navigate("Login")
                setIsLoading(false)
                return
            } else {
                ToastAndroid.showWithGravityAndOffset(
                    "Mã OTP không hợp lệ!",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                setIsLoading(false)
            }
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
                    type='number-pad'
                    maxLength={6}
                    value={value}
                    onChangeText={setValue}
                    placeholder='Mã OTP'></InputItem>
                <Button type="primary" style={{
                    marginTop: 10,
                    marginBottom: 10
                }}
                    onPress={onVerify}>Xác thực OTP</Button>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                    }}>
                </View>
            </View>
            <Loader isLoading={isLoading} />
        </View>
    )
}