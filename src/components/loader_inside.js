import React, { Component } from 'react';
import { Text } from 'react-native';
import { Image } from 'react-native';
import {
  StyleSheet,
  View
} from 'react-native';

const LoaderInside = ({ isLoading }) => {

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 100
    }}>
      <View style={{
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Image
          source={require('../../assets/loading.gif')}
          style={{ height: 50, width: 50 }}
          resizeMode="contain"
          resizeMethod="resize"
        />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    </View>
  )
}

export default LoaderInside