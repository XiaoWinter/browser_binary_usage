const Koa = require("koa");

const Router = require("koa-router");

const cors = require("@koa/cors");

const fs = require("fs");

const app = new Koa();

const router = new Router();
// 文本的二进制
router.get("/textbb", (ctx, next) => {
  ctx.body = Buffer.from("这是一段文本流");
});

// 文本的二进制
router.get("/textbc", (ctx, next) => {
  const readStream = fs.createReadStream("./test.png");
  ctx.body = readStream;
});

router.get("/textf", (ctx, next) => {
  const filename = "嘉然.png";

  ctx.res.setHeader("Content-Type", "application/octet-stream");
  ctx.res.setHeader(
    "Content-Disposition",
    `attachment;filename=${encodeURIComponent(filename)}`,
  );
  const readStream = fs.createReadStream("./test.png");
  ctx.body = readStream;
});

router.get("/diana.png", (ctx, next) => {
  const readStream = fs.createReadStream("./test.png");
  ctx.body = readStream;
});

router.get("/", (ctx, next) => {
  ctx.body = "koa server";
});

app.use(cors()).use(router.routes()).use(router.allowedMethods());

app.listen(3000);
