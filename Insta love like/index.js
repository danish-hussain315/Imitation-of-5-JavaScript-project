var image_container = document.querySelector("#container")
var icon = document.querySelector("i")

image_container.addEventListener("dblclick" , function(){
  icon.style.opacity = 0.8
  icon.style.transform = "translate(-50%,-50%) scale(2)"
  setTimeout(function(){
  icon.style.opacity = "0"
},1000)
  setTimeout(function(){
  icon.style.transform = "translate(-50%,-50%) scale(0)"
},2000)
})

