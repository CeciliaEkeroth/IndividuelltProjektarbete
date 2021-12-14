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
      showSchools.style.fontSize = "11px";
      showSchools.style.margin = "5px";
      showSchools.addEventListener("click", () => {
        infoContainer.innerHTML = "";
        let studentName = document.createElement("p");
        let studentAge = document.createElement("p");
        let studentHobbies = document.createElement("p");
        let studentProgramme = document.createElement("p");
        let fittingSchools = document.createElement("ul");
        infoContainer.style.border = "1px solid black";
        infoContainer.style.backgroundColor = "rgb(230, 230, 230)";

        let programmeOfStudent = student.programme;
        let studentHobby = student.hobbies;

        studentName.textContent = `Namn: ${student.firstName} ${student.lastName}`;
        studentAge.textContent = `Ålder: ${student.age}`;
        studentHobbies.textContent = `Hobbies: ${student.hobbies}`;
        studentProgramme.textContent = `Utbildning: ${student.programme}`;

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
            let fittingSchool = document.createElement("li");
            fittingSchool.textContent = `${school.name} har utbildningen ${student.firstName} söker! ${school.name} har även en eller flera aktiviteter som matchar ${student.firstName}s intressen!`;
            fittingSchool.style.color = "green";
            fittingSchools.prepend(fittingSchool);
          } else if (
            matchingProgrammes.length === 0 &&
            matchingHobbies.length === 0
          ) {
            let doesNotFit = document.createElement("li");
            doesNotFit.textContent = `${school.name} har varken utbildningen som ${student.firstName} söker eller någon aktivet som matchar ${student.firstName}s intressen`;
            doesNotFit.style.color = "red";
            fittingSchools.appendChild(doesNotFit);
          } else if (
            (matchingProgrammes.length > 0) &
            (!matchingHobbies.length > 0)
          ) {
            let yellowSchool = document.createElement("li");
            yellowSchool.textContent = `${school.name} har en utbildning som matchar det ${student.firstName} söker men inga aktiviter som matchar ${student.firstName}s intressen`;
            yellowSchool.style.color = "yellow";
            fittingSchools.appendChild(yellowSchool);
          } else {
            let doesNotFit = document.createElement("li");
            doesNotFit.textContent = `${school.name} har en aktivet som matchar ${student.firstName}s intressen men inte utbilningen som ${student.firstName} söker`;
            doesNotFit.style.color = "red";
            fittingSchools.appendChild(doesNotFit);
          }
        });
      });
    });
  };
  listFunction(students);

  let sort = document.querySelector("#sort");
  let order = document.querySelector("#order");
  let sortButton = document.querySelector("#sortButton");
  let studentList = document.querySelector("#students");

  sortButton.addEventListener("click", () => {
    infoContainer.style.border = "none";
    infoContainer.style.backgroundColor = "transparent";
    let orderValue = order.value;
    let sortValue = sort.value;
    studentList.innerHTML = "";
    infoContainer.innerHTML = "";
    if (sortValue === "firstName") {
      if (orderValue === "rising") {
        students.sort(function (a, b) {
          return a.firstName.localeCompare(b.firstName);
        });
        listFunction(students);
      } else {
        students.sort(function (a, b) {
          return b.firstName.localeCompare(a.firstName);
        });
        listFunction(students);
      }
    } else if (sortValue === "lastName") {
      if (orderValue === "rising") {
        students.sort(function (a, b) {
          return a.lastName.localeCompare(b.lastName);
        });
        listFunction(students);
      } else {
        students.sort(function (a, b) {
          return b.lastName.localeCompare(a.lastName);
        });
        listFunction(students);
      }
    } else if (sortValue === "age") {
      if (orderValue === "rising") {
        students.sort(function (a, b) {
          return parseFloat(a.age) - parseFloat(b.age);
        });
        listFunction(students);
      } else {
        students.sort(function (a, b) {
          return parseFloat(b.age) - parseFloat(a.age);
        });
        listFunction(students);
      }
    } else if (sortValue === "frontend") {
      let getFrontend = students.filter((student) => {
        if (student.programme === "Frontend") return student;
      });
      if (orderValue === "rising") {
        getFrontend.sort(function (a, b) {
          return a.firstName.localeCompare(b.firstName);
        });
        listFunction(getFrontend);
      } else {
        getFrontend.sort(function (a, b) {
          return b.firstName.localeCompare(a.firstName);
        });
        listFunction(getFrontend);
      }
    } else if (sortValue === "backend") {
      let getBackend = students.filter((student) => {
        if (student.programme === "Backend") return student;
      });
      if (orderValue === "rising") {
        getBackend.sort(function (a, b) {
          return a.firstName.localeCompare(b.firstName);
        });
        listFunction(getBackend);
      } else {
        getBackend.sort(function (a, b) {
          return b.firstName.localeCompare(a.firstName);
        });
        listFunction(getBackend);
      }
    } else if (sortValue === ".NET") {
      let getNet = students.filter((student) => {
        if (student.programme === ".NET") return student;
      });
      if (orderValue === "rising") {
        getNet.sort(function (a, b) {
          return a.firstName.localeCompare(b.firstName);
        });
        listFunction(getNet);
      } else {
        getNet.sort(function (a, b) {
          return b.firstName.localeCompare(a.firstName);
        });
        listFunction(getNet);
      }
    } else {
      listFunction(students);
    }
  });
  let searchBar = document.querySelector("#searchBar");
  let searchBtn = document.querySelector("#searchBtn");

  searchBtn.addEventListener("click", () => {
    studentList.innerHTML = "";
    infoContainer.innerHTML = "";
    infoContainer.style.border = "none";
    infoContainer.style.backgroundColor = "transparent";

    let searchValue = searchBar.value;
    let getStudent = students.filter((student) => {
      if (searchValue === student.firstName) return student;
    });
    listFunction(getStudent);
    let getLastname = students.filter((student) => {
      if (searchValue === student.lastName) {
        return student;
      }
    });
    listFunction(getLastname);
    let getProgramme = students.filter((student) => {
      if (searchValue === student.programme) {
        return student;
      }
    });
    listFunction(getProgramme);
    searchBar.value = "";
  });
}

renderData();
