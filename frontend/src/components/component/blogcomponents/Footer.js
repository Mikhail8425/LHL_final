import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function SocialMediaIcons() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
      <Link href="#" sx={{ p: 1 }}>
        <FacebookIcon />
      </Link>
      <Link href="#" sx={{ p: 1 }}>
        <TwitterIcon />
      </Link>
      <Link href="#" sx={{ p: 1 }}>
        <InstagramIcon />
      </Link>
    </Box>
  );
}

function Footer(props) {
  const { description, title } = props;

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {description}
        </Typography>
        <SocialMediaIcons />
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 3 }}>
          <Link color="inherit" href="#">
            Terms of Service
          </Link>{' '}
          |{' '}
          <Link color="inherit" href="#">
            Privacy Policy
          </Link>{' '}
          |{' '}
          <Link color="inherit" href="#">
            Contact Us
          </Link>
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2 }}>
          {'Copyright © '}
          <Link color="inherit" href="https://mui.com/">
            Stock Market Magnet
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
}

Footer.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Footer;
