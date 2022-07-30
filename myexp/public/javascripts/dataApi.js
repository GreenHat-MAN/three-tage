import ajax from 'jquery'
function getUser(url,username){
    ajax({
        url,
        username,
        success:function(res){
            console.log(res);
        }
    })
}

