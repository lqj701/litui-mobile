export const shareWechatMessage = window.wx.invoke;

export const chooseImage = window.wx.chooseImage;
export const getLocalImgData = window.wx.getLocalImgData;
export const uploadImage = window.wx.uploadImage;

// debug
// export const chooseImage = obj => {
//   const localIds = [1];
//   obj.success && obj.success({ localIds });
// };

// export const getLocalImgData = obj => {
//   const localData =
//     'https://okzvmao1x.qnssl.com//1tQ9-j9Rd4zqWljgHoCIau_zKJPzzj7AncSpYoWfOFS-NMX4CtpBXNeydJ1kYAueA1006';

//   obj.success && obj.success({ localData });
// };

// export const uploadImage = obj => {
//   const serverId = parseInt(Math.random()*100)+'';
//   obj.success && obj.success({ serverId });
// };
