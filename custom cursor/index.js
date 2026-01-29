document.addEventListener('DOMContentLoaded', function() {
            // Cursor elements
            const cursor = document.querySelector('.cursor');
            const follower = document.querySelector('.cursor-follower');
            
            // Control elements
            const sizeSlider = document.getElementById('size');
            const sizeValue = document.getElementById('size-value');
            const followerSizeSlider = document.getElementById('follower-size');
            const followerSizeValue = document.getElementById('follower-size-value');
            const speedSlider = document.getElementById('speed');
            const speedValue = document.getElementById('speed-value');
            const trailCheckbox = document.getElementById('trail');
            const clickCheckbox = document.getElementById('click-effect');
            const hoverCheckbox = document.getElementById('hover-effect');
            
            // Cursor position
            let mouseX = 0;
            let mouseY = 0;
            let followerX = 0;
            let followerY = 0;
            
            // Trail elements array
            let trailElements = [];
            const trailCount = 10;
            
            // Initialize trail elements
            function initTrail() {
                for (let i = 0; i < trailCount; i++) {
                    const trail = document.createElement('div');
                    trail.className = 'cursor-trail';
                    trail.style.opacity = 0;
                    document.body.appendChild(trail);
                    trailElements.push({
                        element: trail,
                        x: 0,
                        y: 0,
                        opacity: 0
                    });
                }
            }
            
            // Update cursor position
            function updateCursorPosition(e) {
                mouseX = e.clientX;
                mouseY = e.clientY;
                
                // Move the main cursor
                cursor.style.left = mouseX + 'px';
                cursor.style.top = mouseY + 'px';
            }
            
            // Update follower position with smooth animation
            function updateFollowerPosition() {
                // Calculate speed based on slider value (inverse relationship)
                const speed = 11 - speedSlider.value; // Range: 1-10, but we want 0.1-1.0
                const speedFactor = speed / 100; // Convert to factor
                
                // Smooth follower movement
                followerX += (mouseX - followerX - parseInt(follower.style.width) / 2) * speedFactor;
                followerY += (mouseY - followerY - parseInt(follower.style.height) / 2) * speedFactor;
                
                follower.style.left = followerX + 'px';
                follower.style.top = followerY + 'px';
                
                // Update trail if enabled
                if (trailCheckbox.checked) {
                    updateTrail();
                }
                
                // Continue animation
                requestAnimationFrame(updateFollowerPosition);
            }
            
            // Update trail effect
            function updateTrail() {
                // Move each trail element to the position of the previous one
                for (let i = trailCount - 1; i > 0; i--) {
                    trailElements[i].x = trailElements[i-1].x;
                    trailElements[i].y = trailElements[i-1].y;
                    trailElements[i].opacity = trailElements[i-1].opacity * 0.8;
                    
                    const trail = trailElements[i].element;
                    trail.style.left = trailElements[i].x + 'px';
                    trail.style.top = trailElements[i].y + 'px';
                    trail.style.opacity = trailElements[i].opacity;
                }
                
                // First trail element follows cursor
                trailElements[0].x = mouseX - 3;
                trailElements[0].y = mouseY - 3;
                trailElements[0].opacity = 0.7;
                
                const firstTrail = trailElements[0].element;
                firstTrail.style.left = trailElements[0].x + 'px';
                firstTrail.style.top = trailElements[0].y + 'px';
                firstTrail.style.opacity = trailElements[0].opacity;
            }
            
            // Handle click effect
            function handleClick() {
                if (!clickCheckbox.checked) return;
                
                cursor.classList.add('click');
                follower.classList.add('click');
                
                setTimeout(() => {
                    cursor.classList.remove('click');
                    follower.classList.remove('click');
                }, 300);
            }
            
            // Handle hover effects
            function handleHoverStart() {
                if (!hoverCheckbox.checked) return;
                
                cursor.classList.add('hover');
                follower.classList.add('hover');
            }
            
            function handleHoverEnd() {
                cursor.classList.remove('hover');
                follower.classList.remove('hover');
            }
            
            // Update cursor size from slider
            function updateCursorSize() {
                const size = sizeSlider.value;
                cursor.style.width = size + 'px';
                cursor.style.height = size + 'px';
                sizeValue.textContent = size + 'px';
            }
            
            // Update follower size from slider
            function updateFollowerSize() {
                const size = followerSizeSlider.value;
                follower.style.width = size + 'px';
                follower.style.height = size + 'px';
                followerSizeValue.textContent = size + 'px';
            }
            
            // Update speed value display
            function updateSpeedValue() {
                const speed = (11 - speedSlider.value) / 10; // Convert to 0.1-1.0 range
                speedValue.textContent = speed.toFixed(1);
            }
            
            // Initialize everything
            function init() {
                // Set initial sizes
                updateCursorSize();
                updateFollowerSize();
                updateSpeedValue();
                
                // Create trail elements
                initTrail();
                
                // Event listeners for mouse movement
                document.addEventListener('mousemove', updateCursorPosition);
                
                // Event listeners for click
                document.addEventListener('click', handleClick);
                
                // Event listeners for hover effects
                const hoverElements = document.querySelectorAll('.btn, .text-link, .demo-card');
                hoverElements.forEach(el => {
                    el.addEventListener('mouseenter', handleHoverStart);
                    el.addEventListener('mouseleave', handleHoverEnd);
                });
                
                // Event listeners for controls
                sizeSlider.addEventListener('input', updateCursorSize);
                followerSizeSlider.addEventListener('input', updateFollowerSize);
                speedSlider.addEventListener('input', updateSpeedValue);
                
                // Start follower animation
                updateFollowerPosition();
                
                // Handle touch devices - disable custom cursor
                if ('ontouchstart' in window || navigator.maxTouchPoints) {
                    cursor.style.display = 'none';
                    follower.style.display = 'none';
                    document.querySelectorAll('.cursor-trail').forEach(el => el.style.display = 'none');
                    
                    // Show message for touch devices
                    const message = document.createElement('div');
                    message.style.cssText = `
                        background: rgba(0, 0, 0, 0.8);
                        color: white;
                        padding: 15px;
                        border-radius: 10px;
                        text-align: center;
                        margin: 20px auto;
                        max-width: 500px;
                    `;
                    message.innerHTML = '<strong>Note:</strong> Custom cursor is disabled on touch devices. Try on a desktop for full experience.';
                    document.querySelector('.controls').after(message);
                }
            }
            
            // Start the application
            init();
        });