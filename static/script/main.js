const siteUrl = 'http://localhost:8000';
// Delete Button - Send Delete Request
function deleteThis(type, id){
    var xhr = new XMLHttpRequest();
    var typeUrl;
    if(type == 'user'){
        typeUrl = siteUrl + '/api/users';
    }else if(type == 'content'){
        typeUrl = siteUrl + '/api/contents';
    }else if(type == 'blog'){
        typeUrl = siteUrl + '/api/blogs';
    }
    xhr.open('DELETE', typeUrl + '/' + id, true);
    xhr.onload = function(){
        var response = JSON.parse(xhr.responseText);
        if(xhr.readyState == 4 && xhr.status == '200'){
            console.table(response);
        }else{
            console.error(response);
        }
    }
    xhr.send(null);
}

function updateThis(type, id){
    var data = {};
    var json = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    var typeUrl;
    if(type == 'user'){
        typeUrl = siteUrl + '/api/users/';
    }else if(type == 'content'){
        typeUrl = siteUrl + '/api/contents/';
    }else if(type == 'blog'){
        typeUrl = siteUrl + '/api/blogs/';
    }
    xhr.open('PUT', typeUrl + '/' + id, true);
    xhr.onload = function(){
        if(xhr.readyState == 4 && xhr.status == '200'){
            console.table(response);
        }else{
            console.error(response);
        }
    }
    xhr.send(null);
}