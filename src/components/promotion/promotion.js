import { InputItem, View } from "@ant-design/react-native"
import { useEffect, useState } from "react"
import { ScrollView } from "react-native"
import { ToastAndroid } from "react-native"
import api from "../../utils/apis"
import EmptyBox from "../empty_box"
import LoaderInside from "../loader_inside"
import PromotionCategory from "./promotion_category"

const Promotion = ({searchText}) => {
    const [promoPersonal, setPromoPersonal] = useState([])
    const [showPromoPersonal, setShowPromoPersonal] = useState([])
    const [promoProduct, setPromoProduct] = useState([])
    const [showPromoProduct, setShowPromoProduct] = useState([])
    const [promoOrder, setPromoOrder] = useState([])
    const [showPromoOrder, setShowPromoOrder] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        handleData()
    }, [])
    
    const handleData = async () => {
        setIsLoading(true)
        await handleDataPromotionPersonal()
        await handleDataPromotionProduct()
        await handleDataPromotionOrder()
        setIsLoading(false)    
    }

    useEffect(() => {
        console.log("searchText", searchText)
        if(searchText){
            const _showPromoPersonal = promoPersonal.filter(promo => 
                promo.title.toLowerCase().includes(searchText.toLowerCase())
                || promo.description.toLowerCase().includes(searchText.toLowerCase())
                || promo.promotion_code.toLowerCase().includes(searchText.toLowerCase()))
            setShowPromoPersonal(_showPromoPersonal)
            const _showPromoProduct = promoProduct.filter(promo => 
                promo.title.toLowerCase().includes(searchText.toLowerCase())
                || promo.description.toLowerCase().includes(searchText.toLowerCase())
                || promo.promotion_code.toLowerCase().includes(searchText.toLowerCase()))
            setShowPromoProduct(_showPromoProduct)
            const _showPromoOrder = promoOrder.filter(promo => 
                promo.title.toLowerCase().includes(searchText.toLowerCase())
                || promo.description.toLowerCase().includes(searchText.toLowerCase())
                || promo.promotion_code.toLowerCase().includes(searchText.toLowerCase()))
            setShowPromoOrder(_showPromoOrder)
        }else{
            setShowPromoPersonal(promoPersonal)
            setShowPromoProduct(promoProduct)
            setShowPromoOrder(promoOrder)
        }
    }, [searchText, promoPersonal, promoProduct, promoOrder])

    const handleDataPromotionPersonal = async () => {
        try {
            const res = await api.promotion.personal()
            console.log(res.data)
            if (res.data.code == 1) {
                setPromoPersonal(res.data.data)
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
        }
    }

    const handleDataPromotionProduct = async () => {
        try {
            const res = await api.promotion.product()
            console.log(res.data)
            if (res.data.code == 1) {
                setPromoProduct(res.data.data)
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
        }
    }

    const handleDataPromotionOrder = async () => {
        try {
            const res = await api.promotion.order()
            if (res.data.code == 1) {
                setPromoOrder(res.data.data)
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
        }
    }

    if(isLoading){
        return (
            <LoaderInside isLoading={isLoading}/>
        )
    }

    if(showPromoPersonal.length == 0 && showPromoProduct.length == 0 && showPromoOrder.length == 0){
        return (
            <EmptyBox title="Hiện tại không có khuyến mãi!" />
        )
    }

    return (
        <View style={{
            flex: 1,
            overflow: 'scroll',
            height: 500
        }}>
            <ScrollView
                    
                    showsHorizontalScrollIndicator={false}
                >
            {showPromoPersonal.length == 0 ? null :
                <PromotionCategory title="Dành riêng cho bạn" data={showPromoPersonal}/>
            }
            {showPromoProduct.length == 0 ? null :
                <PromotionCategory title="Khuyến mãi tặng sản phẩm" data={showPromoProduct}/>
            }
            {showPromoOrder.length == 0 ? null :
                <PromotionCategory title="Khuyến mãi đơn hàng" data={showPromoOrder}/>
            }
            </ScrollView>
        </View>
    )
}

export default Promotion