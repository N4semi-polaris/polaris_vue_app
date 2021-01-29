<template>
  <div id="calendar">
    <v-sheet tile height="50" color="#ffffff" align-center id="areaOfYM">
        <v-toolbar flat dense>
        <v-toolbar-title
          ><span style="color: #210e67">{{ title }}</span></v-toolbar-title
        ></v-toolbar>
    </v-sheet>
    
    <v-row no-gutters>
      <v-col>
        <v-sheet v-bind:height="calendar_height">
          <v-calendar
            ref="calendar"
            :now="value"
            :weekdays="weekdays"
            :value="value"
            :events="events"
            event-overlap-mode="column"
            :event-color="getEventColor"
            color="primary"
            type="week"
            v-on:click:event="show_yorimitiDialog"
          >
            <template #day-body="{ date, week }">
              <div
                class="v-current-time"
                :class="{ first: date === week[0].date }"
                :style="{ top: nowY }"
              ></div>
            </template>
          </v-calendar>
          <!-- 寄り道提案ポップアップ -->
          <yorimichi 
            ref="yorimichiDialog" 
            @setEvent="setSelectedEvent" @delEvent="delSelectedEvent" @pushEvent="pushSelectedEvent"/>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>


<script>
import moment from "moment";
import yorimichi from "@/components/dialog/yorimichi";

export default {
  components: {
    yorimichi,
  },
  data: () => ({
    value: moment().format("yyyy-MM-DD"),
    weekdays: [0, 1, 2, 3, 4, 5, 6],
    ready: false,
    events: [],

  }),
  mounted() {
    //this.$refs.calendar.scrollToTime('18:00');
    this.ready = true;
    this.scrollToTime();
    this.updateTime();
    this.setWeekdays();
    const headers = {
      "Content-Type": "application/json",
      Authorization: "JWT " + this.$store.getters.getToken,
    };
    this.$axios
      .post("//nakano2021seminar.pythonanywhere.com/calendar/", new URLSearchParams(), {
        headers: headers,
      })
      .then(() => {
        this.setEvents();
      });
  },
  computed: {
    title() {
      return moment().format("yyyy年 M月");
    },
    cal() {
      return this.ready ? this.$refs.calendar : null;
    },
    nowY() {
      /*
      0時0分=0px
      hour時minute分 = hour*48px+minute*0.8px
      h->12時間表記 H->24時間表記 以下例
      AM8時...H->8 HH->08
      PM8時...h->8 hh->08 H,HH->20
      */
      var now = moment();
      var answer = 48 * now.hour() + 0.8 * now.minute(); //どちらもNumber型
      return this.cal ? answer + 'px' : '-10px';
    },
  },
  methods: {
    getEventColor(event) {
      return event.color;
    },
    getCurrentTime() {
      return this.cal
        ? this.cal.times.now.hour * 60 + this.cal.times.now.minute
        : 0;
    },
    setEvents() {
      //drfにアクセスして、カレンダーデータを取得する(更新はしない取得だけ)
      const headers = {
        "Content-Type": "application/json",
        Authorization: "JWT " + this.$store.getters.getToken,
      };
      this.$axios
        .get("//nakano2021seminar.pythonanywhere.com/calendar/", {
          headers: headers,
          data: {},
        })
        .then(
          (response) => {
            for (var d of response.data) {
              var colorAllocater = function (type) {
                if (type == 4) return "#778899";
                else if (type == 1) return "#fef4ce";//空きブロック
                else if (type == 2) return "#cccccc";//在宅ブロック
                else if (type == 3 || type == 5) return "#ffc900";
              };
              this.events.push({
                //idとdiscriptionとlocationは使われていない
                id: d.google_id ?? "", //左辺がnullなら右辺を返す
                name: d.summary ?? d.name ?? d.location ?? "",
                description: d.description ?? "",
                location: d.location ?? "",
                address: d.address ?? "",
                bk_type: d.bk.blockType,
                bk_id: d.bk.uuid,
                start: moment(d.bk.start, "YYYY-MM-DDTHH:mm:ssZ").toDate(),
                end: moment(d.bk.end, "YYYY-MM-DDTHH:mm:ssZ").toDate(),
                color: colorAllocater(d.bk.blockType),
                timed: true,
              });
            }
          },
          (error) => {
            if (error.response.status == 401) this.$store.commit("logout");
          }
        );
    },
    scrollToTime() {
      const time = this.getCurrentTime();
      const first = Math.max(0, time - (time % 30) - 30);

      this.cal.scrollToTime(first);
    },
    updateTime() {
      setInterval(() => this.cal.updateTimes(), 60 * 1000);
    },
    setWeekdays() {
      var dateNum = moment().format("d");
      var week = [0, 1, 2, 3, 4, 5, 6];
      this.weekdays = week.slice(dateNum).concat(week.slice(0, dateNum));
    },
    show_yorimitiDialog({ nativeEvent, event }) {
      this.$refs.yorimichiDialog.showWindow({ nativeEvent, event });
    },
    setSelectedEvent(data){
      var index = this.events.findIndex(({bk_id}) => bk_id === data.bk_id);
      this.events.splice(index,1,data)
    },
    delSelectedEvent(data){
      var index = this.events.findIndex(({bk_id}) => bk_id === data.bk_id);
      this.events.splice(index,1)
    },
    pushSelectedEvent(event){
      this.events.push(event)
    }
  },
  props: ["calendar_height"],
};
</script>


<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}
.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>
<style lang="scss">
.v-current-time {
  height: 1px;
  width: 200px;
  background-color: #000000;
  position: absolute;
  left: 0px;
  right: 0;
  pointer-events: none;

  &.first::before {
    content: "";
    position: absolute;
    background-color: #000000;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-top: -4px;
    margin-left: -6.5px;
  }
}
</style>