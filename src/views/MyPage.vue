<template>
  <v-app>
    <div class="MyPage">
      <App_var />
      <v-container>
        <v-form>
          <v-divider></v-divider>
          <v-row>
            <v-subheader>好きな施設のジャンル</v-subheader>
          </v-row>
          <v-row align-content="center" justify="center">
            <v-col align="center">
              <v-btn
                color="#0461cd"
                dark
                @click.stop="openGdialog"
                rounded
                class="mr-1"
              >
                飲食店
              </v-btn>
              <selectSpotGourmet ref="GourmetDialog" />
              <v-btn
                color="#0575e6"
                dark
                @click.stop="openOdialog"
                rounded
                class="ms-1"
              >
                飲食店以外
              </v-btn>
              <selectSpotOther ref="OtherDialog" />
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col>
              <v-list shaped class="mx-auto">
                <v-list-item-group v-model="model" multiple>
                  <template v-for="(item, i) in items">
                    <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>

                    <v-list-item
                      v-else
                      :key="`item-${i}`"
                      :value="item"
                      color="#032b8d"
                      active-class=""
                      v-on:click="postTransportation(item)"
                    >
                      <template v-slot:default="{ active }">
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="item.displyname"
                          ></v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-checkbox
                            v-model="item.check"
                            :input-value="active"
                            color="#044eb7"
                          ></v-checkbox>
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-row>
            <v-col align="center">
              <v-select
                v-model="selectTime"
                :items="items_Time"
                item-text="time"
                item-value="id"
                :rules="[(v) => !!v || 'Item is required']"
                label="何分前に到着したいか"
              ></v-select>
            </v-col>
          </v-row>

          <v-divider></v-divider>
          <v-row align="center">
            <v-col align="center">
              <v-select
                v-model="selectWalkSpeed"
                :items="items_WalkSpeed"
                item-text="speed"
                item-value="id"
                :rules="[(v) => !!v || 'Item is required']"
                label="歩く速度"
              ></v-select>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row align="center">
            <v-col align="center">
              <v-text-field
                v-model="address"
                label="住所"
                hint="例：東京都小平市津田町2-1-1"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-row>
            <v-subheader>その他の設定</v-subheader>
          </v-row>
          <v-row align-content="center" justify="center">
            <v-col align="center">
              <v-btn
                v-on:click="toFavoriteSpotPage"
                rounded
                class="mx-auto text-center mr-1"
                color="#0461cd"
                dark
                ><v-icon left> mdi-map-marker </v-icon>
                お気に入りスポット</v-btn
              >
              <v-btn
                v-on:click="toSettingHomeTime"
                rounded
                class="mx-auto text-center ms-1"
                color="#0575e6"
                dark
                ><v-icon left> mdi-alarm </v-icon> 在宅時間</v-btn
              >
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <v-row align="center">
            <v-col align="center">
              <v-switch
                v-model="disabled1"
                class="ma-2"
                label="通知を許可"
                color="#032b8d"
              ></v-switch>
              <v-switch
                v-model="disabled2"
                class="ma-2"
                label="位置情報共有を許可"
                color="#032b8d"
              ></v-switch>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import App_var from "../components/App_bar";
import selectSpotGourmet from "../components/dialog/SelectSpots_Gourmet.vue";
import selectSpotOther from "../components/dialog/SelectSpots_Other.vue";
import _ from "lodash";

export default {
  name: "MyPage",
  components: {
    App_var,
    selectSpotGourmet,
    selectSpotOther,
  },
  data: () => ({
    items: [
      { displyname: "新幹線", name: "isShin", check: false },
      { displyname: "有料特急", name: "isExTrain", check: false },
      { displyname: "空路", name: "isAirPlane", check: false },
      { displyname: "高速バス", name: "isHighwayBus", check: false },
      { displyname: "路線/連絡バス", name: "isBus", check: false },
    ],
    model: [],
    disabled1: false,
    disabled2: false,
    selectTime: [],
    items_Time: [
      { id: "1", time: "5分前" },
      { id: "2", time: "10分前" },
      { id: "3", time: "15分前" },
      { id: "4", time: "30分前" },
      { id: "5", time: "1時間前" },
    ],
    selectWalkSpeed: [],
    items_WalkSpeed: [
      { id: "1", speed: "急いで" },
      { id: "2", speed: "少し急いで" },
      { id: "3", speed: "少しゆっくり" },
      { id: "4", speed: "ゆっくり" },
    ],
    address: "",
  }),
  computed: {
    allSelected() {
      return this.selected.length === this.items.length;
    },
    categories() {
      const search = this.search.toLowerCase();
      if (!search) return this.items;
      return this.items.filter((item) => {
        const text = item.text.toLowerCase();
        return text.indexOf(search) > -1;
      });
    },
    selections() {
      const selections = [];
      for (const selection of this.selected) {
        selections.push(selection);
      }
      return selections;
    },
  },

  watch: {
    selectWalkSpeed: {
      handler: function (newValue, oldValue) {
        console.log(
          "selectWalkSpeedが: [" +
            oldValue +
            "] から [" +
            newValue +
            "]に変更されたよ"
        );
        this.postWalkSpeedData();
      },
      deep: true,
    },
    selectTime: function (newValue, oldValue) {
      console.log(
        "selectTimeが: [" + oldValue + "] から [" + newValue + "]に変更されたよ"
      );
      this.postTimeData();
    },
    address: {
      handler: _.debounce(function () {
        this.postAddressData();
      }, 2000), //データの更新が終わった2秒後にpostAddressDataが実行される
      deep: true,
    },
  },

  mounted() {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "JWT " + this.$store.getters.getToken,
    };
    this.$axios
      .get("//nakano2021seminar.pythonanywhere.com/accounts/setting/transportation", {
        headers: headers,
        data: {},
      })
      .then(
        (response) => {
          for (var i of this.items) i.check = response.data[0][i.name];
        },
        (error) => {
          if (error.response.status == 401) this.$store.commit("logout");
        }
      );
    this.getWalkSpeedData();
    this.getTimeData();
    this.getAddressData();
  },

  methods: {
    openGdialog() {
      this.$refs.GourmetDialog.GdialogOpen();
    },
    openOdialog() {
      this.$refs.OtherDialog.OdialogOpen();
    },

    ////////////////以下、歩行速度のPOSTとGET/////////////////////
    getWalkSpeedData() {
      const headers = { "Authorization": "JWT " + this.$store.getters.getToken };
      this.$axios
        .get("//nakano2021seminar.pythonanywhere.com/accounts/setting/transportation", {
          data: {},
          headers: headers,
        })
        .then((response) => {
          const result = response.data.map((dict) => dict.typeOfWalkSpeed);
          this.selectWalkSpeed = String(result);
        })
        .catch((error) => {
          console.log("歩行速度のgetでエラーになっちゃった..: ");
          if (
            error.response.status == 401 //this.$store.commit("logout")
          );
        });
    },
    postWalkSpeedData() {
      const headers = { "Authorization": "JWT " + this.$store.getters.getToken };
      const data = { typeOfWalkSpeed: this.selectWalkSpeed };
      this.$axios
        .post("//nakano2021seminar.pythonanywhere.com/accounts/setting/transportation", data, {
          headers: headers,
        })
        .catch((error) => {
          console.log("エラーになっちゃった..@postWalkSpeedData");
          if (
            error.response.status == 401 //this.$store.commit("logout")
          );
        });
    },

    ////////////////以下、到着時間のPOSTとGET/////////////////////
    getTimeData() {
      const headers = { "Authorization": "JWT " + this.$store.getters.getToken };
      this.$axios
        .get("//nakano2021seminar.pythonanywhere.com/accounts/setting/arrivaltime", {
          data: {},
          headers: headers,
        })
        .then((response) => {
          const result = String(response.data.arrivaltimeSetting);
          this.selectTime = result;
        })
        .catch((error) => {
          console.log("エラーになっちゃった..:＠getTimeData ");
          if (
            error.response.status == 401 //this.$store.commit("logout")
          );
        });
    },
    postTimeData() {
      const headers = { "Authorization": "JWT " + this.$store.getters.getToken };
      const postData = Number(this.selectTime);
      const data = { choice: postData };
      this.$axios
        .post("//nakano2021seminar.pythonanywhere.com/accounts/setting/arrivaltime", data, {
          headers: headers,
        })
        .catch((error) => {
          console.log("エラーになっちゃった..:＠postTimeData");
          if (
            error.response.status == 401 //this.$store.commit("logout")
          );
        });
    },

    ////////////////以下、住所のPOSTとGET/////////////////////
    getAddressData() {
      const headers = {
        "Content-Type": "application/json",
        "Authorization": "JWT " + this.$store.getters.getToken,
      };
      this.$axios
        .get("//nakano2021seminar.pythonanywhere.com/accounts/setting/address", {
          data: {},
          headers: headers,
        })
        .then((response) => {
          if (response.data["address"] !== undefined) {
            var result = String(response.data["address"]);
            this.address = result;
          }
        })
        .catch((error) => {
          console.log(error, "エラーになっちゃった..:＠getAddressData");
          if (error.response.status == 401) //this.$store.commit("logout")
          ;
        });
    },
    postAddressData() {
      if (!this.address) return;
      const headers = { "Authorization": "JWT " + this.$store.getters.getToken };
      const data = { address: this.address };
      this.$axios
        .post("//nakano2021seminar.pythonanywhere.com/accounts/setting/address", data, {
          headers: headers,
        })
        .catch((error) => {
          console.log("エラーになっちゃった..@postAddressData");
          if (
            error.response.status == 401 //this.$store.commit("logout")
          );
        });
    },
    toFavoriteSpotPage: function () {
      this.$router.push({ name: "FavoriteSpot" });
    },
    toInitialSettingPage: function () {
      this.$router.push({ name: "InitialSetting" });
    },
    toSettingHomeTime: function () {
      this.$router.push({ name: "SettingHomeTime" });
    },
    postTransportation: function (item) {
      const headers = { "Authorization": "JWT " + this.$store.getters.getToken };
      var data = { [item["name"].toString()]: item["check"] };
      this.$axios
        .post("//nakano2021seminar.pythonanywhere.com/accounts/setting/transportation", data, {
          headers: headers,
        })
        .then((error) => {
          if (error.response.status == 401) this.$store.commit("logout");
        });
    },
  },
};
</script>

<style scoped>
.MyPage {
  font-family: "M PLUS Rounded 1c";
}
</style>