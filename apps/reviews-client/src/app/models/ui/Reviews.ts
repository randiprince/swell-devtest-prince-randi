import { ReviewExt } from '../Reviews';

export interface UseReviewsList {
	fetchReviews: () => Promise<void>;
	handleNext: () => void;
	handlePrevious: () => void;
	limit: number;
	pageNumber: number;
	reviews: ReviewExt[];
	totalReviews: number;
}
