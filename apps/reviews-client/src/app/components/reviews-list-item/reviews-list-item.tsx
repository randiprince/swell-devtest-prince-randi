import { Grid, ListItem, Rating, Typography } from '@mui/material';
import { ReviewExt } from '../../models/Reviews';
import { getDate } from '../../helpers/format';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export interface ReviewsListItemProps {
	review: ReviewExt;
}

const StyledRating = styled(Rating)({
	'& .MuiRating-iconFilled, .MuiRating-iconEmpty': {
		color: '#e11979',
	},
});

export function ReviewsListItem({ review }: ReviewsListItemProps) {
	return (
		<ListItem
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
				p: 1.5,
				mb: '16px',
				boxShadow: '3px 3px 10px -2px rgba(100, 108, 121, 0.4)', //rgba of theme grey 400
				borderRadius: '5px',
			}}
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
					<Typography data-testid="review-company" variant="h3">
						{review.company.name}:
					</Typography>
					<StyledRating
						data-testid="review-rating"
						readOnly
						name="review-rating"
						value={review.rating}
						precision={0.5}
						icon={<FavoriteIcon fontSize="medium" />}
						emptyIcon={<FavoriteBorderIcon fontSize="medium" />}
					/>
				</Grid>
				<Grid>
					<Typography data-testid="review-date" display="block" variant="caption">
						{getDate(review.createdOn)}
					</Typography>
				</Grid>
			</Grid>

			{review.reviewText && (
				<Typography
					data-testid="review-text"
					sx={{ display: 'block', pt: 1, pr: 1, pl: 1, fontStyle: 'italic' }}
					variant="body1"
					gutterBottom
				>
					"{review.reviewText}"
				</Typography>
			)}
			<Typography data-testid="reviewer-name" sx={{ display: 'block', pl: 0.25 }} variant="body1">
				- {`${review.user.firstName} ${review.user.lastName}`}
			</Typography>
		</ListItem>
	);
}

export default ReviewsListItem;
