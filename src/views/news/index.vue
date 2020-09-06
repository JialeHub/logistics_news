<template>
  <div id="news">
    <!--<order-search />-->
    <div class="newsBox" v-if="!loadingFirst && !finishedNone">
      <div
        class="newsListTitle"
        v-if="
          $route.params.newsClassId && $store.getters.language === 'chinese'
        "
      >
        <div class="title">
          <span>新闻分类：{{ this.head.c_nC_name }}</span>
        </div>
        <div class="time">
          <span>创建时间：{{ this.head.l_nC_time }}</span>
        </div>
      </div>
      <div
        class="newsListTitle"
        v-if="$route.params.newsClassId && $store.getters.language === 'lao'"
      >
        <div class="title">
          <span>ປະເພດບົດ：{{ this.head.l_nC_name }}</span>
        </div>
        <div class="time">
          <span>ສ້າງທີ່ໃຊ້ເວລາ：{{ this.head.l_nC_time }}</span>
        </div>
      </div>
      <div
        class="newsListTitle"
        v-if="
          !$route.params.newsClassId && $store.getters.language === 'chinese'
        "
      >
        <div class="title">所有新闻</div>
      </div>
      <div
        class="newsListTitle"
        v-if="!$route.params.newsClassId && $store.getters.language === 'lao'"
      >
        <div class="title">ຂ່າວທັງ ໝົດ</div>
      </div>
      <div class="newsListBody">
        <van-list
          v-model="loading"
          :loading-text="loadingText"
          :finished="finished"
          :finished-text="finishedText"
          :error.sync="error"
          :error-text="errorText"
          @load="onLoad"
        >
          <li v-for="item in msg" :key="item.l_n_id">
            <div
              class="newsBoxItem"
              @click="
                $router.push({
                  name: 'newsIn',
                  params: { newsId: item.l_n_id }
                })
              "
            >
              <div class="msgIn" v-if="$store.getters.language === 'chinese'">
                <span>{{ item.c_n_name }}</span>
                <!--<span>{{ item.l_nC_time }}</span>-->
              </div>
              <div class="msgIn" v-if="$store.getters.language === 'lao'">
                <span>{{ item.l_n_name }}</span>
                <!--<span>{{ item.l_nC_time }}</span>-->
              </div>
            </div>
          </li>
        </van-list>
      </div>
      <!--<div class="more" v-if="!finished">
        <div
          class="span"
          @click="onLoad"
          v-if="$store.getters.language === 'chinese' && !loading"
        >
          查看更多 <van-icon name="arrow-down" />
        </div>
        <div
          class="span"
          @click="onLoad"
          v-if="$store.getters.language === 'lao' && !loading"
        >
          ເພີ່ມເຕີມ <van-icon name="arrow-down" />
        </div>
        <van-loading v-if="loading" />
      </div>
      <div class="more" v-if="finished">
        <van-divider
          :style="{ borderColor: '#333333', padding: '0 10px' }"
          v-if="$store.getters.language === 'chinese'"
        >
          没有更多了
        </van-divider>
        <van-divider
          :style="{ borderColor: '#333333', padding: '0 10px' }"
          v-if="$store.getters.language === 'lao'"
        >
          ສະແດງໃຫ້ເຫັນທັງຫມົດໄດ້ຮັບການສໍາເລັດ
        </van-divider>
      </div>-->
    </div>
    <div class="noMsg" v-if="finishedNone">
      <span>暂无数据</span>
    </div>
  </div>
</template>

<script>
import { getAllApi } from "@/api";
import { Toast } from "vant";

export default {
  name: "news",
  data() {
    return {
      loadingFirst: true,
      loading: false,
      finished: false,
      pageNumber: 1,
      pageCount: 10,
      msg: [],
      head: {},
      finishedNone: false,
      finishedText: "",
      errorText: "",
      loadingText: ""
    };
  },
  watch: {
    "$store.getters.language"(newValue) {
      if (newValue === "chinese") {
        this.finishedText = "已加载完毕";
        this.errorText = "请求失败，点击重新加载";
        this.loadingText = "加载中...";
      } else {
        this.finishedText = "ເພີ່ມເຕີມ";
        this.errorText = "ການຮ້ອງຂໍລົ້ມເຫລວ, ກົດເພື່ອໂຫລດ ໃໝ່";
        this.loadingText = "ກຳ ລັງໂຫລດ ...";
      }
    },
    immediate: true
  },
  methods: {
    onLoad() {
      this.loading = true;
      if (this.$route.params.newsClassId) {
        let data = {
          pageNumber: this.pageNumber,
          pageCount: this.pageCount,
          l_nC_id: this.$route.params.newsClassId
        };
        getAllApi(data)
          .then(response => {
            this.error = false;
            if (response.data.message.length !== 0) {
              this.head = response.data.message[0];
              if (response.data.message[0].l_news.length < this.pageCount) {
                this.finished = true;
              }
              response.data.message[0].l_news.forEach(item => {
                this.msg.push(item);
              });
              this.finishedNone = false;
            } else {
              this.finished = true;
              this.finishedNone = true;
            }
            this.loading = false;
            this.pageNumber++;
            this.loadingFirst = false;
            Toast.clear();
          })
          .catch(() => {
            this.error = true;
            this.finishedNone = true;
            this.loading = false;
            this.finished = true;
            Toast.clear();
          });
      } else {
        getAllApi({ pageNumber: this.pageNumber, pageCount: this.pageCount })
          .then(response => {
            this.error = false;
            if (response.data.count !== 0) {
              this.head = response.data.message;
              this.msg = response.data.returnl_newsList;
              this.finished = true;
              this.finishedNone = false;
            } else {
              this.finished = true;
              this.finishedNone = true;
            }
            this.loading = false;
            this.loadingFirst = false;
            Toast.clear();
          })
          .catch(() => {
            this.error = true;
            this.finishedNone = true;
            this.loading = false;
            this.finished = true;
            Toast.clear();
          });
      }
    }
  },
  created() {
    if (this.$store.getters.language === "chinese") {
      this.finishedText = "已加载完毕";
      this.errorText = "请求失败，点击重新加载";
      this.loadingText = "加载中...";
    } else {
      this.finishedText = "ເພີ່ມເຕີມ";
      this.errorText = "ການຮ້ອງຂໍລົ້ມເຫລວ, ກົດເພື່ອໂຫລດ ໃໝ່";
      this.loadingText = "ກຳ ລັງໂຫລດ ...";
    }
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: "Loading..."
    });
    this.loadingFirst = true;
    this.onLoad();
  }
};
</script>

<style lang="scss">
#news {
  min-height: 100%;

  .noMsg {
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
    color: #969799;
  }

  .more {
    background-color: white;
    padding: 16px 0;
    text-align: center;
  }

  .newsBox {
    .newsListTitle {
      padding: 10px;
      border-bottom: solid 1px rgba(230, 230, 230, 0.5);
      color: #333333;

      .title {
        font-size: 18px;
      }

      .time {
        padding-top: 4px;
        color: #717171;
      }
    }

    .newsListBody {
      padding: 10px;

      li {
        border-bottom: solid 1px rgba(220, 220, 220, 0.5);
        padding: 10px 0;

        .msgIn {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
