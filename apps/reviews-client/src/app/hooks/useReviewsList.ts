import axios from 'axios';
import { useState, useCallback } from 'react';
import { ReviewExt } from '../models/Reviews';
import { UseReviewsList } from '../models/ui/Reviews';

export function useReviewsList(): UseReviewsList {
	const [reviews, setReviews] = useState<ReviewExt[]>([]);
	const [totalReviews, setTotalReviews] = useState<number>(0);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const limit = 15;

	const fetchReviews = useCallback(async (): Promise<void> => {
		try {
			const response = await Promise.all([
				await axios.get(`/api/reviews?page=${pageNumber}&limit=${limit}`),
				await axios.get(`/api/reviews/count`),
			]);
			const data = response.map((res) => res.data);
			setReviews(data[0].reviews);
			setTotalReviews(data[1].reviewsCount);
		} catch {
			throw Error('Error fetching data!');
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

	return {
		fetchReviews,
		handleNext,
		handlePrevious,
		limit,
		pageNumber,
		reviews,
		totalReviews,
	};
}
