<template>
  <div id="newsIn">
    <!--<order-search />-->
    <div class="newsInBox" v-if="!loadingFirst">
      <div class="newsInHead">
        <div class="title" v-if="$store.getters.language === 'chinese'">
          <!--<span>标题：</span>-->
          <span>{{ this.msg.c_n_name }}</span>
          <!--<span class="titleR">{{ this.titleMsg.c_nC_name }}</span>-->
        </div>
        <div class="title" v-if="$store.getters.language === 'lao'">
          <!--<span>ຫົວຂໍ້：</span>-->
          <span>{{ this.msg.l_n_name }}</span>
          <!--<span class="titleR">{{ this.titleMsg.l_nC_name }}</span>-->
        </div>
        <!--<div class="msg" v-if="$store.getters.language === 'chinese'">
          <span>发表时间：</span>
          <span>{{ this.msg.l_n_time }}</span>
        </div>
        <div class="msg" v-if="$store.getters.language === 'lao'">
          <span>ເວລາ：</span>
          <span>{{ this.msg.l_n_time }}</span>
        </div>-->
      </div>
      <div
        class="newsInBody"
        v-html="msg.c_n_content"
        v-if="$store.getters.language === 'chinese'"
      ></div>
      <div
        class="newsInBody"
        v-html="msg.l_n_content"
        v-if="$store.getters.language === 'lao'"
      ></div>
    </div>
  </div>
</template>

<script>
import { getOneApi } from "@/api";
import { Toast } from "vant";

export default {
  name: "newsIn",
  data() {
    return {
      newsInId: "",
      msg: "",
      titleMsg: {},
      loadingFirst: false
    };
  },
  components: {
    OrderSearch: () => import("../component/orderSearch/")
  },
  created() {
    this.$route.meta.title = "韻達 | " + this.msg.c_n_name;
    this.loadingFirst = true;
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: "Loading..."
    });
    this.newsInId = this.$route.params.newsId;
    //获取新闻列表
    getOneApi({ id: this.newsInId })
      .then(response => {
        this.loading = false;
        this.msg = response.data.message;
        this.titleMsg = response.data.message;
        this.finished = true;
        this.loadingFirst = false;
        Toast.clear();
      })
      .catch(() => {
        this.loading = false;
        this.finished = true;
        Toast.clear();
      });
  }
};
</script>

<style lang="scss">
#newsIn {
  .newsInHead {
    padding: 15px 10px;
    border-bottom: solid 1px rgba(200, 200, 200, 0.5);
    color: #333333;

    .title {
      font-size: 18px;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

      .titleR {
        font-size: 15px;
        float: right;
        color: #717171;
      }
    }

    .msg {
      margin-top: 6px;
      font-size: 16px;
    }
  }

  .newsInBody {
    padding: 10px;
    color: #333333;

    img {
      max-width: 100%;
    }
  }
}
</style>
