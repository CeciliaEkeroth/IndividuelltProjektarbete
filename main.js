let getData = async (URL) => {
  let response = await fetch(URL);
  let data = await response.json();
  return data;
};

async function renderData() {
  let students = await getData("https://api.mocki.io/v2/01047e91/students");
  let schools = await getData("https://api.mocki.io/v2/01047e91/schools");

  let infoContainer = document.querySelector("#studentInfo");

  let listFunction = (form) => {
    form.forEach((student) => {
      let li = document.createElement("li");
      li.textContent = student.firstName + " " + student.lastName;
      document.querySelector("#students").appendChild(li);
      let showSchools = document.createElement("button");
      showSchools.textContent = "Visa Skolor";
      li.appendChild(showSchools);
      showSchools.addEventListener("click", () => {
        infoContainer.innerHTML = "";
        let studentName = document.createElement("p");
        let studentAge = document.createElement("p");
        let studentHobbies = document.createElement("p");
        let studentProgramme = document.createElement("p");
        let fittingSchools = document.createElement("ul");

        let programmeOfStudent = student.programme;
        let studentHobby = student.hobbies;

        studentName.textContent = `namn: ${student.firstName} ${student.lastName}`;
        studentAge.textContent = `Ålder: ${student.age}`;
        studentHobbies.textContent = `Hobbies: ${student.hobbies}`;
        studentProgramme.textContent = `Program: ${student.programme}`;

        infoContainer.append(
          studentName,
          studentAge,
          studentHobbies,
          studentProgramme,
          fittingSchools
        );

        schools.forEach((school) => {
          let matchingHobbies = [];
          if (typeof school.activities === "object") {
            let schoolActivity = school.activities;
            studentHobby.forEach((hobbyOne) => {
              if (schoolActivity.includes(hobbyOne)) {
                matchingHobbies.push(hobbyOne);
              }
            });
          }

          let matchingProgrammes = [];
          let schoolProgramme = school.programmes;
          schoolProgramme.forEach((programme) => {
            if (programmeOfStudent.includes(programme)) {
              matchingProgrammes.push(programme);
            }
          });

          if (matchingHobbies.length > 0 && matchingProgrammes.length > 0) {
            let createSchool = document.createElement("li");
            createSchool.textContent = `${school.name} har både rätt program och en aktivit som matchar denna personens hobby`;
            fittingSchools.appendChild(createSchool);
          } else {
            let createSchool = document.createElement("li");
            createSchool.textContent = `${school.name} Passar inte denna person bra`;
            fittingSchools.appendChild(createSchool);
          }
        });
      });
    });
  };
  listFunction(students);

  let sort = document.querySelector("#sort");
  let sortButton = document.querySelector("#sortButton");
  let studentList = document.querySelector("#students");

  sortButton.addEventListener("click", () => {
    let sortValue = sort.value;
    studentList.innerHTML = "";
    infoContainer.innerHTML = "";
    if (sortValue === "firstName") {
      students.sort(function (a, b) {
        return a.firstName.localeCompare(b.firstName);
      });
      listFunction(students);
    } else if (sortValue === "lastName") {
      students.sort(function (a, b) {
        return a.lastName.localeCompare(b.lastName);
      });
      listFunction(students);
    } else if (sortValue === "age") {
      students.sort(function (a, b) {
        return parseFloat(a.age) - parseFloat(b.age);
      });
      listFunction(students);
    } else if (sortValue === "frontend") {
      let getFrontend = students.filter((student) => {
        if (student.programme === "Frontend") return student;
      });
      listFunction(getFrontend);
    } else if (sortValue === "backend") {
      let getBackend = students.filter((student) => {
        if (student.programme === "Backend") return student;
      });
      listFunction(getBackend);
    } else {
      let getNet = students.filter((student) => {
        if (student.programme === ".NET") return student;
      });
      listFunction(getNet);
    }
  });
}

renderData();
