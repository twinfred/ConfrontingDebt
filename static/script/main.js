const usersUrl = 'http://localhost:8000/api/users'
const xhr = new XMLHttpRequest();

// Delete Button - Send Delete Request
function deleteUser(id){
    console.log(id);
    xhr.open("DELETE", usersUrl + '/' + id , true);
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