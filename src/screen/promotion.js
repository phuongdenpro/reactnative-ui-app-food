import { View, Text, Pressable, StyleSheet, ToastAndroid } from "react-native";
import React from "react";
import { Box, Center, HStack, ScrollView, VStack, Image } from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { FontAwesome } from "@expo/vector-icons"

const Swiper = () => (
    <SwipeListView
        rightOpenValue={-50}
        previewRowKey='0'
        previewOpenValue={-40}
        previewOpenDelay={3000}
        data={1}
        // renderHiddenItem={hiddenItems}
        renderItem={renderitem}
        showsVerticalScrollIndicator={false} />
);

const renderitem = (data) => {
    <Pressable>
        <Box ml={6} mb={3}>
            <HStack alignItems='center' bg='#FFFFFF' shadow={1} rounded={10} overflow='hidden'>
                <Center w='25%' bg='blue'>
                    <Image source={{ uri: 'https://lawkey.vn/wp-content/uploads/2019/09/ho%E1%BA%A1t-%C4%91%E1%BB%99ng-khuy%E1%BA%BFn-m%E1%BA%A1i.jpg' }}
                        alt='Khuyen mai' w='full' h={24} resizeMode='contain' />
                </Center>
                <VStack w='60%' px={2} space={2}>
                    <Text isTruncated color="#FFFFFF" bold fontSize={10}>
                        Khuyen mai thang 10 2022
                    </Text>

                    <Text color="#FFFFFF" bold >
                        12/10/2022 - 25/10/2022
                    </Text>
                </VStack>
            </HStack>
        </Box>
    </Pressable>
};

// const hiddenItems = (data) => {
//     <Pressable w={50} roundedTopRight={10} roundedBottomRight={10} h='88%' ml='auto' justifyContent='center' background='red'>
//         <Center alignItems='center' space={2}>
//             <FontAwesome name='trash' size={24} color="white" />
//         </Center>
//     </Pressable>
// };

const PromotionList = () => {

    const cl = (id) => {
        ToastAndroid.showWithGravityAndOffset(
            'Id='+id,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
    };

    return (
        <Box flex={1} safeAreaTop >
            <Center w='full' py={1}>
                <Text style={styles.title}>
                    Chương trình khuyến mãi
                </Text>
            </Center>
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                <Box mr={6}>

                    {/* /////////// */}
                    <Pressable onPress={() =>cl(1)}>
                        <Box ml={6} mb={3}>
                            <HStack alignItems='center' bg='#FFFFFF' shadow={1} rounded={10} overflow='hidden'>
                                <Center w='25%' bg='blue'>
                                    <Image source={{ uri: 'https://lawkey.vn/wp-content/uploads/2019/09/ho%E1%BA%A1t-%C4%91%E1%BB%99ng-khuy%E1%BA%BFn-m%E1%BA%A1i.jpg' }}
                                        alt='Khuyen mai' w='full' h={24} resizeMode='contain' />
                                </Center>
                                <VStack w='60%' px={2} space={2}>
                                    <Text isTruncated color="#FFFFFF" bold fontSize={20}>
                                        Khuyen mai thang 10 2022
                                    </Text>

                                    <Text color="#FFFFFF" bold >
                                        Từ ngày: 12/10/2022 - 25/10/2022
                                    </Text>
                                </VStack>
                            </HStack>
                        </Box>
                    </Pressable>

                    <Pressable  onPress={() =>cl(2)}>
                        <Box ml={6} mb={3}>
                            <HStack alignItems='center' bg='#FFFFFF' shadow={1} rounded={10} overflow='hidden'>
                                <Center w='25%' bg='blue'>
                                    <Image source={{ uri: 'https://lawkey.vn/wp-content/uploads/2019/09/ho%E1%BA%A1t-%C4%91%E1%BB%99ng-khuy%E1%BA%BFn-m%E1%BA%A1i.jpg' }}
                                        alt='Khuyen mai' w='full' h={24} resizeMode='contain' />
                                </Center>
                                <VStack w='60%' px={2} space={2}>
                                    <Text isTruncated color="#FFFFFF" bold fontSize={20}>
                                        Khuyen mai thang 11 2022
                                    </Text>

                                    <Text color="#FFFFFF" bold >
                                        Từ ngày: 12/11/2022 - 25/11/2022
                                    </Text>
                                </VStack>
                            </HStack>
                        </Box>
                    </Pressable>

                    {/* //////////// */}
                    <Swiper />
                </Box>
            {/* </ScrollView> */}
        </Box>

    )
}

export default PromotionList;

const styles = StyleSheet.create({

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: -10,
        marginBottom: 10,
        color: '#FF0000',
        
    }
})