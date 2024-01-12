import { Controller, Get, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsCountResponse, ReviewsResponse, ReviewQueryParams } from './reviews.types';

@Controller('reviews')
export class ReviewsController {
	constructor(private reviewsService: ReviewsService) {}

	@Get()
	async getAllReviews(@Query() queryParams: ReviewQueryParams): Promise<ReviewsResponse> {
		const currPage = parseInt(queryParams.page, 10) || 1;
		const amount = parseInt(queryParams.limit, 10) || 15;

		const reviews = await this.reviewsService.getAllReviews(currPage, amount);
		return { reviews };
	}

	@Get('/count')
	async getReviewsCount(): Promise<ReviewsCountResponse> {
		const reviewsCount = await this.reviewsService.getReviewsCount();
		return { reviewsCount };
	}
}
