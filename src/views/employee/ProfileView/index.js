import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import axios from '../../../utils/axios';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import Page from '../../../components/Page';
import Header from './Header';
import Timeline from './Timeline';
import Connections from './Connections';


const tabs = [
  { value: 'timeline', label: 'Timeline' },
  { value: 'connections', label: 'Connections' },
];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%'
  }
}));

function ProfileView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [currentTab, setCurrentTab] = useState('timeline');
  const [user, setUser] = useState(null);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const getPosts = useCallback(() => {
    axios
      .get('/api/employee/profile')
      .then((response) => {
        if (isMountedRef.current) {
          setUser(response.data.user);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (!user) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Profile"
    >
      <Header user={user} />
      <Container maxWidth="lg">
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            textColor="secondary"
            variant="scrollable"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box
          py={3}
          pb={6}
        >
          {currentTab === 'timeline' && <Timeline user={user} />}
          {currentTab === 'connections' && <Connections />}
        </Box>
      </Container>
    </Page>
  );
}

export default ProfileView;