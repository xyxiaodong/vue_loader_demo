<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 购物车为空的时候显示 -->
                                <tr v-if="!isempty">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 购物车有数据时显示 -->
                                <tr v-for="(item, index) in message" :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch v-model="item.isSelected" active-color="#409eff" inactive-color="#555555">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo"><img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <el-input-number @change="change($event,index)" v-model="item.buycount" size="mini" :min="1" label="描述文字"></el-input-number>
                                    </td>
                                    <td width="104" align="left">{{item.buycount*item.sell_price}}</td>
                                    <td width="54" align="center">
                                        <a @click="delItem(index)" href="javascript:void(0)">删除</a>
                                    </td>
                                </tr>

                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "buyCart",
  data: function() {
    return {
      message: [],
      isempty: true //默认购物车为空
    };
  },
  computed: {
    //   购物车商品总数量
    totalCount() {
      let num = 0;
      this.message.forEach(e => {
        if (e.isSelected) {
          num += this.$store.state.buyCartList[e.id];
        }
      });
      return num;
    },
    // 购物车 商品总金额
    totalPrice() {
      let num = 0;
      this.message.forEach(e => {
        if (e.isSelected) {
          num += e.buycount * e.sell_price;
        }
      });
      return num;
    }
  },
  methods: {
    change($event, index) {
      // console.log($event);
      // console.log(index);
      this.$store.commit("updateBuyNum", {
        id: this.message[index].id,
        goodsNum: $event
      });
    },
    //删除购物车
    delItem(index) {
      this.$store.commit("delBuyCart", this.message[index]);
      this.message.splice(index, 1);
      if (this.message.length == 0) {
          this.isempty = false;
      }
    }
  },
  //生命周期函数
  created() {
    let ids = [];
    for (const key in this.$store.state.buyCartList) {
      ids.push(key);
    }
    if (ids.length != 0) {
      this.isempty = true;
      ids = ids.join(",");

      this.axios
        .get(`site/comment/getshopcargoods/${ids}`)
        .then(response => {
          response.data.message.forEach(e => {
            e.buycount = this.$store.state.buyCartList[e.id];
            e.isSelected = true;
          });
          this.message = response.data.message;
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.isempty = false;
    }
  }
};
</script>
<style scoped>
</style>


