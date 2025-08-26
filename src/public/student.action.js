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
            // console.log("This is stude id", studentId)

            // In a real application, you would fetch student data by ID
            // For demo purposes, we'll just show the edit form
            // console.log('Editing student with ID:', studentId);
            
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
                // console.log("This is response",res.data)
                if(res){
                    document.getElementById("edit-student-name").value = res.data.name
                    document.getElementById("edit-roll-number").value = res.data.rollNumber
                    document.getElementById("edit-class1").value = res.data.StudentClass
                    document.getElementById("edit-gender").value = res.data.gender
                    document.getElementById("edit-phone").value = res.data.phoneNumber
                    document.getElementById("studentEditId").value = res.data._id
                }
            } catch (error) {
                console.error("Something went wrong", error)
            }
        }



     
        
         document.addEventListener("DOMContentLoaded",function(){
            const addSubmitButton = document.getElementById("add-student-form")
            addSubmitButton.addEventListener("submit", async(e)=>{
            e.preventDefault()
            console.log("sdfsdf")
            const formdata = new FormData(e.target)
            const students = Object.fromEntries(formdata)
            console.log("THisis sdfasjkdf", students.class)
            console.log("This is formadata",formdata)
            console.log("This is students",students)
            let arr = ["male", "female", "other"]
            if(!students.studentname || students.studentname.length < 3){
                return Swal.fire("Validation Error", "Name must be at least 3 character")
            }

            if(isNaN(students.rollnumber) || Number(students.rollnumber).length <= 0){
                cosnole.log("This is rolllernumber issu")
                return Swal.fire("Validation Error", "Rollnumber cannot be empty or Zero or less than zero","error")
            }

            if(!students.classes){
                return Swal.fire("Validation Error", "Please provide you class","error")
            }

              if(!arr.includes(students.gender)){
                console.log("This calss error")
                return Swal.fire("Validation error","Please provide a your class", "error")
            }

            if(!/^\d{10}$/.test(students.phonenumber)){
                return Swal.fire("Validation Error", "Please  number must be 10 digits","error")
            }
          

            
            console.log(students)
            try {
                let res = await fetch("/addstudent",{
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({students})
                })
                console.log("This is res succ",res)
                if(res.ok){
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: res.message,
                        confirmButtonText: "OK"
                    }).then((result) => {
                        console.log(result)
                        if (result.isConfirmed) {

                        window.location.reload();
                     }
                });
                    // location.reload()
                }else{
                    Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to add student. Please try again!",
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Server Error",
                    text: "Something went wrong!",
                });
            }
         })
        })


        const editForm = document.getElementById("edit-form")
         editForm.addEventListener("submit",async (e)=>{
            e.preventDefault(e)
            const formData = new FormData(e.target)
            const studentUpdated = Object.fromEntries(formData)
            // console.log("student updated code",studentUpdated)
            let studentId = document.getElementById("studentEditId").value;
            console.log("THis is studen tid ", studentId)
            let arr = ["male", "female", "other"]
            if(!studentUpdated.editedName || studentUpdated.editedName.length < 3){
                return Swal.fire("Validation Error", "Name must be at least 3 character")
            }

            if(isNaN(studentUpdated.editedRollNumber) || Number(studentUpdated.editedRollNumber).length <= 0){
                // cosnole.log("This is rolllernumber issu")
                return Swal.fire("Validation Error", "Rollnumber cannot be empty or Zero or less than zero","error")
            }

            if(!studentUpdated.editedClass){
                return Swal.fire("Validation Error", "Please provide you class","error")
            }

              if(!arr.includes(studentUpdated.editedGender)){
                // console.log("This calss error")
                return Swal.fire("Validation error","Please provide a your class", "error")
            }

            if(!/^\d{10}$/.test(studentUpdated.editedPhoneNumber)){
                return Swal.fire("Validation Error", "Please  number must be 10 digits","error")
            }

            try {
                const result = await fetch("/editFrom",{
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({studentUpdated, studentId})
                })
                // console.log("this is result",result.status)
                if(result.status===200){
                    console.log("Data updated")
                     Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: result.message,
                        confirmButtonText: "OK"
                    }).then((result) => {
                        console.log(result)
                        if (result.isConfirmed) {

                        window.location.reload();
                     }
                });
                }
            } catch (error) {
                console.error("This is error", error)
                Swal.fire({
                    icon: "error",
                    title: "Server Error",
                    text: "Something went wrong!",
                });
                 
            }

         })

         async function deleteStudent(studentId) {
                Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async(swalResult)=>{
                if (!swalResult.isConfirmed) return;
                try {
                    let result = await fetch(`/deleteStudent/${studentId}`,{
                        method:"DELETE",
                        headers:{
                            "Content-Type":"application/json"
                        }
                    })
                    let data = await result.json();
                    console.log("asdf",data)
                    if(data.success){
                        Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text:  data.message,
                        confirmButtonText: "OK"
                    }).then((res) => {
                        console.log(result)
                        if (res.isConfirmed) {

                        window.location.reload();
                     }
                    });
                    }
                } catch (error) {
                    console.log("Erorr from student delete",error)
                }
            })
           
         } 