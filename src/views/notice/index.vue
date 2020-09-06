<template>
  <div id="notice">
    <order-search />
    <div class="noticeBox" v-if="!loadingFirst">
      <div class="noticeHead">
        <div class="title" v-if="$store.getters.language === 'chinese'">
          <!--<span>标题：</span>-->
          <span>{{ this.msg.c_an_name }}</span>
        </div>
        <div class="title" v-if="$store.getters.language === 'lao'">
          <!--<span>ຫົວຂໍ້：</span>-->
          <span>{{ this.msg.l_an_name }}</span>
        </div>
        <div class="msg" v-if="$store.getters.language === 'chinese'">
          <span>发表时间：</span>
          <span>{{ this.msg.l_an_time }}</span>
        </div>
        <div class="msg" v-if="$store.getters.language === 'lao'">
          <span>ເວລາ：</span>
          <span>{{ this.msg.l_an_time }}</span>
        </div>
      </div>
      <div
        class="noticeBody"
        v-html="msg.c_an_content"
        v-if="$store.getters.language === 'chinese'"
      ></div>
      <div
        class="noticeBody"
        v-html="msg.l_an_content"
        v-if="$store.getters.language === 'lao'"
      ></div>
    </div>
  </div>
</template>

<script>
import { announcementApi } from "@/api";
import { Toast } from "vant";
export default {
  name: "notice",
  data() {
    return {
      noticeId: "",
      msg: "",
      loadingFirst: false
    };
  },
  created() {
    this.loadingFirst = true;
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: "Loading..."
    });
    this.noticeId = this.$route.params.noticeId;
    //获取公告
    let data = {
      pageNumber: 1,
      pageCount: 999999
    };
    announcementApi(data)
      .then(response => {
        response.data.message.forEach(item => {
          if (this.noticeId === item.l_an_id) {
            this.msg = item;
          }
        });
        this.loadingFirst = false;
        Toast.clear();
      })
      .catch(() => {
        this.loadingFirst = false;
        Toast.clear();
      });
  },
  components: {
    OrderSearch: () => import("../component/orderSearch/")
  }
};
</script>

<style lang="scss">
#notice {
  .noticeHead {
    padding: 10px;
    border-bottom: solid 1px rgba(200, 200, 200, 0.5);
    color: #333333;
    .title {
      font-size: 18px;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }
    .msg {
      margin-top: 6px;
      font-size: 16px;
    }
  }
  .noticeBody {
    padding: 10px;
    color: #333333;
    img {
      max-width: 100%;
    }
  }
}
</style>
