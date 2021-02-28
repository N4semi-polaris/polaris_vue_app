<template>
  <div class="CheckFavSpot">
    <App_bar />
    <template>
      <v-container class="">
        <v-row align="center">
          <v-col align="center">
            <v-card>
                <v-container class="pa-2">
                  <v-toolbar dark dense flat color="#778899">
                  <v-row justify="center">
                      <v-card-title> 選択された候補 </v-card-title>
                  </v-row>
                  </v-toolbar>
                <v-card-text>
                  <v-row align="center">
                    <v-col cols="12">
                      {{ selectedFavSpot.name }}
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row align="center">
                    <v-col cols="12">
                      {{ selectedFavSpot.address }}
                    </v-col>
                  </v-row>
                  </v-card-text>
                </v-container>
            </v-card>

            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-row align="center">
              <v-col cols="6">
                <v-btn
                  rounded
                  class="text-center"
                  color="#0461cd"
                  dark
                  @click="$router.go(-1)"
                  >戻る</v-btn
                >
              </v-col>
              <v-col cols="6">
                <v-btn
                  rounded
                  class="text-center"
                  color="#0461cd"
                  dark
                  @click="postSelectedSpot"
                  >登録する</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
      </v-container>
    </template>
  </div>
</template>

<script>
import App_bar from "../components/App_bar";

export default {
  name: "CheckFavSpot",
  components: {
    App_bar,
  },
  props: {
    selectedFavSpot: {},
  },
  mounted() {
    console.dir(this.selectedFavSpot);
  },
  data: () => ({}),
  methods: {
    postSelectedSpot() {
      const headers = { Authorization: "JWT " + this.$store.getters.getToken };
      const data = {
        name: this.selectedFavSpot.name,
        address: this.selectedFavSpot.address,
        lat: parseFloat(this.selectedFavSpot.lat),
        lon: parseFloat(this.selectedFavSpot.lon),
        code: this.selectedFavSpot.code,
      };
      this.$axios
        .post("//nakano2021seminar.pythonanywhere.com/accounts/setting/favspot", data, {
          headers: headers,
        })
        .then(() => {
          this.$router.push({ name: "FavoriteSpot" });
        })
        .catch((error) => {
          console.log("エラーになっちゃった..@postSelectedSpot");
          if (
            error.response.status == 401 //this.$store.commit("logout")
          );
        });
    },
  },
};
</script>

<style scoped>
#spotlist {
  padding: 10px;
}
.CheckFavSpot {
  font-family: "M PLUS Rounded 1c";
}
</style>