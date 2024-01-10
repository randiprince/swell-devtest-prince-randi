import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ReviewsService {
	constructor(private prisma: DatabaseService) {}

	getReviewsCount() {
		return this.prisma.review.count();
	}

	getAllReviews(page: number, limit: number) {
		return this.prisma.review.findMany({
			include: { company: true, user: true },
			orderBy: { createdOn: 'desc' },
			skip: page * limit - limit,
			take: limit,
		});
	}
}
