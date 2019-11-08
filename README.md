## node-yuque

### install

```bash
~$ npm i @alipay/yuque --save
```

### example

```js
const YuQue = require('@alipay/yuque');

const lark = new YuQue({
  token: '-- YOUR TOKEN --'
});

(async () => {

  const hello = await lark.hello();
  console.log(hello.message);

})();


```