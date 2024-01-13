import ReviewsListItem from './reviews-list-item';
import { DummyReviews } from '../../models/mocks/ReviewsData';
import { render } from '@testing-library/react';

describe('ReviewsListItem', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<ReviewsListItem review={DummyReviews[0]} />);
		expect(baseElement).toBeTruthy();
	});

	it('should render company name successfully', () => {
		const review = render(<ReviewsListItem review={DummyReviews[0]} />);
		expect(review.findByText(`${DummyReviews[0].company.name}`)).toBeDefined();
		expect(review.findByTestId('review-company')).toBeDefined();
	});

	it('should render review text if available successfully', () => {
		const review = render(<ReviewsListItem review={DummyReviews[0]} />);
		expect(review.findByText(`${DummyReviews[0].reviewText}`)).toBeDefined();
		expect(review.findByTestId('review-text')).toBeDefined();
	});

	it('should render user name successfully', () => {
		const review = render(<ReviewsListItem review={DummyReviews[0]} />);
		expect(review.findByText(`${DummyReviews[0].user.firstName}`)).toBeDefined();
		expect(review.findByText(`${DummyReviews[0].user.lastName}`)).toBeDefined();
		expect(review.findByTestId('reviewer-name')).toBeDefined();
	});

	it('should render rating successfully', () => {
		const review = render(<ReviewsListItem review={DummyReviews[0]} />);
		expect(review.findByTestId('review-rating')).toBeDefined();
	});

	it('should render date successfully', () => {
		const review = render(<ReviewsListItem review={DummyReviews[0]} />);
		expect(review.findByTestId('review-date')).toBeDefined();
	});
});
