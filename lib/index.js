"use strict";

require("./twitter");

var _koa = _interopRequireDefault(require("koa"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _playSound = _interopRequireDefault(require("./playSound"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const server = new _koa.default();
const router = new _koaRouter.default();
router.get('/laugh', ctx => {
  (0, _playSound.default)();
  ctx.status = 200;
});
server.use(router.routes());
server.listen(process.env.PORT || 9999);