import moment from 'moment';
moment.locale('zh-cn');

export function toThousands(num) {
  if (typeof num === 'string') {
    return num.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  }
  return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}

export function NumberUpperFormat(input) {
  // num - 位数
  // 简单理解后面要有三个0，则是千，4个零，则是万。当然不一定是零，位数到了就行，反正都会省略掉（未做四舍五入）
  // 可以随意的增删改units内容实现单位的配置
  const units = [
    { num: 3, unit: '千' },
    { num: 4, unit: '万' },
    { num: 6, unit: '百万' },
    { num: 7, unit: '千万' },
    { num: 8, unit: '亿' },
  ];
  // 精确到整数，直接用js自带方法input.toFixed(0)也可以
  const num = input.toFixed(0);
  if (num.length <= 3) {
    // 项目相关需求，千以下不加单位
    return num;
  }
  // 保证前面至少留一位
  const len = num.length - 1;
  let isFind = false;
  for (let i = 0, length = units.length; i < length; i++) {
    let item = units[i];
    if (len >= item.num && len < units[i + 1].num) {
      isFind = true;
    } else if (i === length - 2) {
      isFind = true;
      item = units[++i];
    }
    if (isFind) {
      // 确认区间后，返回前几位加上单位
      return `${num.slice(0, num.length - item.num)}${item.unit}`;
    }
  }
}

export function toYuan(num) {
  if (!num) {
    return 0;
  }
  return num / 100;
}

export function toDecimal(count, num) {
  let divisor = 1;
  let reserveNum = '0';

  switch (num) {
  case 0:
    divisor = 1;
    break;
  case 1:
    divisor = 10;
    reserveNum = '0';
    break;
  case 2:
    divisor = 100;
    reserveNum = '00';
    break;
  case 3:
    divisor = 1000;
    reserveNum = '000';
    break;
  default:
    divisor = 1;
    break;
  }

  let result = Math.floor(count * divisor) / divisor;

  if (result.toString().indexOf('.') < 0) {
    result = `${result}.${reserveNum}`;
  }

  return result;
}

/**
 * 格式化数字规范，五位以下显示绝对数值；
 * 大于等于5位显示“X.X万”，保留一位小数，向下取整；
 * 大于等于9位显示“X.X亿”，保留一位小数，向下取整。
 */
export function moneyFormatUnit(count, num = 1) {
  const TEN_THOUSAND = 10000;
  const A_HUNDRED_MILLION = 100000000;
  const toNumber = parseFloat(count);
  if (window.isNaN(toNumber)) return toNumber;
  const tenThousand = toNumber / TEN_THOUSAND;
  const aHundredMillion = toNumber / A_HUNDRED_MILLION;
  let result = 0;

  if (toNumber < TEN_THOUSAND) {
    result = toNumber;
  } else if (toNumber >= A_HUNDRED_MILLION) {
    result = `${toDecimal(aHundredMillion, num)} 亿`;
  } else {
    result = `${toDecimal(tenThousand, num)} 万`;
  }

  return result;
}

export function getDateStr(addDayCount = 0) {
  const now = new Date();
  //获取 addDayCount 天后的日期
  now.setDate(now.getDate() + addDayCount);
  const year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
}

export function listDateStr(lastTime) {
  const nowDate = new Date().getDate();
  const lastDate = new Date(lastTime).getDate();

  let dateStr;
  if (nowDate === lastDate) {
    dateStr = moment(lastTime).format('HH:mm');
  } else if (nowDate - lastDate === 1) {
    dateStr = '昨天';
  } else {
    dateStr = moment(lastTime).format('YYYY-MM-DD');
  }

  return dateStr;
}

export function msgDateStr(lastTime) {
  let formatStr = 'YYYY-MM-DD HH:mm';

  if (new Date().getDate() === new Date(lastTime).getDate()) {
    formatStr = 'HH:mm';
  }

  return moment(lastTime).format(formatStr);
}

export function formatDate(time) {
  let formatStr = 'YYYY-MM-DD HH:mm:ss';

  if (new Date().getDate() === new Date(time).getDate()) {
    formatStr = 'HH:mm:ss';
  }

  return moment(time).format(formatStr);
}

export function isAndroid() {
  var u = window.navigator.userAgent;
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
}

export function isiOS() {
  var u = window.navigator.userAgent;
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
}
