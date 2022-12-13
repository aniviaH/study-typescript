// const fs = require("fs");
// const path = require('path')

import fs from 'fs'
import path from 'path'

interface IFileParamToCopy {
  src: string,
  dest: string,
}

const filesToCopy: Array<IFileParamToCopy> = [
  {
    src: "./test-a.html",
    dest: "./dest/test-a.html",
  },
  {
    src: "./test-b.html",
    dest: "./dest/test-b.html",
  },
];

filesToCopy.forEach(({ src, dest }) => {
  copyFile(src, dest);
});

function copyFile(src: string, dest: string) {
  console.log('src---', src, path.resolve(__dirname, src))
  console.log('dest---', dest, path.resolve(__dirname, dest))

  const absoluteSrc = path.resolve(__dirname, src)
  const absoluteDest = path.resolve(__dirname, dest)


  /**
   * fs.constants.COPYFILE_EXCL: The copy operation will fail if dest already exists.
   * fs.constants.COPYFILE_FICLONE: The copy operation will attempt to create a copy-on-write reflink. If the platform does not support copy-on-write, then a fallback copy mechanism is used.
   * fs.constants.COPYFILE_FICLONE_FORCE: The copy operation will attempt to create a copy-on-write reflink. If the platform does not support copy-on-write, then the operation will fail.
   */
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


