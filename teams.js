
/***** Data *****/

const teams = [];

/***** Event Listeners *****/

function onAddTeam() {
    const newTeam = {
        name: document.getElementById("team-name-input").value,
        members: []
    }
    teams.push(newTeam);
    renderApp();
}

function onDeleteTeam(team) {
    const index = teams.indexOf(team);
    teams.splice(index, 1);
    renderApp();
}

function onAddMember(team, member) {
    team.members.push(member);
    renderApp();
}

function onDeleteMember(team, member) {
    let index = team.members.indexOf(member);
    team.members.splice(index, 1);
    renderApp();
}

/***** Render Functions *****/

function renderApp() {
    const teamsDiv = document.getElementById("teams");
    emptyElement(teamsDiv);
    for(let team of teams) {
        teamsDiv.appendChild( renderTeam(team) );
    }
}

function renderTeam(team) {
    const teamDiv = document.createElement("div");
    teamDiv.className = "mt-3";

    // Name Heading
    const nameHeading = document.createElement("h2");
    nameHeading.textContent = team.name;
    teamDiv.appendChild(nameHeading);

    // Name Heading -> Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Team";
    deleteButton.className = "btn btn-danger ms-2";
    deleteButton.addEventListener("click", () => onDeleteTeam(team));
    nameHeading.appendChild(deleteButton);

    // Members Table
    teamDiv.appendChild( renderMembersTable(team) );

    return teamDiv;
}

function renderMembersTable(team) {
    const teamTable = document.createElement("table");
    teamTable.className = "table table-dark table-striped";

    // Header Row
    const headerRow = teamTable.insertRow(0);

    // Header Row -> Name Label Cell
    const nameLabelCell = document.createElement("th");
    nameLabelCell.textContent = "Name"
    headerRow.appendChild(nameLabelCell);

    // Header Row -> Position Label Cell
    const positionLabelCell = document.createElement("th");
    positionLabelCell.textContent = "Position"
    headerRow.appendChild(positionLabelCell);

    // Header Row -> Create Label Cell (empty placeholder)
    const createLabelCell = document.createElement("th");
    headerRow.appendChild(createLabelCell);

    // Form Row
    const formRow = teamTable.insertRow(1);

    // Form Row -> Name Input Cell
    const nameInputCell = document.createElement('td');
    formRow.appendChild(nameInputCell);

    // Form Row -> Name Input Cell -> Name Input
    const nameInput = document.createElement('input');
    nameInput.type = "text";
    nameInput.className = "form-control";
    nameInputCell.appendChild(nameInput);

    // Form Row -> Position Input Cell
    const positionInputCell = document.createElement('td');
    formRow.appendChild(positionInputCell)

    //Form Row -> Position Input Cell -> Position Input
    const positionInput = document.createElement('input');
    positionInput.type = "text";
    positionInput.className = "form-control";
    positionInputCell.appendChild(positionInput);

    // Form Row -> Create Button Cell
    let createButtonCell = document.createElement('td');
    formRow.appendChild(createButtonCell);

    // Form Row -> Create Button Cell -> Create Button
    const createButton = document.createElement("button");
    createButton.className = "btn btn-primary";
    createButton.textContent = "Create";
    createButton.addEventListener("click", () => {
        const member = {
            name: nameInput.value,
            position: positionInput.value
        }
        onAddMember(team, member)
    })
    createButtonCell.appendChild(createButton);

    // Member Rows
    for(let member of team.members) {
        teamTable.firstElementChild.appendChild( renderMemberRow(team, member) ) // firstElementChild is grabbing the <tbody>
    }

    return teamTable;
}

function renderMemberRow(team, member) {
    const memberRow = document.createElement("tr");

    // Data Cells
    memberRow.insertCell(0).textContent = member.name;
    memberRow.insertCell(1).textContent = member.position;

    // Delete Cell
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-primary";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => 
        onDeleteMember(team, member)
    );
    memberRow.insertCell(2).appendChild(deleteButton)

    return memberRow;
}

/***** Helpers *****/

function emptyElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}