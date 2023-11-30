// 添加视差效果
var image = document.getElementsByClassName('banner-pic-img');
new simpleParallax(image, {
  orientation: 'up',
  scale: 1.2,
  delay: 2,
  transition: 'cubic-bezier(0,0,0,1)',
  maxTransition: 50,
  overflow: true
});

// 添加菜单点击事件
var menuButton = document.getElementById("nav-menu");
menuButton.addEventListener('click',function(){
  if(document.getElementById("body").classList.contains('show-menu')) {
    heoWeb.hideMenu();
  }else {
    heoWeb.showMenu();
  }
},false)

//关闭菜单
$('.menu-list').click(function () {
	heoWeb.hideMenu();
});

//阻止菜单滚动
document.querySelector('.menu-list').addEventListener('wheel',(e)=>{
  e.preventDefault()
})

var heoWeb = {
  //显示菜单
  showMenu: function() {
    document.getElementById("body").classList.add("show-menu");
  },

  hideMenu: function() {
    document.getElementById("body").classList.remove("show-menu");
  },

  //跳转到id
  scrollTo(id) {
    let target = document.getElementById(id);
    if (!target) return;
    let targetPosition = target.offsetTop - 60;
    let startPosition = window.pageYOffset;
    let distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      let timeElapsed = currentTime - startTime;
      let run = ease(timeElapsed, startPosition, distance, 600);
      window.scrollTo(0, run);
      if (timeElapsed < 600) requestAnimationFrame(animation);
    }
  
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
  
    requestAnimationFrame(animation);
  }
}

//滚动页面动画
function scrollToTopWithAnimation() {
  const duration = 600; // in milliseconds
  const startPosition = window.pageYOffset;
  const distance = -window.pageYOffset;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) {
      startTime = currentTime;
    }
    const timeElapsed = currentTime - startTime;
    const scrollY = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, scrollY);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// 添加到你的 main.js 文件中，或创建一个新的 JS 文件
document.addEventListener("DOMContentLoaded", function () {
  // 设置滚动速度（可以调整）
  const scrollSpeed = 1;

  // 获取容器和其第一个子元素（第一张图片）
  const container = document.querySelector(".image-scroll-container");
  const firstImage = container.querySelector("img");

  // 克隆第一张图片并将其附加到容器
  const clonedImage = firstImage.cloneNode(true);
  container.appendChild(clonedImage);

  // 滚动图片的函数
  function scrollImages() {
    // 如果滚动到最左边，将滚动位置重置为 0
    if (container.scrollLeft >= firstImage.clientWidth) {
      container.scrollLeft = 0;
    } else {
      // 否则，继续滚动
      container.scrollLeft += scrollSpeed;
    }
  }

  // 设置定时器，每隔一段时间触发滚动函数
  setInterval(scrollImages, 50); // 50 毫秒为例，可以根据需要调整
});
