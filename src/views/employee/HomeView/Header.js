import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    backgroundColor: theme.palette.common.white
  },
  actionIcon: {
    marginRight: theme.spacing(1)
  },
  image: {
    width: '100%',
    maxHeight: 400
  }
}));

function Header({ className, ...rest }) {
  const classes = useStyles();
  const { user } = useSelector((state) => state.account);

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid
        alignItems="center"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid
          item
          md={6}
          xs={12}
        >
          <Typography
            variant="overline"
            color="textSecondary"
          >
            Home
          </Typography>
          <Typography
            variant="h3"
            color="textPrimary"
          >
            Good Morning,
            {' '}
            {user.firstName}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textPrimary"
          >
            Here’s what’s happening with your team today
          </Typography>
          <Box mt={2}>
            <Button
              className={classes.action}
              variant="contained"
            >
              <BarChartIcon className={classes.actionIcon} />
              View summary
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
