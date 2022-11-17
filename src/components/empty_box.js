import { Image, Text, View } from "react-native"

const EmptyBox = ({title}) => {
    return (
        <View style={{
            alignItems: 'center',
            paddingTop: 100
        }}>
            <Image style={{
                width: 200,
                height: 200
            }} source={require("../../assets/empty-box.png")}/>
            <Text style={{
                fontSize: 16,
                color: '#7c7c7c'
            }}>{title}</Text>
        </View>
    )
}

export default EmptyBox