document.addEventListener('DOMContentLoaded', () => {
    const profileUpload = document.getElementById('profile-upload');
    const profilePreview = document.getElementById('profile-preview');
    const form = document.querySelector('.profile-setup-form');
    const verifyButtons = document.querySelectorAll('.verify-btn');

    // Only run profile upload logic if elements exist
    if (profileUpload && profilePreview) {
        profileUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profilePreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Only run verification buttons logic if buttons exist
    if (verifyButtons.length > 0) {
        verifyButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                const inputGroup = button.closest('.form-group');
                const input = inputGroup?.querySelector('input');
                const status = inputGroup?.querySelector('.verification-status');
                
                if (!inputGroup || !status) return;
                
                button.disabled = true;
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';

                try {
                    // Simulate verification API call
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    status.innerHTML = '<i class="fas fa-check-circle"></i> Verified';
                    status.classList.remove('unverified');
                    status.classList.add('verified');
                    button.innerHTML = '<i class="fas fa-check"></i> Verified';
                    button.style.background = 'var(--success-color, #27ae60)';
                } catch (error) {
                    button.disabled = false;
                    button.innerHTML = '<i class="fas fa-exclamation-circle"></i> Retry';
                }
            });
        });
    }

    // Only run form submission logic if form exists
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('.save-profile-btn');
            
            if (!submitBtn) return;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Profile Saved!';
                submitBtn.style.background = 'var(--success-color, #27ae60)';
                
                // Redirect to profile page after successful save
                setTimeout(() => {
                    window.location.href = '/profile';
                }, 1000);
            } catch (error) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Save Profile';
            }
        });
    }
});