const libraryData = {
    apex: {
        name: "Apex Library",
        capacity: 80,
        reservedSeats: [
            { seatNumber: 2, reservedBy: "other" },
            { seatNumber: 3, reservedBy: "other" },
            { seatNumber: 5, reservedBy: "other" },
            { seatNumber: 7, reservedBy: "other" },
            { seatNumber: 8, reservedBy: "other" },
            { seatNumber: 10, reservedBy: "other" }
        ],
    },
    esb: {
        name: "ESB Library",
        capacity: 60,
        reservedSeats: [
            { seatNumber: 1, reservedBy: "other" },
            { seatNumber: 4, reservedBy: "other" },
            { seatNumber: 6, reservedBy: "other" },
            { seatNumber: 9, reservedBy: "other" },
            { seatNumber: 12, reservedBy: "other" }
        ],
    },
    lhc: {
        name: "LHC Library",
        capacity: 100,
        reservedSeats: [
            { seatNumber: 15, reservedBy: "other" },
            { seatNumber: 16, reservedBy: "other" },
            { seatNumber: 18, reservedBy: "other" },
            { seatNumber: 22, reservedBy: "other" },
            { seatNumber: 25, reservedBy: "other" }
        ],
    }
};

let selectedSeat = null;

document.getElementById("librarySelect").addEventListener("change", function () {
    const library = this.value;
    if (library) {
        showLibraryDetails(library);
    }
});

function showLibraryDetails(library) {
    const libraryInfo = libraryData[library];
    const libraryDetailsSection = document.getElementById("libraryDetails");

    document.getElementById("libraryName").textContent = libraryInfo.name;
    document.getElementById("capacity").textContent = `Capacity: ${libraryInfo.capacity} seats`;
    document.getElementById("seatsReserved").textContent = `Reserved: ${libraryInfo.reservedSeats.length} seats`;

    const seatsLayout = document.getElementById("seatsLayout");
    seatsLayout.innerHTML = '';

    for (let i = 1; i <= libraryInfo.capacity; i++) {
        const seat = document.createElement("div");
        seat.classList.add("seat");
        seat.dataset.seatNumber = i;

        const seatNumber = document.createElement("span");
        seatNumber.textContent = i;
        seat.appendChild(seatNumber);

        const reservedSeatInfo = libraryInfo.reservedSeats.find(s => s.seatNumber === i);
        if (reservedSeatInfo) {
            seat.classList.add("reserved");
            if (reservedSeatInfo.reservedBy === "current-user") {
                seat.classList.add("my-reservation");
            }
        } else {
            seat.classList.add("vacant");
        }

        seat.addEventListener("click", () => selectSeat(seat, i));
        seatsLayout.appendChild(seat);
    }

    libraryDetailsSection.style.display = 'block';
}

function selectSeat(seat, seatNumber) {
    const library = document.getElementById("librarySelect").value;
    const reservedSeatInfo = libraryData[library].reservedSeats.find(s => s.seatNumber === seatNumber);

    if (selectedSeat) {
        selectedSeat.classList.remove("selected");
    }

    seat.classList.add("selected");
    selectedSeat = seat;

    const reserveButton = document.getElementById("reserveButton");
    const unreserveButton = document.getElementById("unreserveButton");

    if (reservedSeatInfo) {
        reserveButton.disabled = true;
        unreserveButton.disabled = reservedSeatInfo.reservedBy !== "current-user";
    } else {
        reserveButton.disabled = false;
        unreserveButton.disabled = true;
    }
}

function reserveSeat() {
    if (selectedSeat) {
        const seatNumber = parseInt(selectedSeat.dataset.seatNumber);
        const library = document.getElementById("librarySelect").value;

        selectedSeat.classList.remove("selected");
        selectedSeat.classList.add("reserved", "my-reservation");

        libraryData[library].reservedSeats.push({
            seatNumber: seatNumber,
            reservedBy: "current-user"
        });

        showCustomAlert(`You have successfully reserved seat number ${seatNumber}`, "Success");
        document.getElementById("reserveButton").disabled = true;
        document.getElementById("unreserveButton").disabled = false;
        document.getElementById("seatsReserved").textContent = `Reserved: ${libraryData[library].reservedSeats.length} seats`;
    }
}

function unreserveSeat() {
    if (selectedSeat) {
        const seatNumber = parseInt(selectedSeat.dataset.seatNumber);
        const library = document.getElementById("librarySelect").value;
        const seatIndex = libraryData[library].reservedSeats.findIndex(s =>
            s.seatNumber === seatNumber && s.reservedBy === "current-user"
        );

        if (seatIndex !== -1) {
            libraryData[library].reservedSeats.splice(seatIndex, 1);
            selectedSeat.classList.remove("selected", "reserved", "my-reservation");
            selectedSeat.classList.add("vacant");

            showCustomAlert(`Seat number ${seatNumber} has been unreserved`, "Success");
            document.getElementById("reserveButton").disabled = false;
            document.getElementById("unreserveButton").disabled = true;
            document.getElementById("seatsReserved").textContent = `Reserved: ${libraryData[library].reservedSeats.length} seats`;
            selectedSeat = null;
        }
    }
}

function showCustomAlert(message, title = "Notice") {
    const alertOverlay = document.getElementById('customAlert');
    const alertMessage = alertOverlay.querySelector('.alert-message');
    const alertTitle = document.getElementById('alertTitle');
    alertTitle.textContent = title;
    alertMessage.textContent = message;
    alertOverlay.classList.add('show');
}

function closeAlert() {
    const alertOverlay = document.getElementById('customAlert');
    alertOverlay.classList.remove('show');
}

// Close alert when clicking outside the alert box
document.querySelector('.alert-overlay').addEventListener('click', function (e) {
    if (e.target === this) {
        closeAlert();
    }
});
