<template>
  <div class="home">
    <div>
      <span v-for="(item, index) in topicBlocks" :key="index" :class="{ red: item.state == 'wrong', blue: item.state == 'correct' }">{{item.text}}</span>
    </div>
    <Input v-model="answer" type="textarea" :autosize="{minRows: 6,maxRows: 10}" @on-change="judgeAnswer" />

    <Button @click="speak">Speak</Button>
  </div>
</template>

<script>
import { Button, Input } from 'view-design';

export default {
  name: 'home',
  components: {
    Button,
    Input,
  },
  data() {
    return {
      topic: `行為後法律有變更者，適用行為時之法律。但行為後之法律有利於行為人者，適用最有利於行為人之法律。
        沒收、非拘束人身自由之保安處分適用裁判時之法律。
        處罰或保安處分之裁判確定後，未執行或執行未完畢，而法律有變更，
        不處罰其行為或不施以保安處分者，免其刑或保安處分之執行。`,
      topicBlocks: [],
      answer: '',
    };
  },
  methods: {
    speak() {
      const msg = new SpeechSynthesisUtterance(this.topic);
      window.speechSynthesis.speak(msg);
    },
    judgeAnswer() {
      this.answer.split('').forEach((text, index) => {
        const topicBlock = this.topicBlocks[index];
        if(topicBlock) {
          if(topicBlock.text == text) {
            this.$set(this.topicBlocks, index, { text: topicBlock.text, state: 'correct' });
          }
          else {
            this.$set(this.topicBlocks, index, { text: topicBlock.text, state: 'wrong' });
          }
        }
      });
      console.log(this.answer.length);
    },
  },
  created() {
    this.topicBlocks = this.topic.split('').map(d => {
      return {
        text: d,
        state: '',
      };
    });
  },
};
</script>

<style lang="scss" scoped>
.red {
  color: red;
}
.blue {
  color: blue;
}
</style>