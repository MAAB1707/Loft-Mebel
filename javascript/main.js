class SLIDER{
  constructor(obj){
    this.slider = obj.slider
    this.sliderList = this.slider.querySelector('.slider')
    this.sliderItems = this.slider.querySelectorAll('.slider--list__item')
    this.prevBtn = this.slider.querySelector('.prev')
    this.nextBtn = this.slider.querySelector('.next')
    this.activeSlide = 0
    this.timeMove = 1000
    this.moveSlide = 100
    this.dir = obj.direction
    this.interval = obj.interval
    this.play = obj.autoplay
    this.dots = obj.createDots
    
    this.sliderItems.forEach((slide, key)=>{
      if(key != this.activeSlide){
        slide.style.transform = `translate${this.dir}(${this.moveSlide}%)`
      }
      if(key == this.sliderItems.length - 1){
        slide.style.transform = `translate${this.dir}(${-this.moveSlide}%)`
      }
    })
    // dots
    if(this.dots == true){
      const ul = document.createElement('ul')
      ul.classList.add('slider-dots')
      this.sliderItems.forEach(()=>{
        const li = document.createElement('li')
        ul.append(li)
      })
      this.slider.append(ul)
      this.sliderDots = this.slider.querySelectorAll('.slider-dots li')
      this.sliderDots[this.activeSlide].classList.add('active')
      this.sliderDots.forEach((dot, key)=>{
        dot.addEventListener('click', ()=>{this.controllers(key)})
      })
      this.active = true
    }
    // autoplay
    if(this.play == true){
      let autoPlay = setInterval(()=>{
        this.move(this.nextBtn)
      }, this.interval)
      this.slider.addEventListener('mouseenter', ()=>{
        clearInterval(autoPlay)
      })
      this.slider.addEventListener('mouseleave', ()=>{
        autoPlay = setInterval(()=>{
          this.move(this.nextBtn)
        }, this.interval)
      })
    }
    
    if(this.nextBtn != null && this.prevBtn != null){
      this.prevBtn.addEventListener('click', ()=>{this.move(this.prevBtn)})
      this.nextBtn.addEventListener('click', ()=>{this.move(this.nextBtn)})
    }
  }
  move(btn = null){
    if(btn != null){
      this.nextBtn.disabled = true
      this.prevBtn.disabled = true
      setTimeout(() => {
        this.nextBtn.disabled = false
        this.prevBtn.disabled = false
      }, this.timeMove + 200);
    }
    
    let btnPrexOrNext = btn == this.nextBtn ? -this.moveSlide : this.moveSlide
    this.sliderItems.forEach((slide, key)=>{
      if(key != this.activeSlide){
        slide.style.transform = `translate${this.dir}(${-btnPrexOrNext}%)`
        slide.style.transition = `0ms`
      }
    })
    setTimeout(() => {
      this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${btnPrexOrNext}%)`
      this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`
      if(this.dots == true){this.sliderDots[this.activeSlide].classList.remove('active')}
      if(btn == this.nextBtn){
        this.activeSlide++
        if(this.activeSlide > this.sliderItems.length - 1){
          this.activeSlide = 0
        }
      }else if(btn == this.prevBtn){
        this.activeSlide--
        if(this.activeSlide < 0){
          this.activeSlide = this.sliderItems.length - 1
        }
      }
      this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(0%)`
      this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`
      if(this.dots == true){this.sliderDots[this.activeSlide].classList.add('active')}
    }, 100);
  }
  controllers(dotKey){
    if(this.active && dotKey != this.activeSlide){
      this.sliderItems.forEach((slide)=>{
        slide.style.transition = `0ms`
      })
      this.active = false
      if(this.nextBtn != null && this.prevBtn != null){
        this.nextBtn.disabled = true
        this.prevBtn.disabled = true
      }
      this.sliderDots.forEach((dot)=>{dot.classList.remove('active')})
      let moveLeftOrRight = dotKey > this.activeSlide ? -this.moveSlide : this.moveSlide
      this.sliderItems[dotKey].style.transform = `translate${this.dir}(${-moveLeftOrRight}%)`
      setTimeout(() => {
        this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${moveLeftOrRight}%)`
        this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`
        this.sliderDots[this.activeSlide].classList.remove('active')
        this.activeSlide = dotKey
        this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(0%)`
        this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`
        this.sliderDots[this.activeSlide].classList.add('active')
      },100);
      setTimeout(() => {
        this.active = true
        if(this.nextBtn != null && this.prevBtn != null){
          this.nextBtn.disabled = false
          this.prevBtn.disabled = false
        }
      }, this.timeMove + 200);
    }
  }
}

const sliders = document.querySelectorAll('.sliders')
for(const slider of sliders){
  const autoplay = slider.hasAttribute('autoplay') ? true : false;
  const interval = slider.getAttribute('interval') >= 2000 ? slider.getAttribute('interval') : 2000;
  const dots = slider.hasAttribute('create-dots') ? true : false;
  const direction = slider.getAttribute('direction') == 'Y' || slider.getAttribute('direction') == 'y' ? 'Y' : 'X'
  new SLIDER({
    slider: slider,
    createDots: dots,
    autoplay: autoplay,
    interval: interval,
    direction: direction,
  })
}

// color
const CS = document.querySelectorAll('.CS')
const chose = document.querySelectorAll('.chose')
CS.forEach(function(color, key){
  color.addEventListener('click', function(){
    if(chose[key].style.display == 'flex'){
      chose[key].style.display = 'none';
    }else{
      chose[key].style.display = 'flex';

    }
  })
}) 

const sortsButton = document.querySelectorAll('.SortButton')
const sorts = document.querySelectorAll('.sorts')
sortsButton.forEach(function(button, key){
  button.addEventListener('click', function(){
    if(sorts[key].style.display == 'flex'){
      sorts[key].style.display = 'none';
    }else{
      sorts[key].style.display = 'flex';
    }
  })

})
const menuOthers =  document.querySelector('.menu__others');
const menuContent = document.querySelector('.menu__others--content')
menuContent.style.display = 'none'
menuOthers.addEventListener('click', function(){
    if(menuContent.style.display == 'none'){
        menuContent.style.display = 'flex'
    }else{
        menuContent.style.display = 'none'
    }
})

const navbarMenu = document.querySelector('.navbar__menu-button')
const leftMenu = document.querySelector('.left__menu')
const wrap = document.querySelector('.wrap')
const closeButton = document.querySelector('.close-button')

navbarMenu.addEventListener('click', function(){
    if(navbarMenu.classList.contains('active')){
        navbarMenu.classList.remove('active')
        leftMenu.style.width = '0px'
        
    }else{
        leftMenu.style.width = '227px'
        
        navbarMenu.classList.add('active')
    }      

})


closeButton.addEventListener('click', function(){
  if(navbarMenu.classList.contains('active')){
      navbarMenu.classList.remove('active')
      leftMenu.style.width = '0px'
      
  }else{
      leftMenu.style.width = '227px'
      
      navbarMenu.classList.add('active')
  }      

})
// likes
const like = document.querySelectorAll('.like')
like.forEach((likes, key)  => {
  likes.addEventListener('click', function(){
    if(likes.classList.contains('f300')){
      likes.classList.add('f900');
      likes.classList.remove('f300');
    }else{
      likes.classList.add('f300');
      likes.classList.remove('f900');
  
    }
  })
})
// 

const catalogMobilie =  document.querySelector('.catalog-mobilie');
const catalogFilter = document.querySelector('.catalog--filter')
catalogFilter.style.display = 'none'
catalogMobilie.addEventListener('click', function(){
    if(catalogFilter.style.display == 'none'){
      catalogFilter.style.display = 'flex'
    }else{
      catalogFilter.style.display = 'none'
    }
})





// carts
const cartImg = document.querySelectorAll('.cart-img');
const MainImg = document.querySelector('.cart--images__main')
cartImg.forEach(function(img, key){
  img.addEventListener('click', function(){
    let main = MainImg.getAttribute('src')
    let imgsrc = img.getAttribute('src');
    MainImg.setAttribute('src', imgsrc)
    cartImg[key].setAttribute('src', main)
  })
})

let transition = 0;
const imagesList = document.querySelector('.cart--images__list')
const prev = document.querySelector('.cart--img--controllers .prev')
const next = document.querySelector('.cart--img--controllers .next')
prev.addEventListener('click',  function(){
  if( transition >-40){
    transition -= 40;
    console.log(transition);
    console.log(imagesList.style.transform);
    imagesList.style.transform = 'translateX('+transition+'px)'
  }
})
next.addEventListener('click',  function(){
  if( transition <40){
    transition += 40;
    imagesList.style.transform = 'translateX('+transition+'px)'
  }
})
// stars
const stars = document.querySelectorAll('.stars')
stars.forEach(function(star, key){
  star.addEventListener('click', function(){
    for(let i=0; i <= key; i++){
      stars[i].style.opacity = '1'
    }
    for(let i= stars.length-1; i>key; i--){
      stars[i].style.opacity = '0.3'

    }
  })
})
const otherColors =  document.querySelector('.other-colors')
const color = document.querySelector('.color')
otherColors.addEventListener('click',function(){
  if(color.style.display == 'flex'){
    color.style.display = 'none'
  }else{

    color.style.display = 'flex'
  }
})
const otherNumber =  document.querySelector('.other-number')
const numbers = document.querySelector('.numbers')
otherNumber.addEventListener('click',function(){
  if(numbers.style.display == 'flex'){
    numbers.style.display = 'none'
  }else{

    numbers.style.display = 'flex'
  }
})
const otherSize =  document.querySelector('.other-size')
const sizes = document.querySelector('.sizes')
otherSize.addEventListener('click',function(){
  if(sizes.style.display == 'flex'){
    sizes.style.display = 'none'
  }else{

    sizes.style.display = 'flex'
  }
})
// tabpanel
const tabsPanelLinks = document.querySelectorAll('.tabsPanel__links a')
const tabsPanelItems = document.querySelectorAll('.tabsPanel__content--item')
tabsPanelLinks.forEach(function(link, key){
  link.addEventListener('click', function(){
    tabsPanelLinks.forEach(function(link2, key2){
      tabsPanelLinks[key2].classList.remove('active')
      tabsPanelItems[key2].classList.remove('active')
    })
    tabsPanelLinks[key].classList.add('active')
    tabsPanelItems[key].classList.add('active')
  })
})

