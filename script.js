//script.js

// const uploadUrl = 'http://localhost:3000/upload';

// document.getElementById('upload-form').addEventListener('submit', async (e) => {
//     e.preventDefault();
    
//     const formData = new FormData();
//     formData.append('image', document.getElementById('image-input').files[0]);
//     console.log(formData); // Add this line to check the form data
    
//     try {
//         const response = await fetch(uploadUrl, { // Use the updated URL
//             method: 'POST',
//             body: formData,
//         });
//         const data = await response.json();
//         displayImage(data.imageUrl);
//     } catch (error) {
//         console.error('Error uploading image:', error);
//     }
// });

document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formElement = document.getElementById('upload-form');
    const fileType = formElement.dataset.fileType;

    let uploadType = '';
    if (fileType === 'image') {
        uploadType = 'image';
    } else if (fileType === 'pdf') {
        uploadType = 'pdf';
    }

    const formData = new FormData();
    formData.append('file', document.getElementById('file-input').files[0]);

    try {
        const response = await fetch(`http://localhost:3000/upload/${uploadType}`, {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (response.ok) {
            // Show the success message
            document.getElementById('success-message').style.display = 'block';
            displayFile(data.fileUrl);
        } 
        } catch (error) {
            console.error('Error uploading file:', error);
            
        }
});


function displayImage(imageUrl) {
    const imageContainer = document.getElementById('image-container');
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imageContainer.appendChild(imgElement);
}
