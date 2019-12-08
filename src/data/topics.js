import criminalLaw from './criminalLaw';
import threeWord from './threeWord';
import nartialArtsNovel1 from './nartialArtsNovel1';
import web1 from './web1';

const topics = [
  criminalLaw,
  threeWord,
  nartialArtsNovel1,
  web1,
];

topics.forEach(topic => {
  topic.content = topic.content.split(/\n/g).map(d => d.trim()).join('\n');
});

export default topics;