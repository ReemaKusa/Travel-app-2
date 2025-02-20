//src\client\js\printButton.js

export function printButton() {
    const printContent = document.querySelector('.print-area').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
}
