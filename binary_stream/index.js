// axios

const textBB = () => {
  axios
    .get("http://localhost:3000/textbb", {
      responseType: "arraybuffer",
    })
    .then((resp) => {
      const { data } = resp;
      console.log("data", data);
      const decoder = new TextDecoder();
      const string = decoder.decode(data);
      console.log("string", string);
    });
};

const textBS = () => {
  axios
    .get("http://localhost:3000/textbc", {
      //   responseType: "blob",
      responseType: "arraybuffer",
    })
    .then((resp) => {
      const { data } = resp;
      const blob = new Blob([data]);

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);

      link.download = "嘉然.png";
      link.click();
    });
};

const textBSB = () => {
  axios
    .get("http://localhost:3000/textbc", {
      responseType: "blob",
      // responseType: "arraybuffer",
    })
    .then((resp) => {
      const { data } = resp;
      const blob = new Blob([data]);

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);

      link.download = "嘉然.png";
      link.click();
    });
};

const getDataUrl = () => {
  return new Promise((resolve, reject) => {
    let blob = new Blob(["Hello, world!"], { type: "text/plain" });
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
};

const initDownFile2 = async () => {
  const downFile2Link = document.querySelector("#downFile2");
  downFile2Link.download = "测试2.txt";
  const dataurl = await getDataUrl();
  downFile2Link.href = dataurl;
};

const initDownFile = () => {
  const downFileLink = document.querySelector("#downFile");
  downFileLink.href = URL.createObjectURL(new Blob(["文件下载"]));
  downFileLink.download = "测试.txt";
};

const handleImgAndDownload = async () => {
  const img = document.querySelector("#img1");

  let canvas = document.createElement("canvas");

  canvas.width = img.clientWidth;
  canvas.height = img.clientHeight;

  let context = canvas.getContext("2d");

  context.drawImage(img, 0, 0);

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(resolve, "image/png");
  });

  let link = document.createElement("a");
  link.download = "gunshen.png";

  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
};

initDownFile();
initDownFile2();
