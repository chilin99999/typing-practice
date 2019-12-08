<template>
  <div class="setting">
    <div class="section-title">
      <h1>打字練習</h1>
    </div>
    <div class="section-main">
      <div class="section-left">
        <div class="wrapper">
          章節：
          <Select v-model="selectedTopicTitle" placeholder="請選擇作答題目" class="margin-y-8">
            <Option v-for="(item, index) in topics" :value="item.title" :key="index">{{ item.title }}</Option>
          </Select>
          測驗時間：(分)<InputNumber v-model="settingTime" prefix="md-alarm" :min="1" :step="1" placeholder="請輸入測驗時間(分)" class="margin-y-8 full-width align-center" />
          講話速度：<InputNumber :max="3" :min="0.2" :step="0.2" v-model="speekSpeedRate" class="margin-y-8 full-width align-center"></InputNumber>
          <Button type="primary" class="margin-y-24" @click="set">確定</Button>
        </div>
      </div>
      <div class="section-right">
        <Tabs value="name1">
          <TabPane label="最近10筆紀錄" name="name1">
            <Table :columns="last10recordsColumns" :data="last10records"></Table>
          </TabPane>
          <TabPane label="最快10筆紀錄" name="name2">
            <Table :columns="top10recordsColumns" :data="top10records"></Table>
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { Button, Select, Option, InputNumber, Tabs, TabPane, Table } from 'view-design';
import topics from '../data/topics';

export default {
  name: 'home',
  components: {
    Button,
    Select,
    Option,
    InputNumber,
    Tabs,
    TabPane,
    Table,
  },
  data() {
    return {
      topics,
      selectedTopicTitle: topics[0].title,
      settingTime: 3,
      speekSpeedRate: 1,
      last10recordsColumns: [
        { title: '日期', key: 'timeText' },
        { title: '打字速度(字/分)', key: 'typeSpeed' },
        { title: '正確字數', key: 'correctTextCount' },
      ],
      last10records: [],
      top10recordsColumns: [
        { title: '名次', key: 'rank' },
        { title: '日期', key: 'timeText' },
        { title: '打字速度(字/分)', key: 'typeSpeed' },
        { title: '正確字數', key: 'correctTextCount' },
      ],
      top10records: [],
    };
  },
  methods: {
    set() {
      const topic = this.topics.find(d => d.title == this.selectedTopicTitle);
      this.$store.commit('set', {
        topic,
        time: this.settingTime,
        speekSpeedRate: this.speekSpeedRate,
      });
      this.$router.push('/game');
    },
  },
  created() {
    this.last10records = JSON.parse(localStorage.getItem('last10records')) || [];
    this.last10records.forEach(record => {
      record.timeText = moment(record.timestamp).format('YYYY/MM/DD hh:mm');
    });
    this.top10records = JSON.parse(localStorage.getItem('top10records')) || [];
    this.top10records.forEach((record, index) => {
      record.timeText = moment(record.timestamp).format('YYYY/MM/DD hh:mm');
      record.rank = index + 1;
    });
  },
};
</script>

<style lang="scss" scoped>
.section-title {
  height: 60px;
  border-bottom: 1px solid #AAA;
}
.section-main {
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  flex-wrap: nowrap;

  .section-left {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #AAA;
    .wrapper {
      width: 300px;
    }
  }
  .section-right {
    width: 50%;
    height: 100%;
  }
}
.margin-y-8 {
  margin: 8px 0;
}
.margin-y-24 {
  margin: 24px 0;
}
.full-width {
  width: 100%;
}
</style>

<style lang="scss">
.align-center input {
  text-align: center;
}
</style>