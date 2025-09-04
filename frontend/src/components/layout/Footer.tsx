import React from 'react';
import { Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t py-4 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Typography variant="subtitle2" className="mb-2">
              Quick Links
            </Typography>
            <div className="space-y-1">
              <Link href="/about" color="inherit" className="block hover:text-primary-600">
                About Us
              </Link>
              <Link href="/contact" color="inherit" className="block hover:text-primary-600">
                Contact Us
              </Link>
              <Link href="/careers" color="inherit" className="block hover:text-primary-600">
                Careers
              </Link>
            </div>
          </div>

          <div>
            <Typography variant="subtitle2" className="mb-2">
              Legal
            </Typography>
            <div className="space-y-1">
              <Link href="/privacy" color="inherit" className="block hover:text-primary-600">
                Privacy Policy
              </Link>
              <Link href="/terms" color="inherit" className="block hover:text-primary-600">
                Terms of Service
              </Link>
              <Link href="/disclaimer" color="inherit" className="block hover:text-primary-600">
                Disclaimer
              </Link>
            </div>
          </div>

          <div>
            <Typography variant="subtitle2" className="mb-2">
              Support
            </Typography>
            <div className="space-y-1">
              <Link href="/help" color="inherit" className="block hover:text-primary-600">
                Help Center
              </Link>
              <Link href="/faq" color="inherit" className="block hover:text-primary-600">
                FAQs
              </Link>
              <Typography variant="body2" color="textSecondary">
                Toll Free: 1800-XXX-XXXX
              </Typography>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t text-center">
          <Typography variant="body2" color="textSecondary">
            © {currentYear} Fin-Agentix India. All rights reserved.
          </Typography>
          <Typography variant="caption" color="textSecondary" className="mt-1 block">
            Licensed by Reserve Bank of India (RBI) | NBFC Registration No. XXXXX
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
