import { Button, Icon, InputItem, View, Text } from '@ant-design/react-native'
import { padding } from '../utils/utils'
import { IconOutline } from '@ant-design/icons-react-native'
import { Image, TouchableOpacity } from 'react-native'
import { Dimensions, StyleSheet } from 'react-native';
import { Center } from "native-base";
import { useNavigation } from '@react-navigation/native';
import api from '../utils/apis';
import { useEffect, useState } from 'react';
const win = Dimensions.get('window');

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [info, setInfo] = useState({})

    const handleInfo = async () => {
        const _info = await api.account.get_storage_info()
        setInfo(_info)
    }

    useEffect(() => {
        handleInfo()
    }, [])

    return (
        <View style={{
            flex: 1
        }}>
            <View style={{
                backgroundColor: 'white',
                marginVertical: 10
            }}>
                <View style={styles.itemProfileStyle}>

                    <Text style={styles.text}>Mã khách hàng</Text>
                    <Text style={styles.text}>{info?.id}</Text>
                </View>
                <View style={styles.itemProfileStyle}>

                    <Text style={styles.text}>Tên khách hàng</Text>
                    <Text style={styles.text}>{info?.fullname}</Text>
                </View>
                <View style={styles.itemProfileStyle}>

                    <Text style={styles.text}>Số điện thoại</Text>
                    <Text style={styles.text}>{info?.phone}</Text>
                </View>
                <View style={styles.itemProfileStyle}>

                    <Text style={styles.text}>Giới tính</Text>
                    <Text style={styles.text}>{info?.gender == "M" ? "Nam" : (info?.gender == "F" ? "Nữ": "Không xác định")}</Text>
                </View>
            </View>
            <View style={{
                backgroundColor: 'white',
                marginVertical: 10
            }}>
                <TouchableOpacity 
                    onPress={() => { 
                        navigation.navigate("ChangePassword") 
                    }}>
                    <View style={styles.itemProfileStyle}>
                        <Text style={styles.text}>Đổi mật khẩu</Text>
                        <Image style={{
                            width: 20,
                            height: 20
                        }} source={require("../../assets/arrow-to-right.png")} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { 
                        api.account.clear_token()
                        navigation.navigate("Login") 
                    }}>
                    <View style={styles.itemProfileStyle}>
                        <Text style={{ ...styles.text, color: '#F6616A' }}>Đăng xuất</Text>
                        <Image style={{
                            width: 20,
                            height: 20
                        }} source={require("../../assets/logout.png")} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    text: {
        fontSize: 17,
        fontWeight:'bold'
        // fontWeight: 'bold'
    },

    textChange: {
        fontSize: 15,
        fontStyle: 'italic',
        marginTop: 20,
        // color: '#95c2ec',
        marginRight: 2
    },
    itemProfileStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        // backgroundColor:'#F9813A'
    }
})

export default ProfileScreen;