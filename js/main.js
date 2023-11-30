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

// 替换为你的图片链接数组
// 替换为你的图片链接数组
const imageUrls = [
  'https://ossoososssn.oss-cn-beijing.aliyuncs.com/images/2023/11/26/IMG_9315.JPG',
  'https://ossoososssn.oss-cn-beijing.aliyuncs.com/images/2023/11/26/IMG_9316.JPG',
  'https://ossoososssn.oss-cn-beijing.aliyuncs.com/images/2023/11/26/IMG_9317.JPG',
  'https://ossoososssn.oss-cn-beijing.aliyuncs.com/images/2023/11/26/IMG_9318.JPG"',
  'https://ossoososssn.oss-cn-beijing.aliyuncs.com/images/2023/11/26/IMG_9308.JPG',
  'https://ossoososssn.oss-cn-beijing.aliyuncs.com/images/2023/11/26/IMG_9310.JPG',
  // 添加更多图片链接
];

const puzzlePieces = document.querySelectorAll('.puzzle-piece');
let currentIndex = 0;

function updatePiece(piece, imageUrl) {
  piece.style.backgroundImage = `url(${imageUrl})`;
}

function shufflePieces() {
  puzzlePieces.forEach((piece, index) => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    const imageUrl = imageUrls[randomIndex];
    updatePiece(piece, imageUrl);
  });
}

function init() {
  shufflePieces();

  // 为每个拼图块添加点击事件
  puzzlePieces.forEach((piece, index) => {
    piece.addEventListener('click', () => {
      // 交换当前点击的拼图块和空白拼图块的位置
      const tempImageUrl = puzzlePieces[currentIndex].style.backgroundImage;
      puzzlePieces[currentIndex].style.backgroundImage = piece.style.backgroundImage;
      piece.style.backgroundImage = tempImageUrl;
    });
  });
}

// 初始化
init();


