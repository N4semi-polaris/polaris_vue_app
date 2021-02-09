
<template>
  <v-dialog v-model="dialog_Gourmet_Open" persistent scrollable width="600px">
    <div class="selectGoutmet_dialog">
    <v-card>
      <v-card-title>
        <p class="text-center mb-3">5つ選択してください</p>
      </v-card-title>
      <v-card-text>
        <v-chip-group
          v-model="selectSpot_Gourmet.selected"
          :items="items_Spot_Gourmet"
          active-class="primary--text"
          column
          multiple
          max="5"
        >
          <v-chip
            filter
            v-for="tag in items_Spot_Gourmet"
            v-bind:value="tag.value"
            :key="tag.text"
            small
          >
            {{ tag.value }}
          </v-chip>
        </v-chip-group>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="#0461cd" text @click="dialog_Gourmet_Open = false">
          閉じる
        </v-btn>
        <v-btn color="#0461cd" text @click="postData"> 保存 </v-btn>
      </v-card-actions>
    </v-card>
    </div>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog_Gourmet_Open: false,
    selectSpot_Gourmet: { selected: [], name: "typeOfGourmet" },
    items_Spot_Gourmet: [
      { text: "0", value: "居酒屋" },
      { text: "1", value: "ラーメン屋" },
      { text: "2", value: "蕎麦屋" },
      { text: "3", value: "サンドイッチ、パン屋" },
      { text: "4", value: "中華料理屋" },
      { text: "5", value: "スイーツ" },
      { text: "6", value: "寿司屋" },
      { text: "7", value: "回転寿司" },
      { text: "8", value: "とんかつ屋" },
      { text: "9", value: "洋食屋" },
      { text: "10", value: "タイ料理" },
      { text: "11", value: "焼肉" },
      { text: "12", value: "焼き鳥" },
      { text: "13", value: "イタリアン" },
      { text: "14", value: "ハンバーガーショップ" },
      { text: "15", value: "パスタ" },
      { text: "16", value: "天ぷら" },
      { text: "17", value: "カレーライス" },
      { text: "18", value: "定食屋" },
      { text: "19", value: "韓国料理屋" },
      { text: "20", value: "うどん" },
      { text: "21", value: "鉄板焼き" },
      { text: "22", value: "オムライス" },
      { text: "23", value: "おにぎり" },
      { text: "24", value: "うなぎ" },
      { text: "25", value: "しゃぶしゃぶ" },
      { text: "26", value: "お茶漬け" },
      { text: "27", value: "スープ専門店" },
      { text: "28", value: "スペイン料理" },
      { text: "29", value: "お好み焼き" },
      { text: "30", value: "もんじゃ焼き" },
      { text: "31", value: "ステーキ" },
      { text: "32", value: "串カツ、串揚げ" },
      { text: "33", value: "もつ焼き" },
      { text: "34", value: "和菓子" },
    ],
  }),
  mounted() {
   this.getData();
  },
  methods: {
    GdialogOpen() {
      this.dialog_Gourmet_Open = true;
    },
    postData() {
      const headers = { "Authorization": "JWT " + this.$store.getters.getToken };
      const data = { "genres" : this.selectSpot_Gourmet.selected};
      console.log("postDataしたthis.selectSpot_Gourmet.selectedの中身: " + this.selectSpot_Gourmet.selected);
      this.$axios
        .post("/accounts/setting/gourmetgenre/create_fromlist", data, {
          headers: headers,
        })
        .then(() => {
          this.dialog_Gourmet_Open = false;
        })
        .catch((error) => {
          console.log("エラーになっちゃった..: ");
          if (error.response.status == 401) this.$store.commit("logout");
        });
    },

    getData() {
      const headers = { "Authorization": "JWT " + this.$store.getters.getToken };
      this.$axios
        .get("/accounts/setting/gourmetgenre", {
          data: {},
          headers: headers,
        })
        .then((response) => {
          const result = response.data.map(dict => dict.genre);
          this.selectSpot_Gourmet.selected =result;
        })
        .catch((error) => {
          if (error.response.status == 401) this.$store.commit("logout");
        });
    },
  },
};
</script>

<style>
.selectGoutmet_dialog {
  font-family: "M PLUS Rounded 1c";
}
</style>