const movie = document.getElementById('movie');
const container = document.querySelector('.container');
// const seats = container.querySelectorAll('.seat');
const count = document.getElementById('count');
const total = document.getElementById('total');

let ticketPrice = +movie.value;

function updateNumbers() {

    const seats = container.querySelectorAll('.seat.selected');
    count.textContent = seats.length;
    total.textContent = seats.length * ticketPrice;

}

container.addEventListener('click', e => {

    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateNumbers();
    }

});

movie.addEventListener('change', e => {

    ticketPrice = +e.target.value;
    // let selectedSeats = container.querySelectorAll('.seat.selected');
    // selectedSeats.classList.remove('selected');
    updateNumbers();

});