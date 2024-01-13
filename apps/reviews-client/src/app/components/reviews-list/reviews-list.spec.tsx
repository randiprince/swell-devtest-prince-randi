import { render, screen, waitFor } from '@testing-library/react';
import ReviewsList from './reviews-list';
import { DummyReviews } from '../../models/mocks/ReviewsData';
import { mockUseReviews } from '../../models/mocks/ReviewsHook';

describe('ReviewsList', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<ReviewsList />);
		expect(baseElement).toBeTruthy();
	});

	it('should render list of reviews', () => {
		mockUseReviews.mockImplementation(() => ({
			reviews: DummyReviews,
			limit: 15,
			pageNumber: 1,
			totalReviews: DummyReviews.length,
			handleNext: jest.fn(),
			handlePrevious: jest.fn(),
			fetchReviews: jest.fn(),
		}));
		const reviewList = render(<ReviewsList />);

		waitFor(async () =>
			expect((await reviewList.findByTestId('review-list')).children.length).toBe(
				DummyReviews.length,
			),
		);
	});

	it('should display message if no reviews are found', () => {
		render(<ReviewsList />);
		expect(screen.getByText('There are currently no reviews available.')).toBeDefined();
	});

	it('should render review count successfully', () => {
		const reviewList = render(<ReviewsList />);
		expect(reviewList.findByTestId('review-count')).toBeDefined();
	});

	it('should render previous page btn successfully', () => {
		const reviewList = render(<ReviewsList />);
		expect(reviewList.findByTestId('previous-btn')).toBeDefined();
	});

	it('should render next page btn successfully', () => {
		const reviewList = render(<ReviewsList />);
		expect(reviewList.findByTestId('next-btn')).toBeDefined();
	});

	it('should expect previous btn to be disabled on initial load', () => {
		const reviewList = render(<ReviewsList />);
		waitFor(() => expect(reviewList.findByTestId('previous-btn')).toBeDisabled());
	});
});
