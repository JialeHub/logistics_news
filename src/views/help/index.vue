<template>
  <div id="help">
    <order-search />
    <div class="helpBox" v-if="$store.getters.language === 'chinese'">
      <van-cell
        title="客服电话"
        icon="phone-o"
        :value="item1.c_s_phone"
        v-for="item1 in msg"
        :key="item1.l_s_id"
      >
        <a :href="'tel:' + item1.l_s_phone">{{ item1.l_s_phone }}</a>
      </van-cell>
    </div>
    <div class="helpBox" v-if="$store.getters.language === 'lao'">
      <van-cell
        title="ໂທລະສັບບໍລິການລູກຄ້າ"
        icon="phone-o"
        :value="item2.l_s_phone"
        v-for="item2 in msg"
        :key="item2.l_s_id"
      >
        <a :href="'tel:' + item2.l_s_phone">{{ item2.l_s_phone }}</a>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { serviceApi } from "@/api";
import { Toast } from "vant";

export default {
  name: "help",
  data() {
    return {
      msg: []
    };
  },
  created() {
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: "Loading..."
    });
    serviceApi()
      .then(response => {
        this.msg = response.data.message;
        Toast.clear();
      })
      .catch(() => {
        Toast.clear();
      });
  },
  components: {
    OrderSearch: () => import("../component/orderSearch/")
  }
};
</script>

<style lang="scss">
#help {
}
</style>
