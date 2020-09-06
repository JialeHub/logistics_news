<template>
  <div id="tracking">
    <order-search />
    <div class="trackingBox">
      <van-steps
        v-if="!loadingFirst"
        :active="msg.length - 1"
        direction="vertical"
      >
        <van-step v-for="item in msg" :key="item.l_log_id">
          <div class="van-step__circle" slot="inactive-icon"></div>
          <div
            class="van-step__circle"
            slot="active-icon"
            style="background-color: #07c160"
          ></div>

          <div class="box" v-if="$store.getters.language === 'chinese'">
            <div class="title">
              <div class="t1">
                【{{ item.c_log_state }}】 {{ item.c_log_branches }}
              </div>
              <div class="t2">{{ item.pc }}</div>
            </div>
            <div class="note">
              <span>{{ item.c_log_note }}</span>
            </div>
            <!--<van-collapse v-model="activeNameC">
              <van-collapse-item :name="item.l_log_id" >
                <div slot="title">
                  <div class="t1">【{{item.c_log_state}}】 {{item.c_log_branches}}</div>
                  <div class="t2">{{item.pc}}</div>
                </div>
                <div class="note">
                  <span>{{ item.c_log_note }}</span>
                </div>
              </van-collapse-item>
            </van-collapse>-->
            <p class="time">{{ item.l_log_time }}</p>
          </div>

          <div class="box" v-if="$store.getters.language === 'lao'">
            <div slot="title">
              <div class="t1">
                【{{ item.l_log_state }}】 {{ item.l_log_branches }}
              </div>
              <div class="t2">{{ item.pl }}</div>
            </div>
            <div class="note">
              <span>{{ item.l_log_note }}</span>
            </div>

            <!--<van-collapse v-model="activeNameL">
              <van-collapse-item :name="item.l_log_id" >
                <div slot="title">
                  <div class="t1">【{{item.l_log_state}}】 {{item.l_log_branches}}</div>
                  <div class="t2">{{item.pl}}</div>
                </div>
                <div class="note">
                  <span>{{ item.l_log_note }}</span>
                </div>
              </van-collapse-item>
            </van-collapse>-->
            <p class="time">{{ item.l_log_time }}</p>
          </div>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<script>
import { searchApi, searchApi2 } from "@/api";
import { Toast } from "vant";

export default {
  data() {
    return {
      activeNameC: [""],
      activeNameL: [""],
      order: "",
      msg: [],
      msgAll: "",
      loadingFirst: false
    };
  },
  name: "tracking",
  methods: {},
  components: {
    OrderSearch: () => import("../component/orderSearch/")
  },
  created() {
    this.order = this.$route.query.order;
  },
  mounted() {},
  watch: {
    "$route.query.order"(newValue) {
      this.order = newValue;
    },
    order(newValue) {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "Loading..."
      });
      this.loadingFirst = true;
      searchApi({ s: newValue })
        .then(response => {
          this.msgAll =
            response.data.Order !== null
              ? response.data.Order
              : response.data.childSingleTable_logisticsupdate;
          if (
            response.data.Order !== null ||
            (response.data.childSingleTable_logisticsupdate &&
              response.data.childSingleTable_logisticsupdate.length !== 0)
          ) {
            this.loadingFirst = false;
            Toast.clear();
            let msgData;
            if (response.data.childSingleTable_logisticsupdate.length !== 0) {
              msgData = response.data.childSingleTable_logisticsupdate;
            } else {
              msgData = response.data.Order.l_logisticsupdate;
            }
            //msgData.reverse();
            this.msg = msgData;
            msgData.forEach(item => {
              let temp = "";
              let templ = "";
              let temp2 = (item.c_log_member !== undefined && item.c_log_member !== "" )?`（联系电话：${item.c_co_contact}）`:"";
              let temp2l = (item.l_log_member !== undefined && item.l_log_member !== "" )?`(ເບີໂທຕິດຕໍ່:${item.l_co_contact})`:"";
              switch (item.c_log_state) {
                case "揽收":
                  temp = (item.c_log_branches !== undefined && item.c_log_branches !== "" )?`【${item.c_log_branches}】`:"";
                  temp += (item.c_log_member !== undefined && item.c_log_member !== "" )?` 已由快递员【${item.c_log_member}】${temp2}收取快递。`:"";
                  templ = (item.l_log_branches !== undefined && item.l_log_branches !== "" )?`【${item.l_log_branches}】`:"";
                  templ += (item.l_log_member !== undefined && item.l_log_member !== "" )?` ຜູ້ໄປສະນີຂອງທ່ານໄດ້ຖືກເກັບ ກຳ ໂດຍຕົວແທນ 【${item.l_log_member}】${temp2l}ໄດ້ຮັບການສົ່ງຈົດ ໝາຍ.`:"";
                  item.pc = `${temp}(收件人：${response.data.Order.c_o_endName}，${response.data.Order.c_o_endPhone})`;
                  item.pl = `${templ}(ຜູ້ຮັບ：${response.data.Order.l_o_endName} ，${response.data.Order.l_o_endPhone})`;
                  break;
                case "发出":
                  item.pc = `快件在【${item.c_log_branches}】已发出，准备发往：【${item.c_log_username}】`;
                  item.pl = `Courier ຢູ່【${item.l_log_branches}】ໄດ້ເລີ່ມຕົ້ນແລ້ວ，ພ້ອມສົ່ງ：【${item.l_log_username}】`;
                  break;
                case "到达":
                  item.pc = `快件已到达【${item.c_log_branches}】`;
                  item.pl = `ການຂົນສົ່ງໄດ້ມາຮອດແລ້ວ【${item.l_log_branches}】`;
                  break;
                case "派送":
                case "待取件":
                  temp = ( item.c_log_member !== undefined && item.c_log_member !== "" )?`已交给快递员【${item.c_log_member}】${temp2}，`:"" ;
                  templ = ( item.l_log_member !== undefined && item.l_log_member !== "" )?`ຈັດສົ່ງດ່ວນ【${item.l_log_member}】${temp2l}，`:"" ;
                  item.pc = `快件${temp}待取件中.`;
                  item.pl = `${templ}ທີ່ຍັງຄ້າງ.`;
                  break;
                case "问题件":
                  temp = ( item.c_log_member !== undefined && item.c_log_member !== "" )?`，请联系快递员【${item.c_log_member}】${temp2}`:""
                  templ = ( item.l_log_member !== undefined && item.l_log_member !== "" )?`，ກະລຸນາຕິດຕໍ່ໄປສະນີດ່ວນ【${item.l_log_member}】${temp2l}`:""
                  item.pc = `您的快件状态异常${temp}`;
                  item.pl = `ການຂົນສົ່ງຂອງທ່ານມີຂໍ້ບົກພ່ອງ${templ}`;
                  break;
                case "签收":
                  temp = ( item.c_log_member !== undefined && item.c_log_member !== "" ) ? `由快递员【${item.c_log_member}】${temp2}`: ""
                  templ = ( item.l_log_member !== undefined && item.l_log_member !== "" ) ? `ຜູ້ໄປສະນີຂອງທ່ານໄດ້ຖືກເກັບ ກຳ ໂດຍຕົວແທນ 【${item.l_log_member}】${temp2l}ຈັດສົ່ງ`: "ຜູ້ໄປສະນີຂອງທ່ານໄດ້ຖືກຈັດສົ່ງແລ້ວ"
                  item.pc = `您的快件已${temp}送达，感谢您使用韻達快遞，期待再次为您服务。`;
                  item.pl = `${templ}，ຂອບໃຈທີ່ໃຊ້ Yunda Express ພວກເຮົາຫວັງວ່າຈະໄດ້ຮັບໃຊ້ທ່ານອີກຄັ້ງ.`;
                  break;
              }
            });
          } else {
            searchApi2({ s: newValue })
              .then(response => {
                Toast.clear();
                this.msgAll =
                  response.data.Order !== null
                    ? response.data.Order
                    : response.data.childSingleTable_logisticsupdate;
                if (
                  response.data.Order !== null ||
                  (response.data.childSingleTable_logisticsupdate &&
                    response.data.childSingleTable_logisticsupdate.length !== 0)
                ) {
                  let msgData;
                  if (
                    response.data.childSingleTable_logisticsupdate.length !== 0
                  ) {
                    msgData = response.data.childSingleTable_logisticsupdate;
                  } else {
                    msgData = response.data.Order.l_logisticsupdate;
                  }
                  //msgData.reverse();
                  this.msg = msgData;
                  msgData.forEach(item => {
                    let temp = "";
                    let templ = "";
                    let temp2 = (item.c_log_member !== undefined && item.c_log_member !== "" )?`（联系电话：${item.c_co_contact}）`:"";
                    let temp2l = (item.l_log_member !== undefined && item.l_log_member !== "" )?`(ເບີໂທຕິດຕໍ່:${item.l_co_contact})`:"";
                    switch (item.c_log_state) {
                      case "揽收":
                        temp = (item.c_log_branches !== undefined && item.c_log_branches !== "" )?`【${item.c_log_branches}】`:"";
                        temp += (item.c_log_member !== undefined && item.c_log_member !== "" )?` 已由快递员【${item.c_log_member}】${temp2}收取快递。`:"";
                        templ = (item.l_log_branches !== undefined && item.l_log_branches !== "" )?`【${item.l_log_branches}】`:"";
                        templ += (item.l_log_member !== undefined && item.l_log_member !== "" )?` ຜູ້ໄປສະນີຂອງທ່ານໄດ້ຖືກເກັບ ກຳ ໂດຍຕົວແທນ 【${item.l_log_member}】${temp2l}ໄດ້ຮັບການສົ່ງຈົດ ໝາຍ.`:"";
                        item.pc = `${temp}(收件人：${response.data.Order.c_o_endName}，${response.data.Order.c_o_endPhone})`;
                        item.pl = `${templ}(ຜູ້ຮັບ：${response.data.Order.l_o_endName} ，${response.data.Order.l_o_endPhone})`;
                        break;
                      case "发出":
                        item.pc = `快件在【${item.c_log_branches}】已发出，准备发往：【${item.c_log_username}】`;
                        item.pl = `Courier ຢູ່【${item.l_log_branches}】ໄດ້ເລີ່ມຕົ້ນແລ້ວ，ພ້ອມສົ່ງ：【${item.l_log_username}】`;
                        break;
                      case "到达":
                        item.pc = `快件已到达【${item.c_log_branches}】`;
                        item.pl = `ການຂົນສົ່ງໄດ້ມາຮອດແລ້ວ【${item.l_log_branches}】`;
                        break;
                      case "派送":
                      case "待取件":
                        temp = ( item.c_log_member !== undefined && item.c_log_member !== "" )?`已交给快递员【${item.c_log_member}】${temp2}，`:"" ;
                        templ = ( item.l_log_member !== undefined && item.l_log_member !== "" )?`ຈັດສົ່ງດ່ວນ【${item.l_log_member}】${temp2l}，`:"" ;
                        item.pc = `快件${temp}待取件中.`;
                        item.pl = `${templ}ທີ່ຍັງຄ້າງ.`;
                        break;
                      case "问题件":
                        temp = ( item.c_log_member !== undefined && item.c_log_member !== "" )?`，请联系快递员【${item.c_log_member}】${temp2}`:""
                        templ = ( item.l_log_member !== undefined && item.l_log_member !== "" )?`，ກະລຸນາຕິດຕໍ່ໄປສະນີດ່ວນ【${item.l_log_member}】${temp2l}`:""
                        item.pc = `您的快件状态异常${temp}`;
                        item.pl = `ການຂົນສົ່ງຂອງທ່ານມີຂໍ້ບົກພ່ອງ${templ}`;
                        break;
                      case "签收":
                        temp = ( item.c_log_member !== undefined && item.c_log_member !== "" ) ? `由快递员【${item.c_log_member}】${temp2}`: ""
                        templ = ( item.l_log_member !== undefined && item.l_log_member !== "" ) ? `ຜູ້ໄປສະນີຂອງທ່ານໄດ້ຖືກເກັບ ກຳ ໂດຍຕົວແທນ 【${item.l_log_member}】${temp2l}ຈັດສົ່ງ`: "ຜູ້ໄປສະນີຂອງທ່ານໄດ້ຖືກຈັດສົ່ງແລ້ວ"
                        item.pc = `您的快件已${temp}送达，感谢您使用韻達快遞，期待再次为您服务。`;
                        item.pl = `${templ}，ຂອບໃຈທີ່ໃຊ້ Yunda Express ພວກເຮົາຫວັງວ່າຈະໄດ້ຮັບໃຊ້ທ່ານອີກຄັ້ງ.`;
                        break;
                    }
                  });
                } else {
                  if (this.$store.getters.language === "lao") {
                    Toast.fail("ຈໍານວນນີ້ບໍ່ສາມາດຄົ້ນຫາ");
                  } else {
                    Toast.fail("搜索不到此单号");
                  }
                  this.$router.go(-1);
                }
                this.loadingFirst = false;
              })
              .catch(() => {
                Toast.clear();
                this.loadingFirst = false;
              });
          }
        })
        .catch(() => {
          Toast.clear();
          this.loadingFirst = false;
        });
    },
    immediate: true
  }
};
</script>

<style lang="scss">
#tracking {
  .t2 {
    font-size: 14px;
    font-weight: normal;
    line-height: 20px;
    margin-left: 6px;
    color: #6e6e6e;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    border-bottom: none;
  }
  .t2 {
    padding: 6px 10px 4px 6px;
  }
  .note {
    font-size: 14px;
    padding: 0 10px 6px 12px;
    color: #6e6e6e;
  }

  .van-hairline::before {
    z-index: 0;
  }

  .van-step--vertical {
    z-index: 0;
  }

  .trackingBox {
    > div {
      margin-bottom: 40px;
    }

    .time {
      color: rgba(150, 150, 150, 0.8);
      padding-left: 8px;
    }

    .van-collapse-item {
      .van-cell {
        padding: 0 10px 10px 0;
      }

      .van-cell::after {
        border-bottom: none !important;
      }

      .van-cell__title {
        font-size: 16px;
        font-weight: bold;
        border-bottom: none;
      }
    }

    .van-hairline--top-bottom::after {
      border-width: 0 !important;
    }

    .van-collapse-item__content {
      padding: 2px 8px 8px 8px;
    }
  }
}
</style>
