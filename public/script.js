const edit = document.querySelector('#edit-button');
const prev = document.querySelector('#prev-button');
const next = document.querySelector('#next-button');
const insert = document.querySelector('#insert-button');
const form = document.querySelector('.form');
const deleteButton = document.querySelector('#delete-button');
const inputId = document.querySelector('input[name=id]');
const inputFirstName = document.querySelector('input[name=firstName]');
const inputSecondName = document.querySelector('input[name=secondName]');
const inputAge = document.querySelector('input[name=age]');
const inputSpeciality = document.querySelector('input[name=speciality]');



let counter = 0;

// Student information output function
const viewAllStudents = () => {
    fetch('http://localhost:8000/students')
        .then((res) => {
            if (res.ok) {
                res.json()
                    .then((data) => {
                        viewStudents(data, counter);

                    })

            } else {
                alert('Ошибочка!')
            }
        });
};



const viewStudents = function(data, counter) {
    for (let i = 0; i < data.length; i++) {
        document.body.insertAdjacentHTML(
            'beforeend',

            `<li class="student" id="${data[i].id}">
                <span>ID : ${data[i].id};</span>
                <span> First name: ${data[i].firstName};</span>
                <span> Second name: ${data[i].secondName};</span>
                <span> Age: ${data[i].age};</span>
                <span> Speciality: ${data[i].speciality};</span>
                
            </li>
            `
        );
    };
    inputId.value = data[counter].id;
    inputFirstName.value = data[counter].firstName;
    inputSecondName.value = data[counter].secondName;
    inputAge.value = data[counter].age;
    inputSpeciality.value = data[counter].speciality;


};

// Function to create a new student
const createStudent = function(student) {
    document.body.insertAdjacentHTML(
        'beforeend',

        `<li class="student" id="${student.id}">
            <span>ID : ${student.id};</span>
            <span> First name: ${student.firstName};</span>
            <span> Second name: ${student.secondName};</span>
            <span> Age: ${student.age};</span>
            <span> Speciality: ${student.speciality};</span>
            
        </li>`
    )

};

// The function of deleting from the database of the student with the entered id
const deleteStudent = function(student) {
    const id = student.id;
    document.getElementById(`${id}`).remove();
};

// The function of updating information about the student with the entered id
const editStudent = function(student) {
    deleteStudent(student);
    createStudent(student);

};


deleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const jsonData = {};
    for (const [key, value] of formData) {
        jsonData[key] = value;
    };
    const id = jsonData.id
    const url = `http://localhost:8000/students/${id}`
    fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then((res) => {
            if (res.ok) {
                res.json()
                    .then((data) => deleteStudent(data))

            } else {
                res.json()
                    .then((data) => alert(data.message))
            }
        });


});

insert.addEventListener('click', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const jsonData = {};
    for (const [key, value] of formData) {
        jsonData[key] = value;
    };
    fetch('http://localhost:8000/students', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then((res) => {
            if (res.ok) {
                res.json()
                    .then((data) => createStudent(data))

            } else {
                res.json()
                    .then((data) => alert(data.message))
            }
        });



});

edit.addEventListener('click', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const jsonData = {};
    for (const [key, value] of formData) {
        jsonData[key] = value;
    };
    fetch('http://localhost:8000/students', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then((res) => {
            if (res.ok) {
                res.json()
                    .then((data) => editStudent(data))

            } else {
                alert('Ошибка: пользователя с таким ID не существует')
            }
        });


});

prev.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/students')

    .then((res) => {
        if (res.ok) {
            res.json()
                .then((data) => {

                    if (counter == 0) {
                        alert('Студент первый в списке!')
                        return
                    }
                    counter--;
                    inputId.value = data[counter].id;
                    inputFirstName.value = data[counter].firstName;
                    inputSecondName.value = data[counter].secondName;
                    inputAge.value = data[counter].age;
                    inputSpeciality.value = data[counter].speciality;
                });
        } else {
            alert('Ошибочка!')
        }
    });
});


next.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/students')

    .then((res) => {
        if (res.ok) {
            res.json()
                .then((data) => {
                    if (counter == data.length - 1) {
                        alert('Студент последний в списке!')
                        return
                    }
                    counter++;
                    inputId.value = data[counter].id;
                    inputFirstName.value = data[counter].firstName;
                    inputSecondName.value = data[counter].secondName;
                    inputAge.value = data[counter].age;
                    inputSpeciality.value = data[counter].speciality;

                });

        } else {
            alert('Ошибочка!')
        }
    });
});

viewAllStudents();