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
		setSearchTerm(value);
		if (!onSubmit) return;

		// Clear settime before render
		// 1st render: set -- 100 -- clear, set -- 300 -- submit
		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current);
		}

		typingTimeoutRef.current = setTimeout(() => {
			const formValues = {
				searchTerm: value,
			};
			onSubmit(formValues);
		}, 300);
	}

	return (
		<form action="">
			<input type="text" value={searchTerm} onChange={handleSearchTermChange} />
		</form>
	);
}

export default PostFilterForm;
