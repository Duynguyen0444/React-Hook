import React, { useState } from 'react';
import './Colorbox.scss';
// rsfp

function getRandomColor() {
	const COLOR_ARRAY = ['deeppink', 'green', 'yellow', 'lightblue', 'red'];
	const randomIndex = Math.trunc(Math.random() * 5);
	return COLOR_ARRAY[randomIndex];
}

function Colorbox() {
	// initialColor render once
	const [color, setColor] = useState(() => {
		const initialColor = localStorage.getItem('color_box') || 'green';
		console.log(initialColor);
		return initialColor;
	});

	function handleChangeColor() {
		const newColor = getRandomColor();
		setColor(newColor);

		localStorage.setItem('color_box', newColor);
	}
	return (
		<div className="color__box" style={{ backgroundColor: color }} onClick={handleChangeColor}>
			COLOR BOX
		</div>
	);
}

export default Colorbox;
