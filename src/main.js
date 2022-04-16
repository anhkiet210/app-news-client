document.addEventListener("DOMContentLoaded",function () {
    // var flexmenu = document.querySelector(".menubar");
    // var trangthai = "duoi150" ;
    // window.addEventListener("scroll", function(){
    //     // console.log(this.window.pageYOffset);
    //     if (window.pageYOffset > 150) {
    //         if (trangthai == "duoi150") {
    //             flexmenu.classList.add("fixed");
    //             trangthai = "tren150";
    //         }
    //     }
    //     if (window.pageYOffset < 150) {
    //         if (trangthai == "tren150") {
    //             flexmenu.classList.remove("fixed");
    //             trangthai = "duoi150";
    //         }
    //     }
    // })

    const btn_link = document.getElementById('btn-link');
    btn_link.addEventListener('click',function(){
        const btn_show = document.getElementById('btn-show');
        const register = document.getElementById('js-modal-hide');
        const login = document.getElementById('js-modal-show');
        const btn_close = document.getElementById('btn-close');
        btn_show.addEventListener('click',function (){
            login.classList.add("hide");
            register.classList.add("show");
        });
        btn_close.addEventListener('click', function (){
            register.classList.remove("show");
            login.classList.remove("hide");
        });
    });

},false)