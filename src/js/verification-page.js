document.addEventListener('DOMContentLoaded', function() {
    const uploadBoxes = document.querySelectorAll('.upload-box');

    uploadBoxes.forEach(box => {
        const fileInput = box.querySelector('.file-input');

        // Handle click on upload box
        box.addEventListener('click', function(e) {
            // Prevent click if clicking on the file input itself
            if (e.target !== fileInput) {
                fileInput.click();
            }
        });

        // Handle file selection
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            if (file) {
                // Check file type
                const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
                if (!validTypes.includes(file.type)) {
                    alert('Please upload only JPG, PNG or PDF files');
                    fileInput.value = ''; // Clear the input
                    return;
                }

                // Check file size (max 5MB)
                const maxSize = 5 * 1024 * 1024; // 5MB in bytes
                if (file.size > maxSize) {
                    alert('File size should not exceed 5MB');
                    fileInput.value = ''; // Clear the input
                    return;
                }

                // Update UI to show selected file
                updateUploadBoxUI(box, file);
            }
        });

        // Handle drag and drop
        box.addEventListener('dragover', function(e) {
            e.preventDefault();
            box.classList.add('drag-over');
        });

        box.addEventListener('dragleave', function(e) {
            e.preventDefault();
            box.classList.remove('drag-over');
        });

        box.addEventListener('drop', function(e) {
            e.preventDefault();
            box.classList.remove('drag-over');
            
            const file = e.dataTransfer.files[0];
            if (file) {
                // Check file type
                const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
                if (!validTypes.includes(file.type)) {
                    alert('Please upload only JPG, PNG or PDF files');
                    return;
                }

                // Check file size (max 5MB)
                const maxSize = 5 * 1024 * 1024; // 5MB in bytes
                if (file.size > maxSize) {
                    alert('File size should not exceed 5MB');
                    return;
                }

                // Set the file to input and update UI
                fileInput.files = e.dataTransfer.files;
                updateUploadBoxUI(box, file);
            }
        });
    });

    // Function to update upload box UI
    function updateUploadBoxUI(box, file) {
        // Remove existing file display if any
        const existingFileDisplay = box.querySelector('.selected-file');
        if (existingFileDisplay) {
            existingFileDisplay.remove();
        }

        // Create new file display
        const fileDisplay = document.createElement('div');
        fileDisplay.className = 'selected-file';
        fileDisplay.innerHTML = `
            <i class="fas fa-file"></i>
            <span>${file.name}</span>
            <button class="remove-file">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add remove button functionality
        const removeButton = fileDisplay.querySelector('.remove-file');
        removeButton.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent upload box click
            const fileInput = box.querySelector('.file-input');
            fileInput.value = ''; // Clear the input
            fileDisplay.remove(); // Remove the display
            box.classList.remove('has-file');
        });

        // Add the file display to the upload box
        box.appendChild(fileDisplay);
        box.classList.add('has-file');
    }
});