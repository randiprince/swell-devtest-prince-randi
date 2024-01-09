import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ReviewsService {
	constructor(private prisma: DatabaseService) {}

	getReviewsCount() {
		return this.prisma.review.count();
	}

	getAllReviews() {
		return this.prisma.review.findMany({
			orderBy: { createdOn: 'desc' },
			include: { company: true, user: true },
		});
	}

	// getReviewsByCompany(companyId: string) {
	// 	return this.prisma.review.findMany({
	// 		orderBy: { createdOn: 'desc' },
	// 		include: { company: true, user: true },
	// 		where: {
	// 			companyId: {
	// 				equals: companyId,
	// 			},
	// 		},
	// 	});
	// }
}
