<template>
  <div class="setting">
    <div class="wrapper">
      <Select v-model="selectedTopicTitle" placeholder="請選擇作答題目" class="margin-y-8">
        <Option v-for="(item, index) in topics" :value="item.title" :key="index">{{ item.title }}</Option>
      </Select>
      <Input v-model="settingTime" prefix="md-alarm" type="number" placeholder="請輸入測驗時間(分)" class="margin-y-8" />

      <Button type="primary" class="margin-y-24" @click="set">確定</Button>
    </div>
  </div>
</template>

<script>
import { Button, Input, Select, Option } from 'view-design';
import topics from '../data/topics';

export default {
  name: 'home',
  components: {
    Button,
    Input,
    Select,
    Option,
  },
  data() {
    return {
      topics,
      selectedTopicTitle: topics[0].title,
      settingTime: null,
    };
  },
  methods: {
    set() {
      const topic = this.topics.find(d => d.title == this.selectedTopicTitle);
      this.$store.commit('set', {
        topic,
        time: this.settingTime,
      });
      this.$router.push('/game');
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>