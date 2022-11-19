import React, { useState } from "react"


const OrderContext = React.createContext()

function OrderProvider ({children}){
    const [listOrders,setListOrders ]=  useState([])
    return (
        <OrderContext.Provider value={{listOrders,setListOrders}}>
            {children}
        </OrderContext.Provider>
    )
}

export {OrderContext,OrderProvider}