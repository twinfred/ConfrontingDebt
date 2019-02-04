const siteUrl = 'http://localhost:8000';
// Delete Button - Send Delete Request
function deleteThis(type, id){
    var xhr = new XMLHttpRequest();
    var typeUrl;
    console.log(type);
    if(type == 'user'){
        console.log('user');
        typeUrl = siteUrl + '/api/users';
    }else if(type == 'content'){
        console.log('content');
        typeUrl = siteUrl + '/api/contents';
    }else if(type =='blog'){
        console.log('blog');
        typeUrl = siteUrl + '/api/blogs';
    }
    console.log(id);
    console.log(siteUrl);
    xhr.open("DELETE", typeUrl + '/' + id , true);
    xhr.onload = function () {
        var response = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(response);
        } else {
            console.error(response);
        }
    }
    xhr.send(null);
}