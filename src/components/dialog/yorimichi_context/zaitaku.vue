<template>
<div class="zaitaku_dialog">
    <v-container>
        <div v-show="dialogP>=0">
            <v-card-title>
                <v-row justify="space-between" no-gutters>
                    <v-col cols="7" align="left">
                        <h4><v-icon size="33px" left color="#cccccc">mdi-door-closed</v-icon>在宅</h4>
                    </v-col>
                    <v-col cols="5" align="right">
                        <v-btn color="#0461cd" icon @click="change_ScheduleDialog(1)">
                            <v-icon medium>mdi-swap-horizontal</v-icon>
                        </v-btn>
                        <v-btn color="#0461cd" icon @click="change_ScheduleDialog(2)">
                            <v-icon medium>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn color="#0461cd" icon @click="change_ScheduleDialog(3)">
                            <v-icon medium>mdi-delete</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text>
                <div>
                    <p>開始時刻：  {{ selectedEvent.start|processDatetime }}</p>
                    <p>終了時刻：  {{ selectedEvent.end|processDatetime }}</p>
                </div>
            </v-card-text>


                <!-- 外出中に変更 -->
                <div v-show="dialogP==1">
                    <v-divider class="ma-3"/>
                    <v-container class="pa-1">
                        <p class="text-center mb-3">外出中に変更しますか？</p>
                        <v-row justify="space-around">
                            <v-btn dark color="#032b8d" @click="submit_switch">はい</v-btn>
                            <v-btn dark color="#0575e6" @click="change_ScheduleDialog(0)">いいえ</v-btn>
                        </v-row>
                    </v-container>
                </div>
                <!-- 外出中に変更終わり -->

                <!-- 編集 -->
                <div v-show="dialogP==2">
                    <v-form ref="zaitakubk_edit_form">
                        <v-divider class="ma-3"/>
                        <v-container>
                            <v-radio-group v-model="radioGroup_selected">
                                <v-radio
                                    v-for="i in radioGroup"
                                    :key="`zitaku-radio-${i.id}`"
                                    :label="i.label"
                                    :value="i.id"/>
                            </v-radio-group>
                            <div>
                                <v-dialog
                                    ref="timemodal_dialog"
                                    v-model="timemodal"
                                    :return-value.sync="time"
                                    persistent
                                    width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="time"
                                        label="時刻を入力"
                                        readonly
                                        v-bind="attrs"
                                        :disabled="(radioGroup_selected===1)"
                                        :rules="radioGroup_selected===1? []:timeedit_rules"
                                        v-on="on"/>
                                    </template>
                                    <v-time-picker
                                        v-if="timemodal"
                                        v-model="time"
                                        full-width>
                                        <v-spacer/>
                                        <v-btn text color="primary" @click="timemodal = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.timemodal_dialog.save(time)">OK</v-btn>
                                    </v-time-picker>
                                </v-dialog>
                            </div>

                        </v-container>
                        <!-- 送信ボタン -->
                        <v-row justify="space-around">
                            <v-btn
                                dark
                                color="#032b8d"
                                v-on:click="submit_edit"
                            >変更</v-btn>
                            <v-btn
                                dark
                                color="#0575e6"
                                v-on:click="change_ScheduleDialog(0)"
                            >戻る</v-btn>
                        </v-row>
                        <!-- 送信ボタン終わり -->
                    </v-form>
                </div>
                <!-- 編集終わり -->

                <!-- 削除 -->
                <div v-show="dialogP==3">
                    <v-divider/>
                    <v-container>
                        <p class="text-center mb-3">削除しますか？</p>
                        <v-row justify="space-around">
                            <v-btn dark color="#032b8d" @click="submit_delete">はい</v-btn>
                            <v-btn dark color="#0575e6" @click="change_ScheduleDialog(0)">いいえ</v-btn>
                        </v-row>
                    </v-container>
                </div>
                <!-- 削除終わり -->

        </div>
    </v-container>
</div>
</template>

<script>
import moment from "moment";
export default {
    props: ['selectedEvent', 'dialogP'],
    filters: {
        processDatetime: function(datetime){
            if(!datetime)return ""
            return moment(datetime).format("YYYY年MM月DD日 HH:mm")
        }
    },
    data:() => ({
        radioGroup_selected: 1,
        radioGroup: [
            {id:1, label:"前後の予定まで広げる"},
            {id:2, label:"分割する"},
            {id:3, label:"開始時刻を変更する"},
            {id:4, label:"終了時刻を変更する"}
        ],
        time: null,
        timemodal:false,
        timeedit_rules: [
                v => !!v || '必ず入力してください！',
            ],
    }),
    methods: {
        toOutputList: function () {
            this.$router.push({ name: "OutputList" });
        },
        turnTo_nextScheduleDialog() {
            this.$emit('changeP', this.dialogP+1)
        },
        backTo_nextScheduleDialog() {
            if (this.dialogP > 0) this.$emit('changeP', this.dialogP-1);
        },
        change_ScheduleDialog(i){
            this.$emit('changeP',i)
        },
        submit_switch(){
            this.$axios.get('/calendar/blocks/private/'+this.selectedEvent.bk_id+'/toAki',{
                data:{},
                headers:{"Authorization": "JWT " + this.$store.getters.getToken}
            }).then(()=>{
                this.change_ScheduleDialog(0)
                this.$emit('setEvent',{"bk_type":1, "color":"#fef4ce"})
            }).catch((error)=>{
                console.log(error)
            })
        },
        submit_delete(){
            this.$axios.delete('/calendar/blocks/private/'+this.selectedEvent.bk_id,{
                data:{},
                headers:{"Authorization": "JWT " + this.$store.getters.getToken}
            }).then(()=>{
                this.$emit("delEvent")
                this.$emit("closeDialog")
            }).catch((error)=>{
                console.log(error)
            })
        },
        submit_edit(){
            if (!this.$refs.zaitakubk_edit_form.validate()) {
                return;
            }
            const headers = {"Authorization": "JWT " + this.$store.getters.getToken}
            var url="/calendar/blocks/private/"+this.selectedEvent.bk_id
            var start_date = moment(this.selectedEvent.start).format("yyyy-MM-DD")
            var formattedtime = moment(start_date+" "+this.time, "yyyy-MM-DD HH:mm").toISOString()
            var data = {}
            if(this.radioGroup_selected===2){
                url+="/cutup"
                data={"border":formattedtime}
                this.$axios.post(
                    url, data, {headers:headers}).then((response)=>{
                        this.change_ScheduleDialog(0)
                        this.$emit('delEvent')
                        for(var d of response.data){
                            this.$emit('pushEvent',{
                            "start": moment(d.start).toDate(),
                            "end": moment(d.end).toDate(),
                            "color": (d.blockType===1)? "#fef4ce":"#cccccc",
                            "bk_type": d.blockType,
                            "bk_id": d.uuid,
                            "timed":true,
                            "id":"",
                            "name":"",
                            "description":"",
                            "location":"",
                            })
                        }
                    }).catch((error)=>{
                        console.log(error)
                    })
            }else{
                if(this.radioGroup_selected===1){
                    url+="/stretch"
                }else if(this.radioGroup_selected===3){
                    url+="/stagger_starttime"
                    data={"start":formattedtime}
                }
                else if(this.radioGroup_selected===4){
                    url+="/stagger_endtime"
                    data={"end":formattedtime}
                }
                else return
                this.$axios.post(
                    url, data, {headers:headers}).then((response)=>{
                        this.change_ScheduleDialog(0)
                        this.$emit('setEvent',{
                            "start":moment(response.data.start).toDate(),
                            "end":moment(response.data.end).toDate()})
                    })
            }
        },
    },
}
</script>

<style>
.zaitaku_dialog {
    font-family: 'M PLUS Rounded 1c';
}
</style>