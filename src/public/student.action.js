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

        async function editStudent(studentId) {
            // Switch to edit tab and populate with student data
            showTab('edit-student');
            console.log("This is stude id", studentId)

            // In a real application, you would fetch student data by ID
            // For demo purposes, we'll just show the edit form
            console.log('Editing student with ID:', studentId);
            
            // Update the active tab manually since we're not clicking the tab
            const navTabs = document.querySelectorAll('.nav-tab');
            navTabs.forEach(tab => tab.classList.remove('active'));
            navTabs[3].classList.add('active'); // Edit student tab


            try {
                const result = await fetch(`/getEdit/${studentId}`,{
                    method:"GET",
                    headers:{
                        "Content-Type": "application/json"
                    }
                })
                let res = await result.json()
                console.log("This is response",res.data)
                if(res){
                    document.getElementById("edit-student-name").value = res.data.name
                    document.getElementById("edit-roll-number").value = res.data.rollNumber
                    document.getElementById("edit-class1").value = res.data.StudentClass
                    document.getElementById("edit-gender").value = res.data.gender
                    document.getElementById("edit-phone").value = res.data.phoneNumber
                }
            } catch (error) {
                console.error("Something went wrong", error)
            }
        }

        