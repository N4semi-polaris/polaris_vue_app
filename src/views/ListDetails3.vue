<template>
  <div class="ListDetails3">
    <!--飲食店推薦-->
    <App_bar />

    <div class="detail_card">
      <v-container>
        <v-btn
          rounded
          class="text-center"
          color="#0461cd"
          dark
          @click="$router.go(-1)"
          ><v-icon left size="30">mdi-keyboard-return</v-icon>戻る</v-btn
        >
      </v-container>
      <v-card class="mx-2 mt-2" color="#ffffff">
        <v-card-title>
          <v-icon left large color="#033ba0">mdi-map-marker</v-icon>
          <span class="placeName">{{ selectedResult.name }}</span>
          <v-card-subtitle class="ml-7">{{
            selectedResult.genre
          }}</v-card-subtitle>
          <v-card-subtitle class="ml-7"
            >最寄駅：{{ selectedResult.station }}</v-card-subtitle
          >
          <!--<div v-show="useBus == true">
            <v-icon color="#033ba0" dense class="ml-1">mdi-bus</v-icon>
          </div>
          <div v-show="useTrain == true">
            <v-icon color="#033ba0" dense class="ml-1">mdi-train</v-icon>
          </div>
          <div v-show="useFoot == true">
            <v-icon color="#033ba0" dense class="ml-1">mdi-walk</v-icon>
          </div>-->

          <v-spacer></v-spacer>
          <!--
          <v-btn
            v-if="rainAvoid == false"
            color="#ffffff"
            fab
            v-on:click="displayRainAvoid()"
            ><v-icon large color="#0461cd">mdi-umbrella-outline</v-icon></v-btn
          >
          <v-btn v-else dark fab color="#0461cd" v-on:click="displayRainAvoid()"
            ><v-icon large>mdi-umbrella</v-icon></v-btn
          >-->
        </v-card-title>
        <v-col align="center">
          <v-text-field
            v-model="eatTime"
            suffix="分"
            hint="60分以下で入力してください。"
            :rules="[rules.required,rules.limit_time]"
            outlined
          ></v-text-field>
        </v-col>
        <v-card-actions>
                <v-btn
                  class="mb-3"
                  rounded
                  color="#0575e6"
                  dark
                  block
                  @click="postSelectedSpot"
                  >ココにする
                  <v-icon right size="30">mdi-gesture-tap</v-icon>
                </v-btn>
            <!-- <v-row>
              <v-col cols="6">
                <v-btn
                  rounded
                  color="#210e67"
                  outlined
                  small
                  absolute
                  bottom
                  left
                  >1つ遅らせる</v-btn
                >
              </v-col>
              <v-col cols="6">
                <v-btn
                  rounded
                  color="#033ba0"
                  outlined
                  small
                  absolute
                  bottom
                  right
                  >1つ早める</v-btn
                >
              </v-col>
            </v-row>-->

        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import App_bar from "../components/App_bar";

export default {
  name: "ListDetails3",
  components: {
    App_bar,
  },
  data: () => ({
     /*
    useFoot: true,
    useBus: false,
    useTrain: true, 
    isRainy: true,
    rainAvoid: true,
    */
    selectedResult: [],
    type: 0,
    startTime: "",
    eatTime: "",
    rules: {},
  }),
  mounted() {
    /*
    this.rainAvoid = false;
    */
    this.selectedResult = this.$store.getters.getSelectedResult;
    console.log(" 選択されたスポット(selectedResult): ");
    console.dir(this.selectedResult);
    console.log(" selectedResult.route[0]: ");
    console.dir(this.selectedResult.route[0]);
    console.log(" selectedResult.route[0]['1']: ");
    console.dir(this.selectedResult.route[0]["1"]);
    this.calcEatTime();
    this.rules= {
      required: value => !!value || "必ず入力してください",
      limit_time: value => value <=  this.selectedResult.eat_time || this.selectedResult.eat_time + "分以内にしてください",
      }
  },
  methods: {
    /* 
    displayRainAvoid() {
      this.rainAvoid = !this.rainAvoid;
    },*/
    calcEatTime() {
      this.eatTime = this.selectedResult.eat_time;
    },
    calcPostTime() {
      if (this.selectedResult.side == "now") {
        this.startTime = this.selectedResult.route[0]["1"].clock;
      } else {
        this.startTime = this.selectedResult.route[0]["3"].clock;
      }
    },

    postSelectedSpot() {
      const headers = { Authorization: "JWT " + this.$store.getters.getToken };
      this.calcPostTime();
      const data = {
        start: this.startTime,
        mins: this.eatTime,
        location: this.selectedResult.name,
        lat: this.selectedResult.lat,
        lon: this.selectedResult.lon,
        genre: this.selectedResult.genre,
      };
      this.$axios
        .post("/calendar/blocks/yorimichi", data, {
          headers: headers,
        })
        .then(() => {
          this.$store.commit("setListResult", []);
          this.$store.commit("setSelectedResult", [], 0);
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          console.log("エラーになっちゃった..@ListDetails3_PostSelectedSpot");
          if (
            error.response.status == 401 //this.$store.commit("logout")
          );
        });
    },
  },
};
</script>

<style scoped>
.placeName {
  font-weight: bold;
}
.ListDetails {
  font-family: "M PLUS Rounded 1c";
}
</style>