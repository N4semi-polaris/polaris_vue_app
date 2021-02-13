<template>
  <div id="Loading" class="fullview d-flex">
    <v-container class="align-self-center" no-gutters>
      <!--<v-row class="justify-center" no-gutters>
        <v-col class="flex-grow-0">
          <v-img :src="PolarisLogo" width="250px" />
        </v-col>
      </v-row>-->
      <v-row class="pa-3"><v-col /></v-row>
      <v-row class="justify-center" no-gutters>
        <v-col class="flex-grow-0">
          <v-progress-circular
            v-if="isLoading"
            indeterminate
            color="grey"
            :size="50"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PolarisLogo from "@/assets/Polaris.png";
export default {
  name: "loading",
  components: {},
  data: () => ({
    PolarisLogo: PolarisLogo,
    isLoading: true,
  }),
  mounted: function () {
    //email等のユーザデータがあるかどうか確認してなければLogin.vueへ飛ばす
    //tokenが生きているかどうか試して、ダメならrefreshする
  },
  methods: {
  },
};
</script>

<style>
.fullview {
  width: 100vw;
  height: 100vh;
  background: #fefefe;
  position: fixed;
  top: 0;
  left: 0;
}
</style>