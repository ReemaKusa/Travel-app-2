//src\client\js\closeButton.js

export function closeButton() {

    // Reset scroll position for different browsers
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 

    const outputContainer = document.querySelector('.print-area');
    const buttonContainer = document.querySelector('.buttons');

    outputContainer.style.display = 'none';
    buttonContainer.style.display = 'none';

}
