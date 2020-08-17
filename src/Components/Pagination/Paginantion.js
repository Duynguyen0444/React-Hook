import React from 'react';
import PropTypes from 'prop-types';

Paginantion.propTypes = {
	pagination: PropTypes.object.isRequired,
	onPageChange: PropTypes.func,
};

Paginantion.defaultProps = {
	onPageChange: null,
};

function Paginantion(props) {
	const { pagination, onPageChange } = props;
	const { _page, _limit, _totalRows } = pagination;
	//Tổng trang / số lượng item mỗi trang
	const totalPage = Math.ceil(_totalRows / _limit);

	function handlePageChange(newPage) {
		if (onPageChange) {
			onPageChange(newPage);
		}		
	}

	return (
		<div>
			<button disabled={_page <= 1} onClick={() => handlePageChange(_page - 1)}>
				Previous
			</button>
			<button disabled={_page >= totalPage} onClick={() => handlePageChange(_page + 1)}>
				Next
			</button>
		</div>
	);
}

export default Paginantion;
