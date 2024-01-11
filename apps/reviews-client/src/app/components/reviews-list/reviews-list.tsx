import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { ReviewExt } from '../../models/Reviews';
import ReviewsListItem from '../review-list-item/review-list-item';
import { Alert, Button, Grid, List, Typography } from '@mui/material';

export function ReviewsList() {
	const [reviews, setReview] = useState<ReviewExt[]>([]);
	const [totalReviews, setTotalReviews] = useState<number>(0);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const limit = 15;

	const fetchReviews = useCallback(async (): Promise<void> => {
		try {
			const response = await Promise.all([
				axios.get(`/api/reviews?page=${pageNumber}&limit=${limit}`),
				axios.get(`/api/reviews/count`),
			]);
			const data = response.map((res) => res.data);
			setReview(data[0].reviews);
			setTotalReviews(data[1].reviewsCount);
		} catch (e) {
			window.console.error('Error: ', e);
		}
	}, [pageNumber]);

	const handleNext = (): void => {
		setPageNumber(pageNumber + 1);
		window.scroll(window.scrollX, 0);
	};

	const handlePrevious = (): void => {
		setPageNumber(pageNumber - 1);
		window.scroll(window.scrollX, 0);
	};

	useEffect(() => {
		fetchReviews();
	}, [fetchReviews]);

	return (
		<>
			<Typography display="block" textAlign="right" variant="caption">{`Reviews ${
				pageNumber * limit - (limit - 1)
			} - ${
				limit * pageNumber <= totalReviews ? limit * pageNumber : totalReviews
			} of ${totalReviews}`}</Typography>
			<List>
				{reviews.length ? (
					<>
						{reviews.map((review) => (
							<ReviewsListItem key={review.id} review={review}></ReviewsListItem>
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
							<Button onClick={handlePrevious} disabled={pageNumber === 1}>
								Previous
							</Button>
							<Typography>{`${pageNumber} of ${Math.ceil(totalReviews / limit)}`}</Typography>
							<Button onClick={handleNext} disabled={pageNumber >= totalReviews / limit}>
								Next
							</Button>
						</Grid>
					</>
				) : (
					<Alert severity="error">No reviews available</Alert>
				)}
			</List>
		</>
	);
}

export default ReviewsList;
