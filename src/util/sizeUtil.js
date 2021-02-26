/**
 * Created by ThatWay on 18/1/29.
 * 尺寸相关公共操作
 */
// 页面高度
export function pageHeight() {
  let winHeight = 0;

  // 获取窗口高度
  if (window.innerHeight) {
    winHeight = window.innerHeight;
  } else if (document.body && document.body.clientHeight) {
    winHeight = document.body.clientHeight;
  }

  // 通过深入Document内部对body进行检测，获取窗口大小
  if (
    document.documentElement &&
    document.documentElement.clientHeight &&
    winHeight === 0
  ) {
    winHeight = document.documentElement.clientHeight;
  }
  return winHeight;
}

// 页面宽度
export function pageWidth() {
  let winWidth = 0;

  // 获取窗口高度
  if (window.innerWidth) {
    winWidth = window.innerWidth;
  } else if (document.body && document.body.clientWidth) {
    winWidth = document.body.clientWidth;
  }

  // 通过深入Document内部对body进行检测，获取窗口大小
  if (document.documentElement && document.documentElement.clientWidth) {
    winWidth = document.documentElement.clientWidth;
  }

  if (winWidth >= 769) {
    winWidth = 750;
  }

  return winWidth;
}

// 内容高度
export function getScollHeight() {
  return document.body.scrollHeight;
}

// 页面垂直滚动距离
export function getPageScollTop() {
  if (window.scrollY) {
    return window.scrollY;
  } else if (window.pageYOffset) {
    return window.pageYOffset;
  } else if (document.documentElement.scrollTop) {
    return document.documentElement.scrollTop;
  } else if (document.body.scrollTop) {
    return document.body.scrollTop;
  } else {
    return 0;
  }
}
