<template>
  <div id="home">
    <order-search />
    <div class="homeBox">
      <div class="p1">
        <div class="noticeMsgBox">
          <van-swipe style="height: 40px;" vertical :autoplay="5000">
            <van-swipe-item v-for="item in noticeMsg" :key="item.l_an_id">
              <van-notice-bar
                mode="link"
                left-icon="volume-o"
                @click="
                  $router.push({
                    name: 'notice',
                    params: { noticeId: item.l_an_id }
                  })
                "
              >
                <span v-if="$store.getters.language === 'chinese'">{{
                  item.c_an_name
                }}</span>
                <span v-if="$store.getters.language === 'lao'">{{
                  item.l_an_name
                }}</span>
              </van-notice-bar>
            </van-swipe-item>
            <div class="custom-indicator" slot="indicator"></div>
          </van-swipe>

          <!--<van-notice-bar mode="link" left-icon="volume-o">
            <span
              v-if="$store.getters.language === 'chinese'"
              @click="
                $router.push({
                  name: 'notice',
                  params: { noticeId: item.l_an_id }
                })
              "
              >{{ item.c_an_name }}</span
            >
            <span
              v-if="$store.getters.language === 'lao'"
              @click="
                $router.push({
                  name: 'notice',
                  params: { noticeId: item.l_an_id }
                })
              "
              >{{ item.l_an_name }}</span
            >
          </van-notice-bar>-->
        </div>
      </div>
      <div class="p2">
        <van-grid
          clickable
          :column-num="2"
          v-if="$store.getters.language === 'chinese'"
        >
          <van-grid-item
            icon="location-o"
            text="网点分布"
            to="./networkDistribution"
          />
          <van-grid-item icon="service-o" text="帮助中心" to="./help" />
        </van-grid>
        <van-grid
          clickable
          :column-num="2"
          v-if="$store.getters.language === 'lao'"
        >
          <van-grid-item
            icon="location-o"
            text="ເຄືອຂ່າຍການກະຈາຍ"
            to="./networkDistribution"
          />
          <van-grid-item icon="service-o" text="ຊ່ວຍເຫຼືອ" to="./help" />
        </van-grid>
      </div>
      <div class="p3">
        <van-panel
          title="最新新闻"
          v-if="$store.getters.language === 'chinese'"
        >
          <template #header>
            <div
              class="title"
              style="display: flex;justify-content: space-between;padding: 12px 10px;border-bottom:1px solid rgba(200,200,200,0.5)"
            >
              <span style="font-size: 16px;">新闻</span>
              <span
                style="font-size: 14px;color: #717171"
                @click="$router.push({ name: 'news' })"
                >更多</span
              >
            </div>
          </template>
          <!--<div class="newsListBody">
            <ul>
              <li v-for="item in newsList" :key="item.l_news[0].l_n_id">
                <div
                  class="newsBoxItem"
                  @click="
                    $router.push({
                      name: 'newsIn',
                      params: { newsId: item.l_news[0].l_n_id }
                    })
                  "
                >
                  <div class="msgIn">
                    <span>{{ item.l_news[0].c_n_name }}</span>
                    &lt;!&ndash;<span>{{ item.l_news[0].l_nC_time }}</span>&ndash;&gt;
                  </div>
                </div>
              </li>
            </ul>
          </div>-->
          <div class="newsInBox">
            <div class="newsInHead">
              <div class="title">
                <!--<span>标题：</span>-->
                <span>{{ this.msg.c_n_name }}</span>
                <!--<span class="titleR">{{ this.titleMsg.c_nC_name }}</span>-->
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
            <div class="newsInBody" v-html="msg.c_n_content"></div>
          </div>
        </van-panel>
        <van-panel title="ຂ່າວ" v-if="$store.getters.language === 'lao'">
          <template #header>
            <div
              class="title"
              style="display: flex;justify-content: space-between;padding: 12px 10px;border-bottom:1px solid rgba(200,200,200,0.5)"
            >
              <span style="font-size: 16px;">ຂ່າວ</span>
              <span
                style="font-size: 14px;color: #717171"
                @click="$router.push({ name: 'news' })"
                >ຫຼາຍ</span
              >
            </div>
          </template>
          <!--<div class="newsListBody">
            <ul>
              <li v-for="item in newsList" :key="item.l_news[0].l_n_id">
                <div
                  class="newsBoxItem"
                  @click="
                    $router.push({
                      name: 'newsIn',
                      params: { newsId: item.l_news[0].l_n_id }
                    })
                  "
                >
                  <div class="msgIn">
                    <span>{{ item.l_news[0].l_n_name }}</span>
                    &lt;!&ndash;<span>{{ item.l_news[0].l_nC_time }}</span>&ndash;&gt;
                  </div>
                </div>
              </li>
            </ul>
          </div>-->
          <div class="newsInHead">
            <div class="title">
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
          <div class="newsInBody" v-html="msg.l_n_content"></div>
        </van-panel>
      </div>
    </div>
  </div>
</template>

<script>
import { announcementApi, getAllApi } from "@/api";
import { Toast } from "vant";

export default {
  name: "home",
  data() {
    return {
      noticeMsg: [],
      newClassification: [],
      newsList: [],
      msg: "",
      titleMsg: {}
    };
  },
  methods: {
    /*getNews(newsClassIds, index = 0) {
        let data = {
          pageNumber: 1,
          pageCount: 99999,
          l_nC_id: newsClassIds[index]
        };
        newsApi(data)
          .then(response => {

            response.data.message.forEach(item => {
              this.newsList = this.newsList.concat(item.l_news);
            });
            index++;
            if (index < newsClassIds.length) {
              this.getNews(newsClassIds, index);
            }
          })
          .catch(error => { });
      }*/
  },
  created() {
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: "Loading..."
    });
    //获取新闻/新闻分类
    let promise1 = new Promise((resolve, reject) => {
      /*let data = {
          pageNumber: 1,
          pageCount: 999999
        };
        newClassificationApi(data)
          .then(response => {
            this.newClassification = response.data.message;
            let newsClassIds = [];
            this.newClassification.forEach(item => {
              newsClassIds.push(item.l_nC_id);
            });
            this.getNews(newsClassIds);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });*/
      getAllApi({ pageNumber: 1, pageCount: 1 })
        .then(response => {
          this.newsList = response.data.returnl_newsList;
          this.msg = response.data.returnl_newsList[0];
          //this.titleMsg = response.data.message[0];
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
    let promise2 = new Promise((resolve, reject) => {
      //获取公告
      let data2 = {
        pageNumber: 1,
        pageCount: 10
      };
      announcementApi(data2)
        .then(response => {
          this.noticeMsg = response.data.message;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
    Promise.all([promise1, promise2]).then(() => {
      Toast.clear();
    });
  },
  components: {
    OrderSearch: () => import("../component/orderSearch/")
  }
};
</script>

<style lang="scss">
#home {
  .van-grid {
    .van-grid-item__text {
      font-size: 15px;
    }
  }

  .p3 {
    .van-cell__title {
      font-size: 16px;
    }

    .newsListBody {
      padding: 0 16px;

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

    .van-grid-item {
      max-width: 25%;
    }

    .van-grid-item__text {
      max-width: 100%;
      font-size: 14px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }

    .newsInHead {
      padding: 8px 10px;
      border-bottom: solid 0.5px rgba(220, 220, 220, 0.8);
      color: #333333;

      .title {
        font-size: 16px;
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

  .homeBox {
    > div {
      margin-bottom: 40px;
    }
  }
}
</style>
