class SideNav{
    constructor(sideEl){
        this.sideEl = sideEl;
        this.menuBtn = document.querySelector(".menu");
        this.closeBtn = document.querySelector(".closebtn");

        this.menuBtn.addEventListener("click", (e)=> this.toggleNav(e), false);
        this.closeBtn.addEventListener("click", (e)=> this.toggleNav(e), false);
    }

   toggleNav(e){
        this.sideEl.classList.toggle("active-sb");   
   }
}