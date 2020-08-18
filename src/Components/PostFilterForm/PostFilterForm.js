import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

PostFilterForm.propTypes = {
	onSubmit: PropTypes.func,
};

PostFilterForm.defaultProps = {
	onSubmit: null,
};

function PostFilterForm(props) {
	const { onSubmit } = props;
	const [searchTerm, setSearchTerm] = useState('');
	const typingTimeoutRef = useRef(null); // Create object that its not change everytime render

	function handleSearchTermChange(event) {
		const value = event.target.value;

		// 1. Change value tag input & check !onSubmit props
		setSearchTerm(value);
		if (!onSubmit) return;

		// 2. Clear item at 1st render
		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current);
		}

		// 3. After 300ms and stop typing => filter item
		typingTimeoutRef.current = setTimeout(() => {
			const formValues = {
				searchTerm: value,
			};
			onSubmit(formValues);
		}, 300);
	}

	return (
		<form action="">
			<input type="text" value={searchTerm} onChange={handleSearchTermChange} placeholder="Search" />
		</form>
	);
}

export default PostFilterForm;
