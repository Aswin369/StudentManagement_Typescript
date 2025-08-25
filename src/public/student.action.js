function showTab(tabName) {
            // Hide all tab contents
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            // Remove active class from all nav tabs
            const navTabs = document.querySelectorAll('.nav-tab');
            navTabs.forEach(tab => {
                tab.classList.remove('active');
            });

            // Show selected tab content
            document.getElementById(tabName).classList.add('active');

            // Add active class to clicked nav tab
            event.target.classList.add('active');
        }

        function editStudent(studentId) {
            // Switch to edit tab and populate with student data
            showTab('edit-student');
            
            // In a real application, you would fetch student data by ID
            // For demo purposes, we'll just show the edit form
            console.log('Editing student with ID:', studentId);
            
            // Update the active tab manually since we're not clicking the tab
            const navTabs = document.querySelectorAll('.nav-tab');
            navTabs.forEach(tab => tab.classList.remove('active'));
            navTabs[3].classList.add('active'); // Edit student tab
        }

        // Add form submission handlers
        document.addEventListener('DOMContentLoaded', function() {
            // Add student form handler
            const addForm = document.querySelector('#add-student form');
            if (addForm) {
                addForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('Student added successfully! (This is a demo)');
                    addForm.reset();
                });
            }

            // Edit student form handler
            const editForm = document.querySelector('#edit-student form');
            if (editForm) {
                editForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('Student updated successfully! (This is a demo)');
                });
            }

            // Search functionality
            const searchInputs = document.querySelectorAll('.search-input');
            searchInputs.forEach(input => {
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        alert('Search functionality would be implemented here. Searching for: ' + e.target.value);
                    }
                });
            });

            // Delete button handlers
            const deleteButtons = document.querySelectorAll('.btn-danger');
            deleteButtons.forEach(button => {
                button.addEventListener('click', function() {
                    if (confirm('Are you sure you want to delete this student?')) {
                        alert('Student deleted successfully! (This is a demo)');
                        // In real app, remove the row and update database
                    }
                });
            });
        });