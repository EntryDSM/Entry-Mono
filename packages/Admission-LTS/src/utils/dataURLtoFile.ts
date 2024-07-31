export const dataURLtoFile = (dataurl: string) => {
  // var arr: any = dataurl.split(','),
  //   mime = arr[0].match(/:(.*?);/)[1];
  // if (typeof arr[1] !== 'string' || !arr[1].match(/^[A-Za-z0-9+/=]*$/)) {
  //   return new File([arr[1]], 'fileName.png');
  // }
  // const bstr = atob(arr[1]);
  // let n = bstr.length;
  // const u8arr = new Uint8Array(n);
  // while (n--) {
  //   u8arr[n] = bstr.charCodeAt(n);
  // }
  // return new File([u8arr], 'fileName.png', { type: mime });

  // return async (dataurl: string) => {
  //   const response = await fetch(dataurl);
  //   const buffer = await response.arrayBuffer();
  //   return new File([buffer], 'filename.png');
  // };

  return new Promise<File>((resolve, reject) => {
    fetch(dataurl, { method: 'GET' })
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        resolve(new File([buffer], 'filename.png'));
      })
      .catch((err) => reject(err));
  });
};
