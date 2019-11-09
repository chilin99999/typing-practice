import criminalLaw from './criminalLaw';

const topics = [
  criminalLaw,
];

topics.forEach(topic => {
  topic.content = topic.content.replace(/\s/g, '');
});

export default topics;