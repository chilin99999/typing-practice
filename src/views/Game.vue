<template>
  <div class="game">
    <div class="wrapper">
      <div class="section-top">
        <h2>標題：{{topic && topic.title}}</h2>
        <h3>剩餘時間：{{showTimeText}}</h3>
        <h3>作答文字：{{correctTextCount}}</h3>
        <h3>答錯文字：{{wrongTextCount}}</h3>
        <h3>答對率：{{correctRate}} %</h3>
      </div>
      <div class="section-bottom">
        <div v-if="isStart">
          <span v-for="(item, index) in sentenceBlocks" :key="index"
            :class="{ red: item.state == 'wrong', blue: item.state == 'correct' }">{{item.text}}</span>
          
          <Input v-model="answer" type="textarea" :autosize="{minRows: 6,maxRows: 10}"
            @on-change="judgeAnswer" @on-enter="next" autofocus />
        </div>
        <Button v-if="!isStart" @click="start" type="primary">開始作答</Button>
      </div>
    </div>

    <Modal
      v-model="isGameOverModalShow"
      title="測驗結果">
      <p>作答文字：{{correctTextCount}}</p>
      <p>答錯文字：{{wrongTextCount}}</p>
      <p>答對率：{{correctRate}} %</p>
      <p>設定時間：{{time}}分</p>
      <p>剩餘時間：{{showTimeText}}</p>
      <p>打字速度：{{typeSpeed}}字/分</p>
      <div slot="footer">
        <Button type="primary" size="large" long @click="goBack">確定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Button, Input, Modal } from 'view-design';

export default {
  name: 'home',
  components: {
    Button,
    Input,
    Modal,
  },
  data() {
    return {
      isGameOverModalShow: false,
      isStart: false,
      sentences: [],
      paragraph: '',
      sentenceBlocks: [],
      remainingSec: 0,
      answer: '',
      correctTextCount: 0,
      wrongTextCount: 0,
      spentTimeText: '',
      typeSpeed: 0,
    };
  },
  computed: {
    topic() {
      return this.$store.state.topic;
    },
    time() {
      return this.$store.state.time;
    },
    speekSpeedRate() {
      return this.$store.state.speekSpeedRate;
    },
    mode() {
      return this.$store.state.mode;
    },
    sentence() {
      return this.sentences && this.sentences[0] || this.paragraph;
    },
    showTimeText() {
      const minutes = Math.floor(this.remainingSec / 60);
      const seconds = this.remainingSec % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },
    correctRate() {
      if(this.correctTextCount == 0) {
        return 0;
      }
      return Math.round(this.correctTextCount / (this.correctTextCount + this.wrongTextCount) * 100);
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
      this.countCorrectRate();
      this.setSentence();
      if(this.isStart) {
        this.speak();
        this.answer = '';
      }
    },
    countCorrectRate() {
      const answerBlocks = this.answer.split('');
      this.sentenceBlocks.forEach(({text}, index) => {
        const answer = answerBlocks[index];
        if(answer && text == answer) {
          this.correctTextCount += 1;
        }
        else {
          this.wrongTextCount += 1;
        }
      });
    },
    countDownTime() {
      this.timer = setInterval(() => {
        this.remainingSec -= 1;
        if(this.remainingSec <= 0) {
          this.gameOverService();
        }
      }, 1000);
    },
    speak(sentence=this.sentence) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(sentence);
      msg.rate = this.speekSpeedRate;
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
        if(this.sentences.length <= 1) {
          this.gameOverService();
        }
        this.sentences.shift();
      }
      this.sentenceBlocks = this.sentence.split('').map(d => {
        return {
          text: d,
          state: '',
        };
      });
    },
    setHistoryRecord() {
      const record = {
        typeSpeed: this.typeSpeed,
        correctTextCount: this.correctTextCount,
        timestamp: Date.now(),
      };

      const last10records = JSON.parse(localStorage.getItem('last10records')) || [];
      const top10records = JSON.parse(localStorage.getItem('top10records')) || [];
      if(last10records.length == 10) {
        last10records.pop();
      }
      last10records.unshift(record);

      top10records.push(record);
      top10records.sort((a, b) => b.typeSpeed - a.typeSpeed);
      if(top10records.length == 10) {
        top10records.pop();
      }

      localStorage.setItem('last10records', JSON.stringify(last10records));
      localStorage.setItem('top10records', JSON.stringify(top10records));
    },
    gameOverService() {
      this.isStart = false;
      this.isGameOverModalShow = true;
      clearInterval(this.timer);
      this.timer = null;
      window.speechSynthesis.cancel();

      const spentMinute = ((this.time * 60) - this.remainingSec) / 60;
      this.typeSpeed = Math.round(this.correctTextCount / spentMinute * 100) / 100;
      this.setHistoryRecord();
    },
    goBack() {
      this.$router.push('/');
    },
  },
  created() {
    if(!this.topic) {
      this.$router.push('/');
      return;
    }
    if(this.mode == 'sentence') {
      this.sentences = this.topic.content.split(/(?<=\n)/g).filter(d => d.trim());
    }
    else {
      this.paragraph = this.topic.content;
    }
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
.wrapper {
  width: 500px;
  margin: 0 auto;

  .section-top {
    padding: 20px 0;
  }
  .section-bottom {
    margin-top: 30px;
  }
}
.red {
  color: red;
}
.blue {
  color: blue;
}
</style>