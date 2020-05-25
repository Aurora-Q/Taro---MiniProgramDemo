import { ats } from './actions'

const initState = {
    token: '',
    userInfo: '',
    initMenuId: 0,
    goodsList: [],
    menuData: [],
    selectedMenuId: 0,
    goodsData: [],
}

export default function main(state = initState, action) {
    switch (action.type) {
        case ats.GET_TOKEN_SERVICE_SUCCESS:
            return {
                ...state,
                token: action.payload.data.token && action.payload.data.token || '',
                userInfo: action.payload.data || '',
            }
        case ats.GET_MENU_LIST_SERVICE_SUCCESS:
            return {
                ...state,
                menuData: action.payload.data,
            }
        case ats.GET_GOODS_LIST_SERVICE_SUCCESS:
            let selectedMenuId = state.initMenuId;
            let goodsList = state.goodsList;
            if (action.payload.data) {
                selectedMenuId = action.payload.data[0].menu_id;
                action.payload.data.map(item => {
                    if (selectedMenuId === item.menu_id) {
                        goodsList.push(item);
                    }
                })
            }
            return {
                ...state,
                goodsList,
                selectedMenuId,
                goodsData: action.payload.data
            }
        case ats.SELECTED_MENU_ITEM_SUCCESS:
            let isSelected;
            let goodsListData = [];
            state.goodsData.map(_item => {
                if (_item.menu_id === action.payload) {
                    goodsListData.push(_item);
                }
            })
            return {
                ...state,
                isSelected: isSelected,
                selectedMenuId: action.payload,
                goodsList: goodsListData
            }
        default:
            return state
    }
}