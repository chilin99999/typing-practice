<template>
  <div class="game">
    <div>
      <div>標題：{{topic && topic.title}}</div>
      <div>剩餘時間：{{showTimeText}}</div>
      <span v-for="(item, index) in sentenceBlocks" :key="index"
        :class="{ red: item.state == 'wrong', blue: item.state == 'correct' }">{{item.text}}</span>
    </div>
    <Input v-model="answer" type="text" :autosize="{minRows: 6,maxRows: 10}"
      @on-change="judgeAnswer" @on-enter="next" />

    <Button v-if="!isStart" @click="start" type="primary">開始作答</Button>
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
      isStart: false,
      sentences: [],
      sentenceBlocks: [],
      remainingSec: 0,
      answer: '',
    };
  },
  computed: {
    topic() {
      return this.$store.state.topic;
    },
    time() {
      return this.$store.state.time;
    },
    sentence() {
      return this.sentences[0];
    },
    showTimeText() {
      const minutes = Math.floor(this.remainingSec / 60);
      const seconds = this.remainingSec % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },
  },
  methods: {
    start() {
      this.isStart = true;
      this.speak('作答開始');
      setTimeout(() => {
        this.speak();
        this.countDownTime();
      }, 2000);
    },
    next() {
      this.setSentence();
      this.speak();
      this.answer = '';
    },
    countDownTime() {
      this.timer = setInterval(() => {
        this.remainingSec -= 1;
        if(this.remainingSec <= 0) {
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 1000);
    },
    speak(sentence=this.sentence) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(sentence);
      window.speechSynthesis.speak(msg);
    },
    judgeAnswer() {
      this.answer.split('').forEach((text, index) => {
        const topicBlock = this.sentenceBlocks[index];
        if(topicBlock) {
          if(topicBlock.text == text) {
            this.$set(this.sentenceBlocks, index, { text: topicBlock.text, state: 'correct' });
          }
          else {
            this.$set(this.sentenceBlocks, index, { text: topicBlock.text, state: 'wrong' });
          }
        }
      });
    },
    setSentence(isInitial) {
      if(!isInitial) {
        this.sentences.shift();
      }
      this.sentenceBlocks = this.sentence.split('').map(d => {
        return {
          text: d,
          state: '',
        };
      });
    },
  },
  created() {
    if(!this.topic) {
      this.$router.push('/');
      return;
    }
    this.sentences = this.topic.content.split(/(?<=。)/g);
    this.setSentence(true);
    this.remainingSec = this.time * 60;
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
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