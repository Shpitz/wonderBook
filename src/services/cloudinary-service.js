const CLOUD_NAME = "dqww4qjgo"

var UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

// on submit call to this function
function uploadImg(elForm, ev) {
    // ev.preventDefault();
   
    // A function to be called if request succeeds
    function onSuccess(res) {
        console.log('uploadedImg', res);
        console.log('uploadedImg', res.url);
        // return res.url
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm) {
    var UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    var formData = new FormData();
    formData.append('file', elForm[0].files[0])
    formData.append('upload_preset', 'xhrc0bgr');

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
    .then(function (response) {
        return response.json()
    })
    // .then(onSuccess)
    // .catch(function (error) {
    //     console.error(error)
    // })
}

function doUploadAudio(elForm) {
    var UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`
    var formData = new FormData();
    formData.append('file', elForm[0].files[0])
    formData.append('upload_preset', 'xhrc0bgr');

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
    .then(function (response) {
        return response.json()
    })
    // .then(onSuccess)
    // .catch(function (error) {
    //     console.error(error)
    // })
}

export default{
    doUploadImg,
    doUploadAudio
}