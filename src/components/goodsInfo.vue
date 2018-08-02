
<template>
    <!-- eslint-disable -->
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <ProductZoomer v-if="imglist.length" :baseImages="images" :base-zoomer-options="zoomerOptions"></ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <!-- <div class="el-input-number el-input-number--small">
                                                    <span role="button" class="el-input-number__decrease is-disabled">
                                                        <i class="el-icon-minus"></i>
                                                    </span>
                                                    <span role="button" class="el-input-number__increase">
                                                        <i class="el-icon-plus"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                       
                                                        <input autocomplete="off" size="small" type="text" rows="2" max="60" min="1" validateevent="true" class="el-input__inner" role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1" aria-disabled="false">
                                                       
                                                    </div>
                                                </div> -->
                                                <el-input-number size="small" v-model="goodsNum" @change="handleChange" :min="1" :max="10"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <Affix>
                                    <ul>

                                        <li>
                                            <a href="javascript:;" :class="{selected:isGoodsInfo}" @click="isGoodsInfo=true">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" :class="{selected:!isGoodsInfo}" @click="isGoodsInfo=false">商品评论</a>
                                        </li>
                                    </ul>
                                </Affix>
                            </div>
                            <div class="tab-content entry" v-show="isGoodsInfo" v-html="goodsinfo.content">
                                <!-- 商品介绍 -->
                            </div>
                            <!-- 商品评论 -->
                            <div class="tab-content" v-show="!isGoodsInfo">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！" v-model.trim="commenttxt"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click="submitComments">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <ul id="commentList" class="list-box">
                                        <p v-if="!commentContent.length" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in commentContent" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.reply_time | cutTime}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>

                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page @on-change="change" :page-size="pageSize" :total="totalcount" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="`/goodsInfo/`+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="`/goodsInfo/`+item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | cutTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BackTop></BackTop>
        <!--  -->
        <img class="moveImg" v-if="imglist.length!=0" :src="imglist[0].original_path" style="display:none" alt="">
    </div>

</template>
<script>
/* eslint-disable */
//引入放大镜组件
import ProductZoomer from "vue-product-zoomer";
import $ from "jquery";

export default {
  name: "goodsInfo",
  data: function() {
    return {
      isGoodsInfo: true, //判断显示的是商品详情还是评论
      goodsinfo: [],
      imglist: [],
      hotgoodslist: [],
      pageIndex: 1, //显示的评论的当前页码
      pageSize: 5, //每页显示的评论条数
      commentContent: [], //评论的具体内容
      totalcount: 0, //评论总条数
      commenttxt: "", //提交的评论内容
      goodsNum: 1, //购买的商品的数量
      images: {
        normal_size: []
      },
      zoomerOptions: {
        zoomFactor: 2,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "inline-zoomer",
        move_by_click: true,
        scroll_items: 5,
        choosed_thumb_border_color: "#bbdefb"
      }
      //   zoomerOptions: {
      //     zoomFactor: 4,
      //     pane: "container",
      //     hoverDelay: 300,
      //     namespace: "container-zoomer",
      //     move_by_click: true,
      //     scroll_items: 4,
      //     choosed_thumb_border_color: "#ff3d00"
      //   }
    };
  },
  components: {
    ProductZoomer
  },
  created() {
    this.getgoodsinfo();
    this.getCommentInfo();
  },
  methods: {
    //   加入购物车
    cartAdd() {
      let offset = $("#buyButton .add").offset();
      // 获取购物车的位置
      let cartOffset = $(".icon-cart").offset();
      // // console.log(offset);// top left
      $(".moveImg")
        .show()
        .addClass("move")
        .css(offset).stop()
        .animate(cartOffset, 1000, () => {
          $(".moveImg")
            .removeClass("move")
            .hide();
        });

      this.$store.commit("updateBuyCart", {
        id: this.$route.params.id,
        goodsNum: this.goodsNum
      });
    },
    //修改购买数量
    handleChange(value) {
      this.goodsNum = value;
    },
    //   获取商品详情
    getgoodsinfo() {
      this.imglist = [];
      this.images.normal_size = [];
      this.axios
        .get(`site/goods/getgoodsinfo/${this.$route.params.id}`)
        .then(response => {
          this.goodsinfo = response.data.message.goodsinfo;
          this.imglist = response.data.message.imglist;
          this.hotgoodslist = response.data.message.hotgoodslist;

          this.imglist.forEach((e, i) => {
            this.images.normal_size.push({
              id: e.id,
              url: e.thumb_path
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取评论信息
    getCommentInfo() {
      this.commentContent = [];
      this.axios
        .get(
          `site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(response => {
          this.commentContent = response.data.message;
          this.totalcount = response.data.totalcount;
          this.pageIndex = response.data.pageIndex;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 页码改变
    change(value) {
      this.pageIndex = value;
      this.getCommentInfo();
    },
    //提交评论
    submitComments() {
      if (this.commenttxt == "") {
        this.$Message.error("评论内容为空");
      } else {
        this.axios
          .post(`site/validate/comment/post/goods/${this.$route.params.id}`, {
            commenttxt: this.commenttxt
          })
          .then(response => {
            this.commenttxt = "";
            this.$Message.success("评论提交成功");
            this.getCommentInfo();
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  watch: {
    $route(to, from) {
      this.getgoodsinfo();
      this.getCommentInfo();
    }
  }
};
</script>
<style scoped lang="scss">
@import url("../../node_modules/font-awesome/css/font-awesome.min.css");
.inline-zoomer-zoomer-box {
  width: 368px;
}
// .pic-box .control-box .thumb-list {
// //   display: flex;
// }
.thumb-list {
  background-color: yellow;
  img {
    height: 78px;
    width: 78px;
    margin: 5px;
  }
}
.control i {
  text-align: center;
}

.moveImg{
    width: 40px;
    position: absolute;
    top: 0;
    right: 50px;
}
.moveImg.move{
    transform: scale(.5,.5) rotateZ(3600deg);
    opacity: .4;
    transition: transform 1s,opacity  1s;
}
</style>

