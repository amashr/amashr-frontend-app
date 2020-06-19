import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import Notifications from './Notifications';
import Header from './Header';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function OverviewView() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Overview"
    >
      <Container maxWidth="lg">
        <Header />
        <Box mt={6}>
          <Notifications />
        </Box>
      </Container>
    </Page>
  );
}

export default OverviewView;
