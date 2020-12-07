import Axios from 'axios'
import { types } from '../constants/type'

export const addToCart = (id, qty, userId = '') => async (dispatch, getState) => {

    try {
        const { data } = await Axios.get(`/api/products/${id}`)
        console.log(data)

        if (data) {
            const item = {
                product: data._id,
                price: data.price,
                image: data.image,
                user: userId,
                name: data.name,
                countInStock: data.countInStock,
                qty
            }
            if (userId !== '') {
                const token = getState().userLogin.userInfo.token
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                await Axios.post(`/cart/${userId}`, item, config)
            } else {
                localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
            }
            console.log('Added successfully')
            dispatch({
                type: types.CART_ADD,
                payload: item
            })
            //localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
        }
    } catch (err) {
        console.error(err);
        console.log(err)
    }
}

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: types.CART_REMOVE,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const fetchCartItems = (id) => async (dispatch, getState) => {
    const token = getState().userLogin.userInfo.token
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    const { data } = await Axios.get(`/cart/${id}`, config)
    console.log(data)
    dispatch({
        type: types.CART_FETCH,
        payload: data
    })
}

export const saveShippingAddress = (address) => async (dispatch) => {
    console.log('In Cart Action shipping')
    console.log(address)
    dispatch({
        type: types.SAVE_SHIPPING_ADDRESS,
        payload: address
    })
    localStorage.setItem('shippingAddress', JSON.stringify(address))
}

export const savePaymentMethod = (paymentMethod) => async (dispatch) => {
    dispatch({
        type: types.SAVE_PAYMENT_METHOD,
        payload: paymentMethod
    })
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
}