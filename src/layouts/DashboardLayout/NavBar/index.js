/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useLocation, matchPath } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Chip,
  Box,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  ListSubheader,
  Typography,
  makeStyles
} from '@material-ui/core';
import DeviceHubOutlinedIcon from '@material-ui/icons/DeviceHubOutlined';
import {
  Briefcase as BriefcaseIcon,
  Shield as BenefitsIcon,
  Users as UsersIcon,
  Grid as SummaryIcon,
  Eye as OverviewIcon,
  MessageCircle as MessageCircleIcon,
  Mail as MailIcon,
  Target as CareerIcon,
  Gift as CompensationIcon,
  Book as PerformanceIcon,
  CreditCard as PayIcon,
  Info as FeedbackIcon,
  Activity as TalentIcon,
  BookOpen as ProfileIcon,
  Calendar as CalendarIcon,
  BarChart as GoalsIcon,
  Package as SalaryIcon,
  Home as HomeIcon
} from 'react-feather';

import Logo from '../../../components/Logo';
import NavItem from './NavItem';

const navConfig = [
  {
    subheader: 'Employee View',
    items: [
      {
        title: 'Home',
        icon: HomeIcon,
        href: '/app/employee/home',
        items: [
          {
            title: 'Overview',
            href: '/app/employee/home',
            icon: OverviewIcon
          },
          {
            title: 'Event Calender',
            href: '/app/employee/home/calendar',
            icon: CalendarIcon
          },
          {
            title: 'Mail',
            href: '/app/employee/home/mail',
            icon: MailIcon,
            info: () => (
              <Chip
                color="secondary"
                size="small"
                label="Updated"
              />
            )
          },
          {
            title: 'Chat',
            href: '/app/employee/home/chat',
            icon: MessageCircleIcon,
            info: () => (
              <Chip
                color="secondary"
                size="small"
                label="Updated"
              />
            )
          }
        ]
      },
      {
        title: 'Profile',
        icon: ProfileIcon,
        href: '/app/employee/profile'
      },
      {
        title: 'Summary',
        icon: SummaryIcon,
        href: '/app/employee/summary'
      },
      {
        title: 'Org Chart',
        icon: DeviceHubOutlinedIcon,
        href: '/app/employee/org'
      },
      {
        title: 'Job',
        icon: BriefcaseIcon,
        href: '/app/employee/job'
      },
      {
        title: 'Talent',
        icon: TalentIcon,
        href: '/app/employee/perfomance',
        items: [
          {
            title: 'Performance',
            href: '/app/employee/talent/performance',
            icon: PerformanceIcon
          },
          {
            title: 'Career',
            href: '/app/employee/talent/career',
            icon: CareerIcon
          },
          {
            title: 'Feedback',
            href: '/app/employee/talent/feedback',
            icon: FeedbackIcon
          },
          {
            title: 'Goals',
            href: '/app/employee/talent/goals',
            icon: GoalsIcon
          }
        ]
      },
      {
        title: 'Contact',
        icon: BriefcaseIcon,
        href: '/app/employee/contact'
      },
      {
        title: 'Personal',
        icon: UsersIcon,
        href: '/app/employee/personal'
      },
      {
        title: 'Salary',
        icon: SalaryIcon,
        href: '/app/employee/salary',
        items: [
          {
            title: 'Compensation',
            href: '/app/employee/salary/compensation',
            icon: CompensationIcon
          },
          {
            title: 'Benetifs',
            href: '/app/employee/salary/benefits',
            icon: BenefitsIcon
          },
          {
            title: 'Pay',
            href: '/app/employee/salary/pay',
            icon: PayIcon
          }
        ]
      }
    ]
  }
];

function renderNavItems({ items, ...rest }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, ...rest }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({
  acc,
  pathname,
  item,
  depth = 0
}) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        key={key}
        info={item.info}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        key={key}
        info={item.info}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

function NavBar({ openMobile, onMobileClose, }) {
  const classes = useStyles();
  const location = useLocation();
  const { user } = useSelector((state) => state.account);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box
            p={2}
            display="flex"
            justifyContent="center"
          >
            <RouterLink to="/app/employee/home">
              <Logo />
            </RouterLink>
          </Box>
        </Hidden>
        <Box p={2}>
          <Box
            display="flex"
            justifyContent="center"
          >
            <RouterLink to="/app/account">
              <Avatar
                alt="User"
                className={classes.avatar}
                src={user.avatar}
              />
            </RouterLink>
          </Box>
          <Box
            mt={2}
            textAlign="center"
          >
            <Link
              component={RouterLink}
              to="/app/account"
              variant="h5"
              color="textPrimary"
              underline="none"
            >
              {`${user.firstName} ${user.lastName}`}
            </Link>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              {user.bio}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box p={2}>
          {navConfig.map((config) => (
            <List
              key={config.subheader}
              subheader={(
                <ListSubheader
                  disableGutters
                  disableSticky
                >
                  {config.subheader}
                </ListSubheader>
              )}
            >
              {renderNavItems({ items: config.items, pathname: location.pathname })}
            </List>
          ))}
        </Box>
        <Divider />
        <Box p={2}>
          <Box
            p={2}
            borderRadius="borderRadius"
            bgcolor="background.dark"
          >
            <Typography
              variant="h6"
              color="textPrimary"
            >
              Need Help?
            </Typography>
            <Link
              variant="subtitle1"
              color="secondary"
              component={RouterLink}
              to="/docs"
            >
              Customer Services
            </Link>
          </Box>
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;
