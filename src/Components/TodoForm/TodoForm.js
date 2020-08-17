import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
	onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
	onSubmit: null,
};

function TodoForm(props) {
	const { onSubmit } = props;
	const [value, setValue] = useState('');

	// ------------------------FUNCTION------------------------
	function handleValueChange(event) {
		console.log(event.target.value);
		setValue(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (!onSubmit) return;
		const formValues = {
			title: value,
		};

		onSubmit(formValues);
		// Reset form
		setValue('');
	}
	return (
		<form onSubmit={handleSubmit}>
			<input type="text" value={value} onChange={handleValueChange} placeholder="Type something" />
		</form>
	);
}

export default TodoForm;
