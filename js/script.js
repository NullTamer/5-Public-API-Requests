// Fetch Data
fetch("https://randomuser.me/api/?results=12")
  .then((rawData) => rawData.json())
  .then((employee) => populateGallery(employee))
  .then(() => openModal())
  .then(() => closeModal())
  .catch((error) => console.log(error));

function populateGallery(employee) {
  //populates gallery with employee cards
  for (let i = 0; i < employee.results.length; i++) {
    let birthday = new Date(employee.results[i].dob.date);
    // Modal Overlay
    let modal = `<div class="modal-container" style="display: none;">
                        <div class="modal">
                            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                            <div class="modal-info-container">
                                <img class="modal-img" src="${
                                  employee.results[i].picture.large
                                }" alt="profile picture">
                                <h3 id="name" class="modal-name cap">${
                                  employee.results[i].name.first
                                } ${employee.results[i].name.last}</h3>
                                <p class="modal-text">${
                                  employee.results[i].email
                                }</p>
                                <p class="modal-text cap">${
                                  employee.results[i].location.city
                                }</p>
                                <hr>
                                <p class="modal-text">${
                                  employee.results[i].cell
                                }</p>
                                <p class="modal-text">${
                                  employee.results[i].location.street.number
                                } ${employee.results[i].location.street.name} ${
      employee.results[i].location.city
    } ${employee.results[i].location.state} ${
      employee.results[i].location.postcode
    }</p>
                                <p class="modal-text">Birthday: ${birthday.getMonth()}/${birthday.getDate()}/${birthday.getFullYear()}</p>
                            </div>
                        </div>`;
    // User Cards with Modal appended
    let card = `<div class="card">
                        <div class="card-img-container">
                            <img class="card-img" src="${employee.results[i].picture.large}" alt="profile picture">
                        </div>
                        <div class="card-info-container">
                            <h3 id="name" class="card-name cap">${employee.results[i].name.first} ${employee.results[i].name.last}</h3>
                            <p class="card-text">${employee.results[i].email}</p>
                            <p class="card-text cap">${employee.results[i].location.city}, ${employee.results[i].location.state}</p>
                        </div>
                        ${modal} 
                    </div>`;
    gallery.insertAdjacentHTML("beforeend", card); //append combined modal and card to gallery
  }
}

// Opens Modal
function openModal() {
  for (let i = 0; i < gallery.children.length; i++) {
    gallery.children[i].addEventListener("click", function () {
      gallery.children[i].querySelector(".modal-container").style.display =
        "block";
    });
  }
}

//Closes Modal
function closeModal() {
  gallery.addEventListener("click", (e) => {
    if (e.target.parentElement.className === "modal-close-btn") {
      e.target.closest(".modal-container").style.display = "none";
    }
  });
}
