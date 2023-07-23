import cardImg1 from '~/assets/cardImg1.jpeg';
import cardImg2 from '~/assets/cardImg2.jpeg';
import cardImg3 from '~/assets/cardImg3.jpeg';
import Jane from '~/assets/profiles/Jane.png';
import Janet from '~/assets/profiles/Janet.png';
import John from '~/assets/profiles/John.png';

const characters = {
  buyer: {
    background: {
      modelId: '2',
      name: 'Janet',
      age: 33,
      currentAddress: 'San Francisco',
      job: 'CEO',
      salary: '$200,000',
      ethnicity: 'Chinese',
      family: 'Married with 2 kids',
      personality: 'Outgoing, friendly, and loves to travel',
      image: cardImg1,
      profileImg: Janet,
    },
  },
  seller: {
    background: {
      modelId: '3',
      name: 'John',
      age: 40,
      currentAddress: 'San Francisco',
      job: 'Plumber',
      salary: '$100,000',
      ethnicity: 'Canadian',
      family: 'Single',
      personality: 'Introverted, quiet, and loves to read',
      image: cardImg2,
      profileImg: John,
    },
  },
  tenant: {
    background: {
      modelId: '1',
      name: 'Jane',
      age: 25,
      currentAddress: 'San Francisco',
      job: 'Student',
      salary: '$0',
      ethnicity: 'American',
      family: 'Single',
      personality: 'Outgoing and loves to party',
      image: cardImg3,
      profileImg: Jane,
    },
  },
};

export default characters;
