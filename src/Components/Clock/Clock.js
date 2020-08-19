import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

Clock.propTypes = {};

function formatDate(date) {
	const hours = `0${date.getHours()}`.slice(-2);
	const minutes = `0${date.getMinutes()}`.slice(-2);
	const seconds = `0${date.getSeconds()}`.slice(-2);

	return `${hours} : ${minutes} : ${seconds}`;
}

function Clock(props) {
	const [timeString, setTimeString] = useState('');

	useEffect(() => {
		const clockInterval = setInterval(() => {
			// 1. Create new date
			const date = new Date();
			// 2. Format date object to string time: HH : MM : SS
			const newTimeString = formatDate(date);

			setTimeString(newTimeString);
		}, 1000);

		// Tránh việc khi component Clock unmouted nhưng vẫn còn setTime
		return () => {
			console.log('Clock is cleanup');
			clearInterval(clockInterval);
		};
	}, []);

	return <h2> {timeString} </h2>;
}

export default Clock;
