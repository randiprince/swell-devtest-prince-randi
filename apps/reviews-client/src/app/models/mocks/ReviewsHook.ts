import { UseReviewsList } from '../ui/Reviews';
import { useReviewsList } from '../../hooks/useReviewsList';

// put hook into testable jest function. values based on DummyReviews
export const mockUseReviews = jest.fn(
	(): UseReviewsList => ({
		fetchReviews: jest.fn(),
		handleNext: jest.fn(),
		handlePrevious: jest.fn(),
		limit: 15,
		pageNumber: 1,
		reviews: [],
		totalReviews: 4,
	}),
) as jest.MockedFunction<typeof useReviewsList>;

//mock reviewslist hook
jest.mock('../../hooks/useReviews', () => ({
	useReviewsList: mockUseReviews,
}));

//https://stackoverflow.com/questions/60270013/how-to-mock-react-custom-hook-returned-value
