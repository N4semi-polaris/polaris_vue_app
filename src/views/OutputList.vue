<template>
  <div class="OutputList">
    <App_bar />

    <v-toolbar flat>
      <v-toolbar-title class="marginBarLR">
        検索結果<span class="ml-3">全{{ results.length }}件</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-sheet color="#f5f5f5" height="15px"></v-sheet>
    <Loading v-if="isShow"></Loading>
    <template v-if="noResults"><v-col align="center">該当なし</v-col></template>
    <template v-if="!isShow">
      <v-list shaped>
        <template v-for="(result, index) in results">
          <v-list-item :key="result.index" @click="toListDetails(result)">
            <v-list-item-content>
              <v-row no-gutters align="center">
                <v-col cols="1">
                  <span class="marginIdLR">
                    <!-- リスト番号 -->
                    <v-list-item-title>{{ index + 1 }}</v-list-item-title>
                  </span>
                </v-col>
                <v-col cols="8" class="ml-4">
                  <v-list-item-title v-text="result.name"></v-list-item-title>
                   <v-list-item-title v-text="result.taskname"></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="result.genre"
                  ></v-list-item-subtitle>
                  <v-list-item-subtitle
                    v-text="result.station"
                  ></v-list-item-subtitle>

                  <!--  <v-list-item-subtitle class="text--primary"
                  >{{ makeStartTime(result.start_time) }}
                  <v-icon color="#0575e6" dense>mdi-arrow-right-bold</v-icon>
                  {{ makeEndTime(result.end_time) }}
                  <span class="ml-1">{{
                    getTransTime(result.start_time, result.end_time)
                  }}</span>
                </v-list-item-subtitle>          
                -->
                </v-col>
                <!--<v-col class="ml-2">
                <div v-show="taskOption(result.task_option)">
                  <v-icon color="#ffc900" dense>mdi-tag</v-icon>
                </div>
              </v-col>-->
              </v-row>
            </v-list-item-content>
          </v-list-item>
          <!--
            <v-divider
                v-if="index < results.length"
                :key="index"
            ></v-divider>
        <v-sheet
          v-if="index < results.length"
          :key="index"
          color="#f5f5f5"
          height="10px"
        ></v-sheet>-->
        </template>
      </v-list>
    </template>
  </div>
</template>

<script>
import App_bar from "../components/App_bar";
import Loading from "../components/Loading.vue";

export default {
  name: "OutputList",
  components: {
    App_bar,
    Loading,
  },
  data: () => ({
    hit_num: 0,
    results: [],
    model: -1,
    isShow: true,
    noResults: false,
    URL: "/recommend/",
  }),
  mounted() {
    console.log(
      "this.$store.getters.getlistResult: " + this.$store.getters.getlistResult
    );
    console.dir(this.$store.getters.getIsResult);
    console.log(
      "this.$store.getters.getlistResult.length: " +
        this.$store.getters.getlistResult.length
    );
    if (this.$store.getters.getlistResult.length == 0 ) {
      if (this.$route.query.type == 1) {
        this.URL = this.URL + "tasks/" + this.$route.query.bk;
      } else if (this.$route.query.type == 2) {
        this.URL = this.URL + "spots/" + this.$route.query.bk;
      } else if (this.$route.query.type == 3) {
        this.URL = this.URL + "restaurants/" + this.$route.query.bk;
      }
      console.log("this.URL: " + this.URL);
      this.getData(this.URL);
    } else if(this.$store.getters.getlistResult.status=="該当なし"){
      this.noResults = true;
    }else{
      this.results = this.$store.getters.getlistResult;
      console.log("this.results: ");
      console.dir(this.results);
      for (let i in this.results) {
        console.dir(this.results[i]);
        console.log("this.results" + i + ".sections: ");
        console.dir(this.results[i].sections);
      }
      this.isShow = false;
    }
  },
  /*computed: {
    getListLength: function () {
      var count = 0;
      var list = this.results;
      for (var i = 0; i < list.length; i++) {
        count++;
      }
      return count;
    },
  },*/
  methods: {
    /*
    taskOption: function (option) {
      //タスクラベルをつけるかどうか
      return option ? true : false;
    },
    */
    /////////////////////////以下メソッド平山記述////////////////
    getData(url) {
      const headers = { Authorization: "JWT " + this.$store.getters.getToken };
      console.log(
        "this.$route.query.bkの型@GET: " + typeof this.$route.query.bk
      );
      console.log("URL: " + url);
      console.log("URLの型: " + typeof url);
      console.log("headers:" + headers);
      this.$axios
        .get(url, {
          data: {},
          headers: headers,
        })
        .then((response) => {
          this.$store.commit("setListResult", response.data);
          for (let i in response.data) {
            this.results[i] = response.data[i];
            console.dir(this.results[i]);
          }
          if (response.data.length == 0 ||response.data.status=="該当なし") {
            this.noResults = true;
          }
            this.isShow = false; 
        })
        .catch((error) => {
          console.log("エラーになっちゃった..:＠getData");
          if (
            error.response.status == 401 //this.$store.commit("logout")
          );
        });
    },
    toListDetails: function (result) {
      this.$store.commit("setSelectedResult", result, this.$route.query.type);
      if (this.$route.query.type == 1) {
        this.$router.push({ name: "ListDetails1" });
      } else if (this.$route.query.type == 2) {
        this.$router.push({ name: "ListDetails2" });
      } else if (this.$route.query.type == 3) {
        this.$router.push({ name: "ListDetails3" });
      }
    },
  },
};
</script>

<style scoped>
.marginBarLR {
  text-align: center;
}
.marginIdLR {
  text-align: center;
  font-weight: bold;
}
.OutputList {
  font-family: "M PLUS Rounded 1c";
}
</style>