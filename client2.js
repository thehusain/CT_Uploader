const url = 'https://p17u5uowm6.execute-api.eu-west-2.amazonaws.com/default/getPreSignedURL';
const options = {
    method: 'GET',
};
    
let form = document.getElementById("form");
form.addEventListener("submit", onSubmit);
    
    
async function onSubmit(event) {
    event.preventDefault();
    console.log("clicked")
    if (form.file.files.length < 1) {
        alert('select a file please');
            return false;
        }
    const file = form.file.files[0]

    fetch(url, options)
        .then(response => response.json())    // one extra step
        .then(data => {     
            uploadFile(data.uploadURL, file)
                }).then(data => {
                            alert('You uploaded' + file.name);
                            form.reset();
            });
}

async function uploadFile(uploadURL, file) {

let uploadResponse = await fetch(uploadURL, {
    method: "PUT",
    headers: {
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "text/csv",
        'x-amz-acl': 'public-read',
    },
    body: file
        }).then(resp => {
            return resp.text().then(body => {
                const result = {
                    status: resp.status,
                    body,
                };
                console.log(result)
                if (!resp.ok) {
                    return Promise.reject(result);
                }

                return result;
             });
        });
    

}
     
    
(window);
    
    