var isstatus = document.querySelector("h5")
const follow = document.querySelector("#follow")
var flag =0


follow.addEventListener("click", function(){
  if (flag == 0) {
    isstatus.innerHTML="Friends"
    isstatus.style.color="green"
    flag=1
    follow.innerHTML = "Unfollow"
  } else {
    isstatus.innerHTML="Stranger"
    isstatus.style.color="red"
    flag =0
    follow.innerHTML="Follow"
  }
  
})
