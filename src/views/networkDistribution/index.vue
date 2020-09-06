<template>
  <div id="networkDistribution">
    <div class="networkDistributionBox">
      <div class="search">
        <div class="selectBox">
          <van-dropdown-menu>
            <van-dropdown-item
              v-model="selectValue"
              :options="selectOptionC"
              v-if="$store.getters.language === 'chinese'"
            />
            <van-dropdown-item
              v-model="selectValue"
              :options="selectOptionL"
              v-if="$store.getters.language === 'lao'"
            />
          </van-dropdown-menu>
        </div>
        <div class="searchBox">
          <form action="/">
            <van-search
              v-model="searchValue"
              placeholder="搜索网点"
              @search="onSearch"
              v-if="$store.getters.language === 'chinese'"
            />
            <van-search
              v-model="searchValue"
              placeholder="ຄົ້ນຫາ"
              @search="onSearch"
              v-if="$store.getters.language === 'lao'"
            />
          </form>
        </div>
      </div>
      <div class="networkDistributionIn">
        <van-list
          v-model="loading"
          :loading-text="loadingText"
          :finished="finished"
          :finished-text="finishedText"
          :error.sync="error"
          :error-text="errorText"
          @load="onLoad"
        >
          <li v-for="item in msg" :key="item.u_id">
            <div class="msgBox" v-if="$store.getters.language === 'chinese'">
              <div class="name">
                <span
                  style="width: 4.5rem; display: inline-block;text-align: right;margin-right: 0.5rem"
                  >网点名称:</span
                >
                <span>{{ item.c_branchesName }}</span>
              </div>
              <div class="address">
                <span
                  style="width: 4.5rem; display: inline-block;text-align: right;margin-right: 0.5rem"
                  >网点地址:</span
                >
                <span>{{ item.c_br_address }}</span>
              </div>
              <div class="contact">
                <span
                  style="width: 4.5rem; display: inline-block;text-align: right;margin-right: 0.5rem"
                  >联系方式:</span
                >
                <a :href="'tel:' + item.c_br_phone">
                  <span>{{ item.c_br_phone }}</span>
                </a>
              </div>
            </div>
            <div class="msgBox" v-if="$store.getters.language === 'lao'">
              <div class="name">
                <span
                  style="width: 5rem; display: inline-block;text-align: right;margin-right: 0.5rem"
                  >ຊື່:</span
                >
                <span>{{ item.l_branchesName }}</span>
              </div>
              <div class="address">
                <span
                  style="width: 5rem; display: inline-block;text-align: right;margin-right: 0.5rem"
                  >ທີ່ຢູ່:</span
                >
                <span>{{ item.l_br_address }}</span>
              </div>
              <div class="contact">
                <span
                  style="width: 5rem; display: inline-block;text-align: right;margin-right: 0.5rem"
                  >ຂໍ້ມູນຕິດຕໍ່:</span
                >
                <a :href="'tel:' + item.l_br_phone">
                  <span>{{ item.l_br_phone }}</span>
                </a>
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
          v-if="$store.getters.language === 'chinese' && this.msg.length === 0"
        >
          找不到网点
        </van-divider>
        <van-divider
          :style="{ borderColor: '#333333', padding: '0 10px' }"
          v-if="$store.getters.language === 'chinese' && this.msg.length !== 0"
        >
          没有更多了
        </van-divider>
        <van-divider
          :style="{ borderColor: '#333333', padding: '0 10px' }"
          v-if="$store.getters.language === 'lao' && this.msg.length === 0"
        >
          ບໍ່ມີຂໍ້ມູນ
        </van-divider>
        <van-divider
          :style="{ borderColor: '#333333', padding: '0 10px' }"
          v-if="$store.getters.language === 'lao' && this.msg.length !== 0"
        >
          ບໍ່ມີຂໍ້ມູນເພີ່ມເຕີມ
        </van-divider>
      </div>-->
    </div>
  </div>
</template>

<script>
import { getallUserApi, searchWangDianApi } from "@/api";

export default {
  name: "networkDistribution",
  data() {
    return {
      error: false,
      loading: false,
      finished: false,
      selectValue: "name",
      selectOptionC: [
        { text: "网点名称", value: "name" },
        { text: "网点地址", value: "address" },
        { text: "联系方式", value: "contact" }
      ],
      selectOptionL: [
        { text: "ຊື່", value: "name" },
        { text: "ທີ່ຢູ່", value: "address" },
        { text: "ຂໍ້ມູນຕິດຕໍ່", value: "contact" }
      ],
      searchValue: "",
      pageNumber: 1,
      pageCount: 5,
      msg: [],
      finishedText: "",
      errorText: "",
      loadingText: ""
    };
  },
  created() {
    this.onLoad();
    if (this.$store.getters.language === "chinese") {
      this.finishedText = "已加载完毕";
      this.errorText = "请求失败，点击重新加载";
      this.loadingText = "加载中...";
    } else {
      this.finishedText = "ເພີ່ມເຕີມ";
      this.errorText = "ການຮ້ອງຂໍລົ້ມເຫລວ, ກົດເພື່ອໂຫລດ ໃໝ່";
      this.loadingText = "ກຳ ລັງໂຫລດ ...";
    }
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
    //搜索网点
    onSearch() {
      this.finished = false;
      this.loading = true;
      this.msg = [];
      this.pageNumber = 1;
      this.pageCount = 5;
      searchWangDianApi({ s: this.searchValue })
        .then(response => {
          this.error = false;
          this.msg = response.data.message;
          this.loading = false;
          this.finished = true;
        })
        .catch(() => {
          this.error = true;
          this.loading = false;
        });
    },
    //加载网点
    onLoad() {
      if (this.pageNumber === 1) {
        this.msg = [];
      }
      this.loading = true;
      let data = {
        pageNumber: this.pageNumber,
        pageCount: this.pageCount
      };
      getallUserApi(data)
        .then(response => {
          this.error = false;
          if (response.data.message.length < this.pageCount) {
            this.finished = true;
          }
          if (response.data.message.length !== 0) {
            response.data.message.forEach(item => {
              this.msg.push(item);
            });
            this.pageNumber++;
          } else {
            this.finished = true;
          }
          this.loading = false;
        })
        .catch(() => {
          this.error = true;
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss">
#networkDistribution {
  .more {
    flex: 0;
    background-color: white;
    padding: 16px 0;
    text-align: center;
  }
  .search {
    display: flex;
    box-shadow: 0 3px 3px 3px rgba(220, 220, 220, 0.3);
    .selectBox {
      flex: 0 0 100px;
      .van-hairline--top-bottom::after {
        border-width: 0 !important;
      }
    }
    .searchBox {
      flex: 1;
      .van-search {
        padding-top: 8px;
        padding-bottom: 8px;
      }
    }
  }
  .networkDistributionIn {
    li {
      background-color: white;
      border-top: solid 1px rgba(220, 220, 220, 0.8);
      border-bottom: solid 1px rgba(220, 220, 220, 0.8);
      padding: 10px;
      .msgBox > div {
        padding: 2px;
      }
    }
  }
}
</style>
