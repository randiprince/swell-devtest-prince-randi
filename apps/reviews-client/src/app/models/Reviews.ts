import { Company } from './Company';
import { User } from './User';

export interface Review {
	id: string;
	reviewerId: string;
	companyId: string;
	reviewText: string;
	rating: number;
	createdOn: string;
}

export interface ReviewExt extends Review {
	company: Company;
	user: User;
}
