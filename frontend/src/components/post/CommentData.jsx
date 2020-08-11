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
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentIcon from '@material-ui/icons/Comment';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
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
}));

const CommentsData = ({ comment }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const commentsData = (
    <Card className={classes.root} elevation={10}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            {_.startCase(comment.fullName[0])}
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
            to={'/profile/' + comment.author}
          >
            {_.startCase(comment.fullName)}
          </Link>
        }
        subheader={moment(comment.createdAt).fromNow()}
      />
      {/* <CardMedia
          className={classes.media}
          image='/static/images/cards/paella.jpg'
          title='Paella dish'
        /> */}
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {comment.comment}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title='Like'>
          <IconButton aria-label='Like post'>
            <ThumbUpAltIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Replies'>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <CommentIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>Replies</CardContent>
      </Collapse>
    </Card>
  );

  return <React.Fragment>{commentsData}</React.Fragment>;
};

export default CommentsData;
