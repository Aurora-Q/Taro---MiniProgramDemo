import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { 
  onGetTokenService,
  onGetMenuListService,
  onGetGoodsListService,
  selectedMenuItem
 } from '../../store/main/actions'

import './index.scss'

@connect(
  ({main}) => ({
    ...main,
    token: main.token,
    menuData: main.menuData,
    goodsList: main.goodsList,
    isSelected: main.isSelected,
    selectedMenuId: main.selectedMenuId,
    initMenuId: main.initMenuId
  }), 
  {
    dispatchGetTokenService: onGetTokenService,
    dispatchGetMenuListService: onGetMenuListService,
    dispatchGetGoodsListService: onGetGoodsListService,
    onSelectedMenuItem: selectedMenuItem,
  }
)

class Index extends Component {
    config = {
    navigationBarTitleText: '首页'
  }

  constructor(props) {
    super(props);
  } 

  componentWillReceiveProps (nextProps) {}

  componentWillUnmount () { }

  componentDidShow () {
    let that = this;
    // this.props.dispatchGetTokenService({ js_code: '' }, res => {
    //   if (res.errcode === 0) {
    //     this.props.dispatchGetMenuListService({token: that.props.token})
    //   }
    that.props.dispatchGetMenuListService();
    that.props.dispatchGetGoodsListService();
   }

  componentDidHide () { }
  dispatchSelectedMenuItem(menu_id) {
    // this.props.menuData.map(item => {
    //   if (item.menu_id === menu_id) {
    //     this.setState({
    //       selectedMenuId: menu_id
    //     })
    //   }
    // })
    if (menu_id === this.props.selectedMenuId) return;
    this.props.onSelectedMenuItem(menu_id);
  }

  render () {
    // let menuItemCls = 'index_container_list_item'
    // if (this.state.isSelected) {
    //   menuItemCls = 'index_container_list_item_active'
    // }
    return (
      <View className='index_container'>
       <ScrollView className='index_container_list' scroll-y={true} style="height:100vh">
         {
           this.props.menuData.map(item => (
            item.menu_id === this.props.selectedMenuId ? 
            <View key={item.menu_id}>
                <View className='index_container_list_item_active' onClick={() => this.dispatchSelectedMenuItem(item.menu_id)}>{item.name}</View>
                {
                  item.cmenu && item.cmenu.length && item.cmenu.map(_item => (
                  <ScrollView className='index_container_list_show' key={_item.menu_id}>{_item.name}</ScrollView>
                  ))
                }
              </View> :  <View key={item.menu_id}>
                <View className='index_container_list_item' onClick={() => this.dispatchSelectedMenuItem(item.menu_id)}>{item.name}</View>
                {
                  item.cmenu && item.cmenu.length && item.cmenu.map(_item => (
                  <ScrollView className='index_container_list_show' key={_item.menu_id}>{_item.name}</ScrollView>
                  ))
                }
              </View> 
           ))
         }
       </ScrollView>
       <ScrollView className='index_container_good' scroll-y={true} style="height:100vh">
           {
             this.props.goodsList.map(item => (
              <View key={item.menu_id}>
                {
                  item.banner && 
                  <View className='index_container_pic'>
                    <Image className='index_container_pic_url' src={item.banner}></Image>
                  </View>
                }
                <View className='index_container_title'>{item.special_name}</View>
                <View className='index_container_good_item' key={item.menu_id}>
                 {
                   item.good.map(_item => (
                    <View className="index_container_good_content" key={_item.good_id}>
                      <View className='index_container_good_src'>
                          <Image className='index_container_good_src_url' src={_item.good_cover}></Image>
                      </View>
                      <View className='index_container_good_info'>{_item.good_name}</View>
                    </View>
                   ))
                 }
                </View>
              </View>
             ))
           }
         </ScrollView>
       </View>
    )
  }
}

export default Index
