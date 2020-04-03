'use strict';

let daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];
let yearNode = document.getElementById('year');
let currYear = yearNode.value || new Date().getFullYear();
let monthNode = document.getElementById('month');
let currMonth = monthNode.value || new Date().getMonth();


yearNode.value = currYear;
monthNode.value = months[currMonth];


createCalendar('JS-calendarDays', currYear, currMonth + 1, daysOfTheWeek);

['JS-monthControl--next', 'JS-monthControl--prev', 'JS-yearControl--prev', 'JS-yearControl--next'].forEach(elem => {
	document.getElementsByClassName(elem)[0].onclick = (e) => {
		e.preventDefault();

		let target = document.getElementsByClassName(elem)[0].getAttribute('data-storage');

		if (target == 'year') {
			changeCurrDate('year', elem);
		}
		else if (target == 'month') {
			changeCurrDate('month', elem);
		}

		createCalendar('JS-calendarDays', +yearNode.value, months.indexOf(monthNode.value) + 1, daysOfTheWeek);
	}
});


function createCalendar(id, year, month, weekDays) {
	let mon = month - 1;
	let date = new Date(year, mon);
	let html = '<tr>' + generateDaysOfTheWeek(weekDays) + '</tr><tr>';


	for (let i = 0; i < getWeekDay(date); i++) {
		html += '<td></td>';
	}

	html += generateCalendarDays(date, mon);


	if (getWeekDay(date) != 0) {
		for (let i = getWeekDay(date); i < 7; i++) {
			html += '<td></td>';
		}
	}

	document.getElementById(id).innerHTML = html;
}


function getWeekDay(date) {
	let day = date.getDay();


	if (day == 0) day = 7;

	return day - 1;
}


function generateDaysOfTheWeek(days) {
	days = days.map(d => '<th class="day-of-the-week">' + d.slice(0, 3) + '</th>').join('');

	return days;
}


function generateCalendarDays(date, month) {
	let html = '';

	while (date.getMonth() == month) {
		let dayWeekend = '<td class="day-of-the-month day-of-the-month--weekend" title="Weekend">' + date.getDate() + '</td>';
		let day = '<td class="day-of-the-month">' + date.getDate() + '</td>';


		if (new Date().getFullYear() == date.getFullYear() && new Date().getMonth() == date.getMonth() && new Date().getDate() == date.getDate()) {
			day = '<td class="day-of-the-month day-of-the-month--today" title="Today">' + date.getDate() + '</td>';
		}


		html += getWeekDay(date) % 7 == 6 || getWeekDay(date) % 7 == 5 ? dayWeekend : day;

	
		if (getWeekDay(date) % 7 == 6) html += '</tr><tr>';

		date.setDate(date.getDate() + 1);
	}

	return (html);
}


function changeCurrDate(id, elem) {
	let trigger = document.getElementsByClassName(elem)[0];
	let move = trigger.getAttribute('data-move'); // Coordinate a target of the trigger @id

	if (id == 'year' && move == 'increment' && +document.getElementById(id).value < 2500) {
		document.getElementById(id).value = incrementYear(id);
	}
	else if (id == 'year' && move == 'decrement' && +document.getElementById(id).value > 1970) {
		document.getElementById(id).value = decrementYear(id);
	}
	else if (id == 'month' && move == 'increment') {
		document.getElementById(id).value = nextMonth(id);
	}
	else if (id == 'month' && move == 'decrement') {
		document.getElementById(id).value = prevMonth(id);
	}

	function prevMonth(id) {
		let currNewMonth = document.getElementById(id).value;
		let prevNewMonth = months[months.indexOf(currNewMonth) - 1];

		if (months.indexOf(currNewMonth) <= 0) {
			document.getElementById('year').value = decrementYear('year');
			prevNewMonth = months[11];
		}

		return prevNewMonth;
	}

	function nextMonth(id) {
		let currNewMonth = document.getElementById(id).value;
		let nextNewMonth = months[months.indexOf(currNewMonth) + 1];

		if (months.indexOf(currNewMonth) >= months.length - 1) {
			document.getElementById('year').value = incrementYear('year');
			nextNewMonth = months[0];
		};

		return nextNewMonth;
	}

	function incrementYear(id) {
		return +document.getElementById(id).value + 1;
	}

	function decrementYear(id) {
		return +document.getElementById(id).value - 1;
	}
}

