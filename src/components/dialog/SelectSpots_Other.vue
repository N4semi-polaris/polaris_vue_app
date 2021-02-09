
<template>
  <v-dialog v-model="dialog_Other_Open" persistent scrollable width="600px">
    <div class="selectSpots_dialog">
    <v-card>
      <v-card-title>
        <p class="text_center mb-3">7つ選択してください</p>
      </v-card-title>
      <v-card-text>
        <v-chip-group
          v-model="selectSpot_Other.selected"
          :items="items_Spot_Other"
          active-class="primary--text"
          column
          multiple
          max="7"
        >
          <v-chip
            filter
            v-for="tag in items_Spot_Other"
            v-bind:value="tag.value"
            :key="tag.text"
            small
          >
           {{ tag.value }}
          </v-chip>
        </v-chip-group></v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="#0461cd" text @click="dialog_Other_Open = false">
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
    dialog_Other_Open: false,
    selectSpot_Other: { selected: [], name: "typeOfOther" },
    items_Spot_Other: [
      { text: "0", value: "飲食がメインのカフェ・喫茶店" },
      { text: "1", value: "軽食(パンケーキ、個人経営ファストフード等)" },
      { text: "2", value: "その他のカフェ(動物カフェ、コンセプトカフェ等)" },
      { text: "3", value: "ドラッグストア" },
      { text: "4", value: "家電" },
      { text: "5", value: "携帯電話販売店" },
      { text: "6", value: "デパート、百貨店" },
      { text: "7", value: "ショッピングセンター" },
      { text: "8", value: "アウトレットショップ" },
      { text: "9", value: "ホームセンター" },
      { text: "10", value: "商店街" },
      { text: "11", value: "コンビニ、スーパー" },
      { text: "12", value: "リサイクル、ディスカウントショップ" },
      { text: "13", value: "家具屋" },
      { text: "14", value: "日用雑貨、インテリア用品" },
      { text: "15", value: "文房具、事務用品" },
      { text: "16", value: "フラワーショップ" },
      { text: "17", value: "100円ショップ" },
      { text: "18", value: "作業服屋" },
      { text: "19", value: "CD、DVD、ビデオ屋" },
      { text: "20", value: "書店" },
      { text: "21", value: "玩具屋" },
      { text: "22", value: "煙草屋" },
      { text: "23", value: "アパレルショップ、アクセサリーショップ、時計屋" },
      { text: "24", value: "食品専門店" },
      { text: "25", value: "スポーツショップ" },
      { text: "26", value: "スポーツ施設" },
      { text: "27", value: "麻雀" },
      { text: "28", value: "ゲームセンター" },
      { text: "29", value: "パチンコ、パチスロ" },
      { text: "30", value: "ボウリング場" },
      { text: "31", value: "ビリヤード" },
      { text: "32", value: "遊園地、テーマパーク" },
      { text: "33", value: "動物園" },
      { text: "34", value: "水族館" },
      { text: "35", value: "植物園" },
      { text: "36", value: "海水浴場、遊泳場" },
      { text: "37", value: "キャンプ場" },
      { text: "38", value: "アウトドア施設" },
      { text: "39", value: "ボート、ヨット" },
      { text: "40", value: "釣り堀、釣り船" },
      { text: "41", value: "プール" },
      { text: "42", value: "観光農園" },
      { text: "43", value: "映画館" },
      { text: "44", value: "美術館" },
      { text: "45", value: "画廊" },
      { text: "46", value: "博物館、科学館" },
      { text: "47", value: "コンサートホール" },
      { text: "48", value: "ライブハウス" },
      { text: "49", value: "公園" },
      { text: "50", value: "道の駅" },
      { text: "51", value: "パーキングエリア" },
      { text: "52", value: "ドライブイン" },
      { text: "53", value: "マッサージ、整体、治療院" },
      { text: "54", value: "ベビー用品、子供服" },
      { text: "55", value: "郵便、郵便局" },
      { text: "56", value: "宅配便" },
      { text: "57", value: "コインランドリー" },
      { text: "58", value: "レンタルCD、DVD、ビデオ" },
      { text: "59", value: "レンタルサイクル" },
      { text: "60", value: "ガソリンスタンド" },
      { text: "61", value: "靴修理" },
      { text: "62", value: "クリーニング" },
      { text: "63", value: "質屋" },
      { text: "64", value: "洗車場" },
      { text: "65", value: "銀行" },
      { text: "66", value: "ペットショップ、動物病院" },
      { text: "67", value: "銭湯" },
      { text: "68", value: "スーパー銭湯" },
      { text: "69", value: "健康ランド" },
      { text: "70", value: "温泉浴場" },
      { text: "71", value: "岩盤浴" },
      { text: "72", value: "サウナ" },
      { text: "73", value: "官公庁" },
      { text: "74", value: "美容院、サロン" },
      { text: "75", value: "寺院、神社、教会" },
    ],
  }),
  mounted() {
   this.getData();
  },
  methods: {
    OdialogOpen() {
      this.dialog_Other_Open = true;
    },
    postData() {
      const headers = { "Authorization": "JWT " + this.$store.getters.getToken };
      const data = { "genres" : this.selectSpot_Other.selected};
      console.log("postData内のthis.selectSpot_Other.selectedの中身: " + this.selectSpot_Other.selected);
      this.$axios
        .post("/accounts/setting/genre/create_fromlist", data, {
          headers: headers,
        })
        .then(() => {
          this.dialog_Other_Open = false;
        })
        .catch((error) => {
          console.log("エラーになっちゃった..: ");
          if (error.response.status == 401) this.$store.commit("logout");
        });
    },
     getData() {
      const headers = { "Authorization": "JWT " + this.$store.getters.getToken };
      this.$axios
        .get("/accounts/setting/genre", {
          data: {},
          headers: headers,
        })
        .then((response) => {
          const result = response.data.map(dict => dict.genre);
          this.selectSpot_Other.selected =result;
        })
        .catch((error) => {
          if (error.response.status == 401) this.$store.commit("logout");
        });
    },
  },
};
</script>

<style>
.selectSpots_dialog {
  font-family: "M PLUS Rounded 1c";
}
</style>