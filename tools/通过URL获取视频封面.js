let getCoverByURL = (src) => {
  console.log(`正在处理：${src}`);

  return new Promise((resolve, reject) => {
    let name = src.slice(src.lastIndexOf('/') + 1);
    let video = document.createElement('video');

    video.setAttribute('src', src);
    video.setAttribute('autoplay', 'autoplay');
    video.setAttribute('crossOrigin', 'anonymous');
    video.currentTime = 1;

    video.addEventListener('loadeddata', function () {
      let width = video.videoWidth || 400;
      let height = video.videoHeight || 300;
      console.log(`成功获取视频首帧：${width} x ${height}`);

      let canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(video, 0, 0, width, height);

      let dataURL = canvas.toDataURL('image/png');
      let link = document.createElement('a');
      link.download = `${name}.png`;
      link.href = dataURL;
      link.click();

      video.pause();
      video.remove();
      video = null;
      canvas.remove();
      canvas = null;

      console.log(`处理完成`);
      resolve();
    });

  });
};

let urlList = [
  `https://www.runoob.com/try/demo_source/movie.mp4`,
  `https://www.runoob.com/try/demo_source/mov_bbb.mp4`,
];

for (let u of urlList) {
  await getCoverByURL(u);
}
console.log('全部处理完成');
