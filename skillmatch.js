// Elements
const skillsDropdown = document.getElementById('skills-dropdown');
const skillsButton = document.getElementById('skills-button');
const skillsOptions = document.getElementById('skills-options');
const dropdownTick = document.getElementById('dropdown-tick');
const displayArea = document.getElementById('display-area');
const submitButton = document.getElementById('submit');
const doneButton = document.getElementById('done-btn');

let selectedSkills = [];
let matchingStudents = [];
let currentStudentIndex = 0;

// Toggle dropdown
skillsButton.addEventListener('click', () => {
    skillsOptions.style.display =
        skillsOptions.style.display === 'block' ? 'none' : 'block';
});

// Close dropdown and update button text
dropdownTick.addEventListener('click', () => {
    selectedSkills = Array.from(
        skillsOptions.querySelectorAll('input:checked')
    ).map((checkbox) => checkbox.value);
    skillsButton.textContent = selectedSkills.length
        ? 'Skills Selected'
        : 'Select Skills';
    skillsOptions.style.display = 'none';
});

// Render student card
function renderStudent(student) {
    if (!student) {
        displayArea.innerHTML = '<p>No more students match the criteria.</p>';
        return;
    }

    displayArea.innerHTML = `
        <div class="student-card">
            <img src="https://via.placeholder.com/100" alt="Student Image">
            <h3>${student.name}</h3>
            <p>USN: ${student.usn}</p>
            <p>Skills: ${student.skills.join(', ')}</p>
            <p>Phone: ${student.phone}</p>
            <p>Match Percentage: ${student.matchPercentage}%</p>
            <div class="button-container">
                <button class="cross-btn">✖</button>
                <button class="tick-btn">✔</button>
            </div>
        </div>
    `;

    // Attach button handlers
    const tickButton = document.querySelector('.tick-btn');
    const crossButton = document.querySelector('.cross-btn');

    tickButton.addEventListener('click', () => handleStudentSelection(true));
    crossButton.addEventListener('click', () => handleStudentSelection(false));
}

// Handle student selection
function handleStudentSelection(isSelected) {
    if (isSelected) {
        console.log(`Student Selected: ${matchingStudents[currentStudentIndex].name}`);
    } else {
        console.log(`Student Rejected: ${matchingStudents[currentStudentIndex].name}`);
    }
    currentStudentIndex++;
    renderStudent(matchingStudents[currentStudentIndex]);
}

// Submit functionality
submitButton.addEventListener('click', () => {
    console.log('Selected Skills:', selectedSkills);

    // Mock data for demonstration
    matchingStudents = [
        {
            name: 'John Doe',
            usn: '1',
            skills: ['Skill 1', 'Skill 2'],
            phone: '1234567890',
            matchPercentage: 80,
        },
        {
            name: 'Jane Smith',
            usn: '2',
            skills: ['Skill 2', 'Skill 3'],
            phone: '0987654321',
            matchPercentage: 90,
        },
    ].filter((student) =>
        student.skills.some((skill) => selectedSkills.includes(skill))
    );

    currentStudentIndex = 0;
    renderStudent(matchingStudents[currentStudentIndex]);
});

// Done functionality
doneButton.addEventListener('click', () => {
    alert('Process Completed!');
});
