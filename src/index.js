// @flow
import './twitter';
import koa from 'koa';
import KoaRouter from 'koa-router';
import playSound from './playSound';

const server = new koa();
const router = new KoaRouter();

router.get('/laugh', ctx => {
  playSound();
  ctx.status = 200;
});

server.use(router.routes());
server.listen(process.env.PORT || 9999);

playSound();
