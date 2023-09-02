//galery.js


// const imageGallery = document.getElementById('image-gallery');

// // Fetch image URLs from the server
// async function fetchImages() {
//     try {
//         const response = await fetch('http://localhost:3000/fetch-images');
//         console.log(response); // Check the response in the console
//         const data = await response.json();
//         console.log(data); // Check the data in the console
//         displayImages(data.imageUrls);
//     } catch (error) {
//         console.error('Error fetching images:', error);
//     }
// }


// // Display images on the gallery page
// function displayImages(imageUrls) {
//     imageGallery.innerHTML = '';
//     imageUrls.forEach(imageUrl => {
//         const imgElement = document.createElement('img');
//         imgElement.src = imageUrl;
//         imgElement.classList.add('gallery-image');
//         imageGallery.appendChild(imgElement);
//     });
// }

// // Fetch and display images when the page loads
// fetchImages();

const galleryContainer = document.getElementById('gallery-container');
const timer = document.getElementById('timer');
let currentIndex = 0;
let fileUrls = []; // Initialize an empty array to store the file URLs


// +++++++++++++++++++++ WORK ++++++++++++++++++++
// // Fetch image and PDF URLs from the server
// async function fetchFiles() {
//     try {
//         const response = await fetch('http://localhost:3000/fetch-files');
//         const data = await response.json();
//         displayFiles(data.fileUrls);
//     } catch (error) {
//         console.error('Error fetching files:', error);
//     }
// }

// // Display both images and PDFs in the gallery
// function displayFiles(fileUrls) {
//     galleryContainer.innerHTML = '';

//     fileUrls.forEach(fileUrl => {
//         const fileExtension = fileUrl.split('.').pop().toLowerCase();

//         if (fileExtension === 'pdf') {
//             // Display PDF using an iframe
//             const iframeElement = document.createElement('iframe');
//             iframeElement.src = fileUrl;
//             iframeElement.classList.add('gallery-file');
//             galleryContainer.appendChild(iframeElement);
//         } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
//             // Display image using an img element
//             const imgElement = document.createElement('img');
//             imgElement.src = fileUrl;
//             imgElement.classList.add('gallery-image');
//             galleryContainer.appendChild(imgElement);
//         }
//     });
// }

// // Fetch and display files when the page loads
// fetchFiles();

// Fetch image and PDF URLs from the server
async function fetchFiles() {
    try {
        const response = await fetch('http://localhost:3000/fetch-files');
        const data = await response.json();
        fileUrls = data.fileUrls; // Store the retrieved file URLs
        displayNextFile();
    } catch (error) {
        console.error('Error fetching files:', error);
    }
}

// Display the next file in the gallery
function displayNextFile() {
    if (fileUrls.length === 0) {
        // No files to display
        return;
    }

    const fileUrl = fileUrls[currentIndex];
    const fileExtension = fileUrl.split('.').pop().toLowerCase();

    galleryContainer.innerHTML = ''; // Clear the container

    if (fileExtension === 'pdf') {
        // Display PDF using an iframe
        const iframeElement = document.createElement('iframe');
        iframeElement.src = fileUrl;
        iframeElement.classList.add('gallery-file');
        galleryContainer.appendChild(iframeElement);
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
        // Display image using an img element
        const imgElement = document.createElement('img');
        imgElement.src = fileUrl;
        imgElement.classList.add('gallery-image');
        galleryContainer.appendChild(imgElement);
    }

    // Update the timer
    timer.textContent = '7';
    let secondsRemaining = 7;

    // Start a countdown timer
    const countdownInterval = setInterval(() => {
        secondsRemaining--;
        timer.textContent = secondsRemaining;

        if (secondsRemaining === 0) {
            // Move to the next file when the timer reaches 0
            currentIndex = (currentIndex + 1) % fileUrls.length;
            displayNextFile();
            clearInterval(countdownInterval); // Stop the countdown
        }
    }, 1000);
}

// Fetch and display files when the page loads
fetchFiles();