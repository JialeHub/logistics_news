<template>
  <div id="orderSearch">
    <div class="orderSearchBox">
      <form action="/" @click.stop="onConfirm(true)">
        <van-search
          v-model="searchValue"
          placeholder="输入物流单号以搜索"
          @search="onSearch"
          v-if="$store.getters.language === 'chinese'"
        >
          <div slot="right-icon" @click.stop="onSearch(searchValue)">
            <div class="searchBtn">
              <van-icon name="search" color="white" />
            </div>
          </div>
        </van-search>
        <van-search
          v-model="searchValue"
          placeholder="ກະລຸນາໃສ່ ໝາຍ ເລກການຂົນສົ່ງເພື່ອຄົ້ນຫາ"
          @search="onSearch"
          v-if="$store.getters.language === 'lao'"
        >
          <div slot="right-icon" @click.stop="onSearch(searchValue)">
            <div class="searchBtn">
              <van-icon name="search" color="white" />
            </div>
          </div>
        </van-search>
      </form>
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="searchValue"
          :options="orderHistoryOptions"
        />
        <van-dropdown-item ref="searchItem">
          <van-cell
            :title="item.text"
            v-for="item in orderHistoryOptions"
            :key="item.value"
            @click="onConfirm(false, item.value)"
            class="searchItem"
          >
            <van-icon
              slot="right-icon"
              name="close"
              style="line-height: inherit;"
              @click.stop="cancelItem(item.value)"
            />
          </van-cell>
          <van-cell
            :title="
              $store.getters.language === 'chinese'
                ? '清空所有历史记录'
                : 'ລ້າງປະຫວັດທັງ ໝົດ'
            "
            center
            class="cancelAllBtn"
            @click="cancelAll"
            v-if="orderHistoryOptions.length !== 0"
          />
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { searchApi, searchApi2 } from "@/api";
//import Cookies from "js-cookie";

export default {
  name: "orderSearch",
  data() {
    return {
      searchValue: "",
      orderHistoryValue: "222",
      orderHistoryOptions: [],
      loadingFirst: false
    };
  },
  created() {
    if (
      this.$route.query.order !== undefined &&
      this.$route.query.order !== ""
    ) {
      this.searchValue = this.$route.query.order;
    }
  },
  mounted() {
    this.getOrderHistory();
  },
  watch: {
    "$route.name"(v) {
      if (
        v === "tracking" &&
        this.$route.query.order !== undefined &&
        this.$route.query.order !== ""
      ) {
        this.searchValue = this.$route.query.order;
      }
    },
    immediate: true,
    deep: true
  },
  methods: {
    onSearch(val) {
      this.$refs.searchItem.toggle(false);
      let val2 = val;
      let a = val.replace(/\s+/g, "");
      this.searchValue = a;
      val = a;
      let flag = true;
      if (flag) {
        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "Loading..."
        });
        this.loadingFirst = true;
        searchApi({ s: val })
          .then(response => {
            if (
              (response.data.Order !== null &&
                response.data.Order.length !== 0) ||
              (response.data.childSingleTable_logisticsupdate &&
                response.data.childSingleTable_logisticsupdate.length !== 0)
            ) {
              Toast.clear();
              let allOrderData;
              if (localStorage.getItem("order") !== null) {
                allOrderData = JSON.parse(localStorage.getItem("order"));
              }
              if (allOrderData === undefined || allOrderData === "") {
                allOrderData = [];
              }
              if (allOrderData.indexOf(val) !== -1) {
                allOrderData.splice(allOrderData.indexOf(val), 1);
              }
              allOrderData.unshift(val);
              localStorage.removeItem("order");
              localStorage.setItem("order", JSON.stringify(allOrderData), {
                expires: 30
              });
              this.$router.push({
                name: "tracking",
                query: {
                  order: val
                }
              });
              this.getOrderHistory();
              this.loadingFirst = false;
            } else {
              this.onSearch2(val2);
            }
          })
          .catch(() => {
            this.onSearch2(val2);
          });
      } else {
        if (this.$store.getters.language === "lao") {
          Toast.fail("ກະລຸນາໃສ່ ໝາຍ ເລກການຂົນສົ່ງທີ່ຖືກຕ້ອງ");
        } else {
          Toast.fail("请输入正确的快递单号");
        }
      }
    },
    onSearch2(val) {
      this.$refs.searchItem.toggle(false);
      let a = val.replace(/\s+/g, "");
      this.searchValue = a;
      val = a;
      let flag = true;
      if (flag) {
        searchApi2({ s: val })
          .then(response => {
            Toast.clear();
            if (
              (response.data.Order !== null &&
                response.data.Order.length !== 0) ||
              (response.data.childSingleTable_logisticsupdate &&
                response.data.childSingleTable_logisticsupdate.length !== 0)
            ) {
              let allOrderData;
              if (localStorage.getItem("order") !== null) {
                allOrderData = JSON.parse(localStorage.getItem("order"));
              }
              if (allOrderData === undefined || allOrderData === "") {
                allOrderData = [];
              }
              if (allOrderData.indexOf(val) !== -1) {
                allOrderData.splice(allOrderData.indexOf(val), 1);
              }
              allOrderData.unshift(val);
              localStorage.removeItem("order");
              localStorage.setItem("order", JSON.stringify(allOrderData), {
                expires: 30
              });
              this.$router.push({
                name: "tracking",
                query: {
                  order: val
                }
              });
              this.getOrderHistory();
            } else {
              if (this.$store.getters.language === "lao") {
                Toast.fail("ບໍ່ສາມາດຊອກຫາເລກ ລຳ ດັບການຂົນສົ່ງນີ້");
              } else {
                Toast.fail("搜索不到此单号");
              }
            }
            this.loadingFirst = false;
          })
          .catch(() => {
            Toast.clear();
            this.loadingFirst = false;
          });
      } else {
        if (this.$store.getters.language === "lao") {
          Toast.fail("ກະລຸນາໃສ່ ໝາຍ ເລກການຂົນສົ່ງທີ່ຖືກຕ້ອງ");
        } else {
          Toast.fail("请输入正确的快递单号");
        }
      }
    },
    getOrderHistory() {
      let allOrderData;
      if (localStorage.getItem("order") !== null) {
        allOrderData = JSON.parse(localStorage.getItem("order"));
      }
      if (allOrderData === undefined || allOrderData === "") {
        allOrderData = [];
      }
      let orderHistoryOptionsTemp = [];
      allOrderData.forEach(item => {
        orderHistoryOptionsTemp.push({ text: item, value: item });
      });
      this.orderHistoryOptions = orderHistoryOptionsTemp;
    },
    cancelAll() {
      localStorage.removeItem("order");
      this.getOrderHistory();
    },
    cancelItem(val) {
      let allOrderData;
      if (localStorage.getItem("order") !== null) {
        allOrderData = JSON.parse(localStorage.getItem("order"));
      }
      if (allOrderData === undefined || allOrderData === "") {
        allOrderData = [];
      }
      localStorage.removeItem("order");
      allOrderData.splice(allOrderData.indexOf(val), 1);
      localStorage.setItem("order", JSON.stringify(allOrderData));
      this.getOrderHistory();
    },
    onConfirm(open, val) {
      this.$refs.searchItem.toggle(open);
      if (val !== undefined && val !== "") {
        this.searchValue = val;
        this.onSearch(val);
      }
      //this.$refs.searchItem.toggle();
    }
  }
};
</script>

<style lang="scss">
#orderSearch {
  .cancelAllBtn {
    .van-cell__title {
      text-align: center;
    }
  }

  .searchItem,
  .cancelAllBtn {
    transition: all 0.1s;
  }

  .searchItem:active,
  .cancelAllBtn:active {
    background-color: #eaeaea;
    transition: all 0.1s;
  }

  .van-dropdown-menu {
    height: 0;
    overflow: hidden;
  }

  .searchBtn {
    background-color: #1989fa;
    padding: 0 4px;
    border-radius: 40%;
    transition: all 0.05s;
  }

  .searchBtn:active {
    background-color: #1864ff;
    transition: all 0.05s;
  }
}
</style>
