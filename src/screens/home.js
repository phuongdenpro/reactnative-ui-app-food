import { View, Text, Icon, TabBar, SearchBar, Button } from "@ant-design/react-native"
import { IconFill } from "@ant-design/icons-react-native";
import { Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import Promotion from "../components/promotion/promotion";
import OrderList from "../components/order/order";
import ProfileScreen from "./profile";
import Header from "../components/header"
import api from "../utils/apis";
import { useNavigation } from "@react-navigation/native";


const Content = ({ menuSelected, searchText }) => {
    if (menuSelected == "home")
        return <Promotion searchText={searchText} />

    else if (menuSelected == "history")
        return <OrderList />

    else if (menuSelected == "profile")
        return <ProfileScreen />
    else
        return null
}

const HomeScreen = () => {
    const navigation = useNavigation();
    const [menuSelected, setMenuSelected] = useState("home")
    const [searchText, setSearchText] = useState("")

    // useEffect(() => {
    //     handleVerifyCustomer()
    // }, [])

    useEffect(() => {
        console.log("searchText1", searchText)
    }, [searchText])

    // const handleVerifyCustomer = async () => {
    //     try{
    //         const res = await api.account.get_info()
    //         if(res.data.code == 1){
    //             api.account.save_info(res)
    //             return
    //         }
    //     }catch(error) {
    //         console.log('Failed:', error)
    //     }
    //     navigation.navigate("Login")
    // }

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <View style={{
                flex: 1,
            }}>
                <Header menuSelected={menuSelected} onSearch={setSearchText} />
                <Content menuSelected={menuSelected} searchText={searchText} />
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                height: 60
            }}>
                <TouchableOpacity
                    style={{
                        ...menuBtnStyle,
                        backgroundColor: `${menuSelected == "home" ? "#ddd" : "transparent"}`
                    }}
                    onPress={() => setMenuSelected("home")}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Image style={menuIconStyle} source={require("../../assets/home.png")} />
                        <Text>Khuyến mãi</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        ...menuBtnStyle,
                        // backgroundColor: `${menuSelected == "home" ? "#ddd" : "transparent"}`
                    }}
                    onPress={() => navigation.navigate("BarcodeScanner")}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Image style={menuIconStyle} source={require("../../assets/barcode2.png")} />
                        <Text>Tra cứu</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        ...menuBtnStyle,
                        backgroundColor: `${menuSelected == "history" ? "#ddd" : "transparent"}`
                    }}
                    onPress={() => setMenuSelected("history")}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Image style={menuIconStyle} source={require("../../assets/history.png")} />
                        <Text>Lịch sử mua hàng</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        ...menuBtnStyle,
                        backgroundColor: `${menuSelected == "profile" ? "#ddd" : "transparent"}`
                    }}
                    onPress={() => setMenuSelected("profile")}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Image style={menuIconStyle} source={require("../../assets/user.png")} />
                        <Text>Tài khoản</Text>
                    </View>
                </TouchableOpacity>
                {/* <Button style={{
                    ...menuBtnStyle,
                    backgroundColor: `${menuSelected == "home" ? "#ddd" : "transparent"}`
                }}
                    onPress={() => setMenuSelected("home")}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Image style={menuIconStyle} source={require("../../assets/home.png")} />
                        <Text>Khuyến mãi</Text>
                    </View>
                </Button>
                <Button style={{
                    ...menuBtnStyle,
                    backgroundColor: `${menuSelected == "barcode" ? "#ddd" : "transparent"}`
                }}
                    onPress={() => navigation.navigate("BarcodeScanner")}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Image style={menuIconStyle} source={require("../../assets/history.png")} />
                        <Text>Quét mã</Text>
                    </View>
                </Button>
                <Button style={{
                    ...menuBtnStyle,
                    backgroundColor: `${menuSelected == "history" ? "#ddd" : "transparent"}`
                }}
                    onPress={() => setMenuSelected("history")}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Image style={menuIconStyle} source={require("../../assets/history.png")} />
                        <Text>Lịch sử mua hàng</Text>
                    </View>
                </Button>
                <Button style={{
                    ...menuBtnStyle,
                    backgroundColor: `${menuSelected == "profile" ? "#ddd" : "transparent"}`
                }}
                    onPress={() => setMenuSelected("profile")}>
                    <View style={{
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Image style={menuIconStyle} source={require("../../assets/user.png")} />
                        <Text>Tài khoản</Text>
                    </View>
                </Button> */}
            </View>
        </View>
    )
}

const menuBtnStyle = {
    backgroundColor: 'transparent',
    borderWidth: 0,
    height: 60,
    padding: 10
    // paddingTop: 10,
    // paddingBottom: 10,
}

const menuViewStyle = {
    flexDirection: 'column',
    alignItems: 'center'
}

const menuIconStyle = {
    width: 20,
    height: 20
}

export default HomeScreen;