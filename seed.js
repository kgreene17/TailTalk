const db = require('./server/db');
const faker = require('faker')
const User = require('./server/db/models/user');
const Message = require('./server/db/models/message');
const Channel = require('./server/db/models/channel');

const channels = [
  { name: 'Chat with an available vet' },
];

const users = [...Array(10)].map(() => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  isVet: faker.random.boolean(),
}))


//const id = () => Math.round(Math.random() * (users.length - 1)) + 1;

const messages = [
  { userId: 1, content: 'Hi, how can I help you today', channelId: 1 },
  { userId: 2, content: "Hi! Just a quick question--my dog Rupert ate a brownie while I wasnt looking. Do I need to take him into the vet asap?", channelId: 1 },
  { userId: 1, content: "Rupert! Silly pup. It's great you reached out -- chocolate is considered poisonous to dogs. That being said, a small amount is often not life-threatening. Have you noticed any symptoms of gastrointestinal distess, lethargy, or anything else out of the norm for him?", channelId: 1 },
  { userId: 2, content: 'No - he ate it about 30 minutes ago and seems fine as can be!', channelId: 1 },
  { userId: 1, content: "Great - well in that case I would recommend that you watch him for any developing changes in behavior, but until something does develop, you don't need to take him in yet. It may have been a small enough amount that he'll be fine without any intervention", channelId: 1 },
  { userId: 1, content: "If you notice anything that you aren't sure is related to the brownie, feel free to reach back out to us!", channelId: 1 },
  { userId: 2, content: 'Ok thank you - I will keep an eye on him!', channelId: 1 },
  { userId: 1, content: 'Great -- is there anything else?', channelId: 1 },
  { userId: 2, content: "No, I think that's all! Thank you for your help!", channelId: 1 },
  { userId: 1, content: 'My pleasure. Have a great day and tell Rupert to curb that sweettooth!', channelId: 1 },
];

const seed = () =>
  Promise.all(users.map(user =>
    User.create(user))
  )
  .then(() =>
  Promise.all(channels.map(channel =>
    Channel.create(channel))
  ))
  .then(() =>
  Promise.all(messages.map(message =>
    Message.create(message))
  )
);

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
