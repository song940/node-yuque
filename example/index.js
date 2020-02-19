const YuQue = require('..');

const lark = new YuQue({
  token: '7SErcvBBgZqb41pMEgAHUiG5Ou2cHMg0dRxH7At4'
});

(async () => {

  const hello = await lark.hello();
  console.log(hello.message);

  const user = await lark.user('zeus.ls');
  console.log(user.name);

  const groups = await lark.groups('zeus.ls');
  console.log();
  console.log(' = groups =');
  for (const group of groups) {
    console.log(' -', group.name);
  }

  const repositoies = await lark.getRepositoies('zeus.ls');
  console.log();
  console.log(' = repositoies =');
  for (repository of repositoies) {
    console.log(' -', repository.name);
  }

  const topics = await lark.topics();
  // console.log(topics);

})();

