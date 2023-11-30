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

// main.js

// 在文档加载完成后执行
document.addEventListener("DOMContentLoaded", function () {
  // 获取图片容器和所有图片元素
  var imageContainer = document.querySelector(".special-card-right");
  var images = imageContainer.querySelectorAll("img");

  // 初始化索引和定时器
  var currentIndex = 0;
  var timer;

  // 自动切换图片的函数
  function autoChangeImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  // 显示特定索引的图片
  function showImage(index) {
    images.forEach(function (image, i) {
      image.style.display = i === index ? "block" : "none";
    });
  }

  // 启动定时器，每隔两秒切换一次图片
  timer = setInterval(autoChangeImage, 2000);

  // 左右滑动切换图片的事件监听
  imageContainer.addEventListener("click", function (event) {
    // 根据点击位置判断是左滑还是右滑
    if (event.clientX < window.innerWidth / 2) {
      // 左滑
      currentIndex = (currentIndex - 1 + images.length) % images.length;
    } else {
      // 右滑
      currentIndex = (currentIndex + 1) % images.length;
    }

    // 显示当前索引的图片
    showImage(currentIndex);

    // 重置定时器
    clearInterval(timer);
    timer = setInterval(autoChangeImage, 2000);
  });
});
