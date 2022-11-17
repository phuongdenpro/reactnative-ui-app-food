import { Button, Icon, InputItem, View, Text } from '@ant-design/react-native'
import { padding } from '../utils/utils'
import { Image, ToastAndroid, TouchableOpacity } from 'react-native'
import { Dimensions, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../utils/apis';
import { useState } from 'react';
import { validPassword } from '../utils/regex';

const win = Dimensions.get('window');

const ChangePassScreen = ({ phone }) => {
    const navigation = useNavigation();
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [reNewPassword, setReNewPassword] = useState("")

    const onChangePassword = async () => {
        const info = await api.account.get_storage_info()
        if(password.trim() == ""){
            ToastAndroid.showWithGravityAndOffset(
                "Mật khẩu không được bỏ trống!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            return
        }

        if(!validPassword.test(newPassword)){
            ToastAndroid.showWithGravityAndOffset(
                "Mật khẩu mới phải lớn hơn 6 ký tự!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            return
        }

        if(newPassword != reNewPassword){
            ToastAndroid.showWithGravityAndOffset(
                "Nhập lại mật khẩu không khớp",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            return
        }
        
        try{
            const res = await api.account.change_password({
                phone: info.phone, 
                password: password, 
                new_password: newPassword
            })
            if(res.data.code == 1){
                ToastAndroid.showWithGravityAndOffset(
                    "Đổi mật khẩu thành công",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
                navigation.goBack()
            }else{
                ToastAndroid.showWithGravityAndOffset(
                    res.data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            }

        }catch(error) {
            console.log('Failed:', error)
        }
    }

    return (
        <View style={{
            flex: 1,
        }}>
            <View style={{
                ...padding(10, 10),
            }}>
                <View style={styles.viewInput}>
                    <InputItem style={styles.inputform}
                        type='password'
                        placeholder='Mật khẩu cũ'
                        onChangeText={setPassword}>
                    </InputItem>
                </View>
                <View style={styles.viewInput}>
                    <InputItem style={styles.inputform}
                        type='password'
                        placeholder='Mật khẩu mới'
                        onChangeText={setNewPassword}>
                    </InputItem>
                </View>
                <View style={styles.viewInput}>
                    <InputItem style={styles.inputform}
                        type='password'
                        placeholder='Nhập lại mật khẩu mới'
                        onChangeText={setReNewPassword}>
                    </InputItem>
                </View>
                <Button type="primary" style={{
                        marginTop: 10,
                        marginBottom: 10,
                        marginHorizontal: 10
                    }}
                    onPress={onChangePassword}
                >Đổi mật khẩu</Button>
            </View>
        </View>
    )
}

export default ChangePassScreen;

const styles = StyleSheet.create({
    text: {
        marginLeft: '20%',
        fontSize: 20,
        fontWeight: 'bold'
    },

    textIn: {
        fontSize: 20,
        fontStyle: 'italic',
        marginTop: 40
    },

    inputform: {
    },
    viewInput: {
        marginBottom: 10
    }
})