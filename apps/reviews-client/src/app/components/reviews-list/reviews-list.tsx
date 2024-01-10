import List from '@mui/material/List';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ReviewExt } from '../../models/Reviews';
import ReviewsListItem from '../review-list-item/review-list-item';
import { Alert } from '@mui/material';

export function ReviewsList() {
	const [reviews, setReview] = useState<ReviewExt[]>([]);

	const fetchReviews = async (): Promise<void> => {
		try {
			const response = await axios.get('/api/reviews');
			setReview(response.data.reviews);
		} catch (e) {
			window.console.error('Error: ', e);
		}
	};

	useEffect(() => {
		fetchReviews();
	}, []);

	return (
		<List>
			{reviews.length ? (
				<>
					{reviews.map((review) => (
						<ReviewsListItem review={review}></ReviewsListItem>
					))}
				</>
			) : (
				<Alert severity="error">No reviews available</Alert>
			)}
		</List>
	);
}

export default ReviewsList;
