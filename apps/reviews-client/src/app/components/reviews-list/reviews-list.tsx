import { useEffect } from 'react';
import ReviewsListItem from '../reviews-list-item/reviews-list-item';
import { Alert, Button, Grid, List, Typography } from '@mui/material';

// Hooks
import { useReviewsList } from '../../hooks/useReviewsList';

export function ReviewsList() {
	const { fetchReviews, handleNext, handlePrevious, limit, pageNumber, reviews, totalReviews } =
		useReviewsList();

	useEffect(() => {
		fetchReviews();
	}, [fetchReviews]);

	return (
		<div>
			{reviews.length ? (
				<>
					<Typography
						data-testid="review-count"
						display="block"
						textAlign="right"
						variant="caption"
					>{`Reviews ${pageNumber * limit - (limit - 1)} - ${
						limit * pageNumber <= totalReviews ? limit * pageNumber : totalReviews
					} of ${totalReviews}`}</Typography>
					<List data-testid="review-list">
						{reviews.map((review) => (
							<ReviewsListItem
								data-testid="review-list-item"
								key={review.id}
								review={review}
							></ReviewsListItem>
						))}
						<Grid
							sx={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								paddingTop: 1,
								paddingBottom: 1,
							}}
						>
							<Button
								data-testid="previous-btn"
								onClick={handlePrevious}
								disabled={pageNumber === 1}
							>
								Previous
							</Button>
							<Typography>{`${pageNumber} of ${Math.ceil(totalReviews / limit)}`}</Typography>
							<Button
								data-testid="next-btn"
								onClick={handleNext}
								disabled={pageNumber >= totalReviews / limit}
							>
								Next
							</Button>
						</Grid>
					</List>
				</>
			) : (
				<Alert severity="error">There are currently no reviews available.</Alert>
			)}
		</div>
	);
}

export default ReviewsList;
