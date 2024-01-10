import { Grid, ListItem, Rating, Typography } from '@mui/material';
import { ReviewExt } from '../../models/Reviews';
import { getDate } from '../../helpers/format';

export interface ReviewsListItemProps {
	review: ReviewExt;
}

export function ReviewsListItem({ review }: ReviewsListItemProps) {
	return (
		<ListItem
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
				p: 1.25,
				mb: '12px',
				boxShadow: '5px 2px 10px -2px rgba(225, 25, 121, 0.3)',
			}}
			id={review.id}
			key={review.id}
		>
			<Grid
				container
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Grid
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						gap: '10px',
					}}
				>
					<Typography variant="h3">{review.company.name}:</Typography>
					<Rating name="read-only" value={review.rating} readOnly />
				</Grid>
				<Grid item>
					<Typography display="block" variant="caption">
						{getDate(review.createdOn)}
					</Typography>
				</Grid>
			</Grid>

			{review.reviewText && (
				<Typography
					sx={{ display: 'block', pt: 1, pr: 1, pl: 1, fontStyle: 'italic' }}
					variant="body1"
					gutterBottom
				>
					"{review.reviewText}"
				</Typography>
			)}
			<Typography sx={{ display: 'block', pl: 0.25 }} variant="subtitle1">
				- {`${review.user.firstName} ${review.user.lastName}`}
			</Typography>
		</ListItem>
	);
}

export default ReviewsListItem;
