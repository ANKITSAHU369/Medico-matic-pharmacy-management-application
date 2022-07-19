$(document).ready(function () {
    if(localStorage.getItem('loginStatus') == 'true'){
        location.assign('./orders.html')
    }
    let loginFormS = window.document.getElementById('loginform');
    loginFormS.onsubmit = function (e) {
        e.preventDefault();
        let logincredential = {
            username: this.username.value,
            password: this.password.value
        }
        if (logincredential.username === logincredential.password) {
            
            $.post("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login",logincredential,
                function (data, textStatus, jqXHR) {
                    alert('Login Successful..!')
                    window.localStorage.setItem('loginStatus',true)
                    location.replace('./orders.html')
                },
                
            );
        } else {
            alert(`Please Enter Valid Values ${logincredential.username} ${logincredential.password}`)
        }
    }
    $('.navbar-menu').click(function (e) { 
        e.preventDefault();
        $('.active').removeClass('active');
        $(e.target).addClass('active')
        
    });
});