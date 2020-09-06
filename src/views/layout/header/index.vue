<template>
  <div id="Head">
    <div class="headBox">
      <div class="p1">
        <van-nav-bar
          title="老撾韻達快遞"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
          v-if="$store.getters.language === 'chinese'"
        >
          <div class="lanBtn" @click="lanChange" slot="right">
            <!--<svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yuyan1"></use>
            </svg>-->
            <div class="searchIcon" style="width: 30px;height: 30px;">
              <img
                src="../../../assets/langChange.png"
                alt=""
                style="width: 100%;height: 100%;"
              />
            </div>
          </div>
        </van-nav-bar>
        <van-nav-bar
          title="Lao Yunda Exprese"
          left-text="ກັບໄປ"
          left-arrow
          @click-left="onClickLeft"
          v-if="$store.getters.language === 'lao'"
        >
          <div class="lanBtn" @click="lanChange" slot="right">
            <!--<svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yuyan1"></use>
            </svg>-->
            <div class="searchIcon" style="width: 30px;height: 30px;">
              <img
                src="../../../assets/langChange.png"
                alt=""
                style="width: 100%;height: 100%;"
              />
            </div>
          </div>
        </van-nav-bar>
      </div>
    </div>
    <van-popup v-model="langShow" round>
      <div class="langBox">
        <div
          :class="['top', isChinese ? 'selected' : '']"
          @click="languageValue = 'chinese'"
          ref="chineseChose"
        >
          <div class="iconBox">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-guoqi">中文</use>
            </svg>
          </div>
          <div class="text">
            中文
          </div>
        </div>
        <div
          :class="['bottom', isChinese ? '' : 'selected']"
          @click="languageValue = 'lao'"
          ref="laoChose"
        >
          <div class="iconBox">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-laozhua2"></use>
            </svg>
          </div>
          <div class="text">
            ປະເທດລາວ
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import "@/assets/lan/iconfont.js";
export default {
  name: "Head",
  data() {
    return {
      langShow: false,
      languageValue: "chinese",
      languageOption: [
        { text: "ຈີນ", value: "chinese" }, // 中文 |
        { text: "老挝文", value: "lao" } // ປະເທດລາວ |
      ]
    };
  },
  computed: {
    isChinese() {
      let language = this.$store.getters.language;
      return language === "chinese";
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    lanChange() {
      this.langShow = !this.langShow;
    }
  },
  created() {
    //默认语言为中文
    if (this.$store.getters.language === "") {
      this.$store.dispatch("setLanguage", "chinese");
    } else {
      this.languageValue = this.$store.getters.language;
    }
  },
  // mounted() {
  //   let language = this.$store.getters.language;
  //   if (language === "chinese") {
  //     addClass(this.$refs.chineseChose, "selected");
  //     removeClass(this.$refs.laoChose, "selected");
  //   } else {
  //     addClass(this.$refs.laoChose, "selected");
  //     removeClass(this.$refs.chineseChose, "selected");
  //   }
  // },
  watch: {
    languageValue(newValue) {
      switch (newValue) {
        case "chinese":
          this.$store.dispatch("setLanguage", newValue);
          //addClass(this.$refs.chineseChose, "selected");
          //removeClass(this.$refs.laoChose, "selected");
          this.langShow = false;
          break;
        case "lao":
          this.$store.dispatch("setLanguage", newValue);
          //addClass(this.$refs.laoChose, "selected");
          //removeClass(this.$refs.chineseChose, "selected");
          this.langShow = false;
          break;
      }
    }
  }
};
</script>

<style lang="scss">
#Head {
  z-index: 9999 !important;
  .van-popup {
    z-index: 99999 !important;
  }
  .lanBtn {
    height: 50px;
    font-size: 20px;
    color: #1989fa;
    line-height: 50px;
    transition: all 0.1s;
    transform: scale(1);
  }
  .lanBtn:active {
    transform: scale(0.9);
    transition: all 0.1s;
  }
  .searchIcon {
    img {
      margin-top: 10px;
    }
  }
  .langBox {
    width: 200px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    > div {
      display: flex;
      align-items: center;
      padding: 10px;
      border-bottom: 0.5px solid rgba(200, 200, 200, 1);
      > .iconBox {
        transform: scale(1);
        transition: all 0.1s;
      }
      transition: all 0.05s;
    }
    > div:last-child {
      border-bottom: none;
    }
    > div:active {
      background-color: rgba(180, 200, 250, 0.6);
      > .iconBox {
        transform: scale(0.8);
        transition: all 0.1s;
      }
      transition: all 0.05s;
    }
    .selected {
      background-color: rgba(180, 200, 250, 0.6);
      > .iconBox {
        transform: scale(1.05);
        transition: all 0.1s;
      }
      transition: all 0.05s;
    }
    .iconBox {
      margin-right: 10px;
    }
    .icon {
      font-size: 50px;
      width: 50px;
      height: 50px;
      //border-radius: 50%;
    }
    .bottom {
      overflow: hidden;
      .iconBox {
        border-radius: 50%;
        text-align: center;
        display: flex;
        justify-content: center;
        overflow: hidden;
        .icon {
          flex: 0 0 150%;
        }
      }
    }
  }
}
</style>
