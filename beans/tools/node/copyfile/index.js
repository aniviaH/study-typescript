const fs = require("fs");
const path = require('path')

const filesTopCopy = [
  {
    src: "./test-a.html",
    dest: "./dest/test-a.html",
  },
  {
    src: "./test-b.html",
    dest: "./dest/test-b.html",
  },
];

function copyFile(src, dest) {
  console.log('src---', src, path.resolve(__dirname, src))
  console.log('dest---', dest, path.resolve(__dirname, dest))

  const absoluteSrc = path.resolve(__dirname, src)
  const absoluteDest = path.resolve(__dirname, dest)

  const mode = 0
  // const mode = fs.constants.COPYFILE_EXCL
  // const mode = fs.constants.COPYFILE_FICLONE
  // const mode = fs.constants.COPYFILE_FICLONE_FORCE

  // 异步
  fs.copyFile(absoluteSrc, absoluteDest, mode, (err) => {
    if (err) {
      console.log("Error Found:", err);
    } else {
      console.log("Files copied", absoluteSrc, absoluteDest);
    }
  });

  // 同步
  // try {
  //   fs.copyFileSync(absoluteSrc, absoluteDest, mode)
  //   console.log("Files copied", absoluteSrc, absoluteDest);
  // } catch (err) {
  //   console.log("Error Found:", err);
  // }
}

filesTopCopy.forEach(({ src, dest }) => {
  copyFile(src, dest);
});
