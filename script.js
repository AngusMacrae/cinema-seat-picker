const movie = document.getElementById('movie');
const container = document.querySelector('.container');
const allSeats = container.querySelectorAll('.seat');
const count = document.getElementById('count');
const total = document.getElementById('total');

populateUI();
let ticketPrice = +movie.value;
updateNumbers();

function updateNumbers() {

    const selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatsIndex = [...selectedSeats].map(seat => [...allSeats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndex));

    count.textContent = selectedSeats.length;
    total.textContent = selectedSeats.length * ticketPrice;

}

function populateUI() {

    const storedMovieSelection = localStorage.getItem('movie');
    if (storedMovieSelection !== null) {
        movie.selectedIndex = storedMovieSelection;
    }
    localStorage.setItem('movie', movie.selectedIndex);
    updateSeatDisplay(movie.selectedIndex);

    const storedSeatSelection = JSON.parse(localStorage.getItem('selectedSeats'));
    if (storedSeatSelection !== null && storedSeatSelection.length > 0) {
        allSeats.forEach((seat, index) => {
            if (storedSeatSelection.indexOf(index) > -1 && !seat.classList.contains('occupied')) {
                seat.classList.add('selected');
            }
        });
    }

}

function updateSeatDisplay(movie) {

    let occupiedSeats = [];

    switch (movie) {
        case 0:
            occupiedSeats = [2, 13, 20, 21, 30, 34, 35];
            break;
        case 1:
            occupiedSeats = [12, 13, 24, 27, 28, 37];
            break;
        case 2:
            occupiedSeats = [15, 16, 17, 18, 26, 40];
            break;
        case 3:
            occupiedSeats = [3, 16, 20, 21, 22, 30];
            break;

    }

    allSeats.forEach((seat, index) => {

        seat.classList.remove('occupied');

        if (occupiedSeats.indexOf(index) > -1) {
            seat.classList.add('occupied');
            seat.classList.remove('selected');
        }

    });

}

container.addEventListener('click', e => {

    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateNumbers();
    }

});

movie.addEventListener('change', e => {

    ticketPrice = +e.target.value;
    localStorage.setItem('movie', e.target.selectedIndex);
    updateSeatDisplay(e.target.selectedIndex);
    // let selectedSeats = container.querySelectorAll('.seat.selected');
    // selectedSeats.classList.remove('selected');
    updateNumbers();

});