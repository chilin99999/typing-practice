<template>
  <div class="home">
    <Button @click="speak">Speak</Button>
  </div>
</template>

<script>
import { Button } from 'view-design';

export default {
  name: 'home',
  components: {
    Button,
  },
  methods: {
    speak() {
      const msg = new SpeechSynthesisUtterance('嗨嗨');
      window.speechSynthesis.speak(msg);
    },
  },
};
</script>
