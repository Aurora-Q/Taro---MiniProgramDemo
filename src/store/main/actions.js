import API from '../../service/api';
import { menuListMock, goodListMock } from './counter.mock';
export const ats = {
    GET_TOKEN_SERVICE: 'GET_TOKEN_SERVICE',
    GET_TOKEN_SERVICE_SUCCESS: 'GET_TOKEN_SERVICE_SUCCESS',

    GET_MENU_LIST_SERVICE: 'GET_MENU_LIST_SERVICE',
    GET_MENU_LIST_SERVICE_SUCCESS: 'GET_MENU_LIST_SERVICE_SUCCESS',

    GET_GOODS_LIST_SERVICE: 'GET_GOODS_LIST_SERVICE',
    GET_GOODS_LIST_SERVICE_SUCCESS: 'GET_GOODS_LIST_SERVICE_SUCCESS',

    SELECTED_MENU_ITEM: 'SELECTED_MENU_ITEM',
    SELECTED_MENU_ITEM_SUCCESS: 'SELECTED_MENU_ITEM_SUCCESS'

}

export const onGetTokenService = (js_code, callBack) => {
    return async dispatch => {
        let data = await API.get("/uauth/wechat/get_user_info", js_code);
        console.log('37', {...data });
        dispatch({
            type: ats.GET_TOKEN_SERVICE_SUCCESS,
            payload: data.data
        })
        callBack(data.data);
    }
};

// export const onGetMenuListService = (token) => {
//     return async dispatch => {
//         let data = await API.get("/udata/menu/list", token);
//         console.log('31 - data', data);
//         dispatch({
//             type: ats.GET_MENU_LIST_SERVICE_SUCCESS,
//             payload: data.data
//         })
//     }
// }

export const onGetMenuListService = () => {
    return dispatch => {
        let data = menuListMock;
        dispatch({
            type: ats.GET_MENU_LIST_SERVICE_SUCCESS,
            payload: data
        })
    }
}

export const onGetGoodsListService = () => {
    return dispatch => {
        let data = goodListMock;
        dispatch({
            type: ats.GET_GOODS_LIST_SERVICE_SUCCESS,
            payload: data
        })
    }
}

export const selectedMenuItem = (data) => {
    return dispatch => {
        dispatch({
            type: ats.SELECTED_MENU_ITEM_SUCCESS,
            payload: data
        })
    }
}