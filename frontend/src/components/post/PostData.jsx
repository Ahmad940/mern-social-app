import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import _ from 'lodash';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CommentsData from './CommentData';
import NewComment from './newComment';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import Cookie from 'js-cookie';
import { useDispatch } from 'react-redux';
import { LikePostActionThunk } from '../../redux/ducks/postsDuck';
import { Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    marginBottom: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    // transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  titleLink: {
    cursor: 'pointer',
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -5,
    top: -7,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const PostData = ({ post }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();

  const token = Cookie.get('token');
  const userCookie = Cookie.get('userInfo');
  let userInfo;
  if (token) {
    userInfo = userCookie ? JSON.parse(userCookie) : '';
  }

  const userId = userInfo ? userInfo._id : '';
  const isLiked = post.likes.includes(userId);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const postsData = (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            {_.startCase(post.userName[0])}
          </Avatar>
        }
        action={
          <Tooltip title='Options'>
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        }
        title={
          <Link
            className={classes.titleLink}
            component={RouterLink}
            to={'/profile/' + post.author}
          >
            {_.startCase(post.userName)}
          </Link>
        }
        subheader={moment(post.createdAt).fromNow()}
      />
      {/* <CardMedia
          className={classes.media}
          image='/static/images/cards/paella.jpg'
          title='Paella dish'
        /> */}
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {post.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div></div>
        <Tooltip title={isLiked ? 'Dislike' : 'Like'}>
          <IconButton
            aria-label='like post'
            onClick={() => {
              if (!token) {
                alert('You must login to like a post');
              }
              dispatch(LikePostActionThunk(post._id));
            }}
          >
            <StyledBadge
              badgeContent={post.likes.length}
              // badgeContent={2000}
              color='secondary'
              max={1000}
            >
              <ThumbUpAltIcon color={isLiked ? 'primary' : 'inherit'} />
            </StyledBadge>
          </IconButton>
        </Tooltip>

        <Tooltip title='Share'>
          <IconButton aria-label='share'>
            <ShareIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Comments'>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <StyledBadge
              // badgeContent={200}
              badgeContent={post.comments.length}
              color='secondary'
              max={99}
            >
              <CommentIcon />
            </StyledBadge>
          </IconButton>
        </Tooltip>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          {post.comments.length <= 0 && (
            <Typography color='inherit' variant='caption'>
              Be the first to comment
            </Typography>
          )}
          {token && <NewComment postId={post._id} />}
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <CommentsData comment={comment} key={comment._id} />
            ))
          ) : (
            <Typography color='inherit' variant='subtitle1'>
              No comments yet
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );

  return <React.Fragment>{postsData}</React.Fragment>;
};

export default PostData;
