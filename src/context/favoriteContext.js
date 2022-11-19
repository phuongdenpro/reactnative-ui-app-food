import React, { useState } from "react"


const FavoriteContext = React.createContext()

function FavoriteProvider ({children}){
    const [listFavorites,setListFavorites ]=  useState([])
    return (
        <FavoriteContext.Provider value={{listFavorites,setListFavorites}}>
            {children}
        </FavoriteContext.Provider>
    )
}

export {FavoriteContext,FavoriteProvider}