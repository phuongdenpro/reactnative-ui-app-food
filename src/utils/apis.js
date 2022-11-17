import axiosApi from "./axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

const generalApi = {
    get_counter_index(table, params){
        const url = `/counter-index/${table}/`
        return axiosApi.get(url, params)
    }
}

const reset_password_extra = {
    reset_password(id, params){
        const url = `/staff/reset_password/${id}`
        return axiosApi.get(url, params)
    }
}

const getApi = (resource, extras) => {
    return {
        listBuy: (params) => {
            const url = `/${resource}/?sellable=true`
            return axiosApi.get(url, params)
        },
        listPromotionByOrder: (params) => {
            const url = `/${resource}/by_order/`
            return axiosApi.get(url, params)
        },
        listPromotionByProduct: (params) => {
            const url = `/${resource}/by_product/`
            return axiosApi.get(url, params)
        },
        list: (params) => {
            const url = `/${resource}/`
            return axiosApi.get(url, params)
        },
        get: (id, params) => {
            const url = `/${resource}/${id}/`
            return axiosApi.get(url, params)
        },
        add: (params) => {
            const url = `/${resource}/`
            return axiosApi.post(url, params)
        },
        update: (id, params) => {
            const url = `/${resource}/${id}/`
            return axiosApi.put(url, params)
        },
        delete: (id, params) => {
            const url = `/${resource}/${id}/`
            return axiosApi.delete(url, params)
        },
        ...extras
    }
}

const promotion_line_extras = {
    by_product: (params) => {
        console.log("by_product", params)
        const url = `/promotion-line/by_product/`
        return axiosApi.get(url, params)
    },
    by_order: (params) => {
        const url = `/promotion-line/by_order/`
        return axiosApi.get(url, params)
    },
    by_type: (params) => {
        const url = `/promotion-line/by_type/`
        return axiosApi.get(url, params)
    }
}

const category_extras = {
    to_select: (params) => {
        const url = `/category/to_select/`
        return axiosApi.get(url, params)
    },
    get_parent: (id, params) => {
        const url = `/category/get_parent/${id}`
        return axiosApi.get(url, params)
    }
}

const address_extras = {
    to_select: (params) => {
        const url = `/address/tree/`
        return axiosApi.get(url, params)
    },
    get_parent: (id, params) => {
        const url = `/address/path/${id}`
        return axiosApi.get(url, params)
    },
    ward(id, params){
        const url = `/address/ward/${id}`
        return axiosApi.get(url, params)
    }
}

const sales_extras = {
    by_staff: (params) => {
        const url = `/statistic/sales-staff/`
        return axiosApi.get(url, params)
    },
    by_customer: (params) => {
        const url = `/statistic/sales-customer/`
        return axiosApi.get(url, params)
    },
    
}

const refund_extras = {
    refund: (params) => {
        const url = `/statistic/refund/`
        return axiosApi.get(url, params)
    },
}

const promotion_extras = {
    promotion: (params) => {
        const url = `/statistic/promotion/`
        return axiosApi.get(url, params)
    },
}

const inventory_extras = {
    inventory: (params) => {
        const url = `/statistic/stock/`
        return axiosApi.get(url, params)
    },
}

const received_extras = {
    receiving: (params) => {
        const url = `/statistic/receiving/`
        return axiosApi.get(url, params)
    },
}

const api = {
    // product_group: getApi("product-group"),
    product: getApi("product"),
    promotion: {
        personal: (params) => {
            const url = "/promotion/personal/"
            return axiosApi.get(url, params)
        },
        product: (params) => {
            const url = "/promotion/product/"
            return axiosApi.get(url, params)
        },
        order: (params) => {
            const url = "/promotion/order/"
            return axiosApi.get(url, params)
        },
    },
    // promotion_line: getApi("promotion-line", promotion_line_extras),
    order: {
        list: (params) => {
            const url = "/order/"
            return axiosApi.get(url, params)
        },
    },
    account: {
        login: (params) => {
            const url = "/account/login/"
            return axiosApi.post(url, params)
        },
        forgot_password: (params) => {
            const url = "/account/forgot-password/"
            return axiosApi.post(url, params)
        },
        forgot_password_verify: (params) => {
            const url = "/account/forgot-password/verify/"
            return axiosApi.post(url, params)
        },
        change_password: (params) => {
            const url = "/account/change-password/"
            return axiosApi.post(url, params)
        },
        get_info: (params) => {
            const url = "/customer/info/"
            return axiosApi.get(url, params)
        },
        save_token: (response) => {
            AsyncStorage.setItem(
                "access",
                response.data.data.access
            );
            AsyncStorage.setItem(
                "refresh",
                response.data.data.refresh
            );
        },
        clear_token: () => {
            AsyncStorage.removeItem("access")
            AsyncStorage.removeItem("refresh")
        },
        save_info: (response) => {
            AsyncStorage.setItem("info", JSON.stringify(response.data.data));
        },
        get_storage_info: async () => {
            const value = await AsyncStorage.getItem("info");
            if (value !== null) {
                return JSON.parse(value)
            }
            return null
        }
    }

}

export default api;