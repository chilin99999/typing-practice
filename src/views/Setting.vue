<template>
  <div class="setting">
    <div class="wrapper">
      <h1>打字練習</h1>
      <div class="main">
        章節：
        <Select v-model="selectedTopicTitle" placeholder="請選擇作答題目" class="margin-y-8">
          <Option v-for="(item, index) in topics" :value="item.title" :key="index">{{ item.title }}</Option>
        </Select>
        測驗時間：(分)<InputNumber v-model="settingTime" prefix="md-alarm" :min="1" :step="1" placeholder="請輸入測驗時間(分)" class="margin-y-8 full-width align-center" />
        講話速度：<InputNumber :max="3" :min="0.2" :step="0.2" v-model="speekSpeedRate" class="margin-y-8 full-width align-center"></InputNumber>
        <Button type="primary" class="margin-y-24" @click="set">確定</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Select, Option, InputNumber } from 'view-design';
import topics from '../data/topics';

export default {
  name: 'home',
  components: {
    Button,
    Select,
    Option,
    InputNumber,
  },
  data() {
    return {
      topics,
      selectedTopicTitle: topics[0].title,
      settingTime: 3,
      speekSpeedRate: 1,
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
};
</script>

<style lang="scss" scoped>
.main {
  padding-top: 30px;
}
.wrapper {
  width: 200px;
  margin: 0 auto;
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