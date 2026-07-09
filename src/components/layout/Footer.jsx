import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaPinterestP } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  const socialLinks = [
    { name: 'Instagram', icon: <FaInstagram className="w-4 h-4" />, href: 'https://instagram.com' },
    { name: 'Facebook', icon: <FaFacebookF className="w-4 h-4" />, href: 'https://facebook.com' },
    { name: 'X', icon: <FaXTwitter className="w-4 h-4" />, href: 'https://x.com' },
    { name: 'Pinterest', icon: <FaPinterestP className="w-4 h-4" />, href: 'https://pinterest.com' },
  ];

  const column1 = {
    title: 'Company',
    links: [
      { name: 'About', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Blog', href: '#blog' },
      { name: 'Contact', href: '#contact' },
    ],
  };

  const column2 = {
    title: 'Shop',
    links: [
      { name: 'Women', href: '#women' },
      { name: 'Men', href: '#men' },
      { name: 'Beauty', href: '#beauty' },
      { name: 'Accessories', href: '#accessories' },
    ],
  };

  const column3 = {
    title: 'Support',
    links: [
      { name: 'FAQs', href: '#faqs' },
      { name: 'Shipping', href: '#shipping' },
      { name: 'Returns', href: '#returns' },
      { name: 'Privacy Policy', href: '#privacy' },
    ],
  };

  const column4 = {
    title: 'Contact',
    info: [
      { icon: <FiMail className="w-4 h-4 text-accent" />, text: 'concierge@stylesphere.com', href: 'mailto:concierge@stylesphere.com' },
      { icon: <FiPhone className="w-4 h-4 text-accent" />, text: '+1 (800) 555-0199', href: 'tel:+18005550199' },
      { icon: <FiMapPin className="w-4 h-4 text-accent" />, text: '72 Fifth Ave, New York, NY' },
    ],
  };

  return (
    <footer className="relative w-full bg-primary border-t border-border/10 overflow-hidden z-10 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      {/* Subtle gold gradient line at the top */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent pointer-events-none" />

      {/* Subtle bottom glows */}
      <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] rounded-full bg-accent/3 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-blush/3 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Branding Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center pb-16 border-b border-border/10 gap-8"
        >
          <div className="text-center md:text-left">
            <a
              href="#"
              className="font-heading text-2xl md:text-3xl font-bold tracking-[0.25em] uppercase text-secondary hover:text-accent transition-colors duration-300 block mb-3"
            >
              Style Sphere
            </a>
            <p className="font-body text-xs sm:text-sm text-secondary/50 tracking-wider max-w-xs mx-auto md:mx-0">
              Luxury fashion curated for modern elegance.
            </p>
          </div>

          {/* Social Icons with Glassmorphism Hover */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card/45 backdrop-blur-md border border-border/20 text-secondary flex items-center justify-center hover:bg-accent hover:text-primary hover:border-accent hover:scale-110 transition-all duration-300"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Middle Links Grid (4 columns) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16"
        >
          {/* Column 1 */}
          <div>
            <h4 className="font-heading text-sm font-semibold tracking-wider text-secondary uppercase mb-6">
              {column1.title}
            </h4>
            <ul className="space-y-4">
              {column1.links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="inline-block font-body text-xs text-secondary/55 hover:text-accent tracking-wide hover:translate-x-1.5 transition-all duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-heading text-sm font-semibold tracking-wider text-secondary uppercase mb-6">
              {column2.title}
            </h4>
            <ul className="space-y-4">
              {column2.links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="inline-block font-body text-xs text-secondary/55 hover:text-accent tracking-wide hover:translate-x-1.5 transition-all duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-heading text-sm font-semibold tracking-wider text-secondary uppercase mb-6">
              {column3.title}
            </h4>
            <ul className="space-y-4">
              {column3.links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="inline-block font-body text-xs text-secondary/55 hover:text-accent tracking-wide hover:translate-x-1.5 transition-all duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 (Contact Info) */}
          <div>
            <h4 className="font-heading text-sm font-semibold tracking-wider text-secondary uppercase mb-6">
              {column4.title}
            </h4>
            <ul className="space-y-4">
              {column4.info.map((item, index) => (
                <li key={index} className="flex items-center gap-3 font-body text-xs text-secondary/55">
                  <span className="shrink-0">{item.icon}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="tracking-wide break-all hover:text-accent transition-colors duration-300"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="tracking-wide break-all">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom copyright & micro links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pt-8 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left"
        >
          <p className="font-body text-[11px] text-secondary/35 tracking-wider">
            © 2026 Style Sphere. All rights reserved.
          </p>

          <div className="flex gap-6">
            {['Terms', 'Privacy', 'Cookies'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-body text-[11px] text-secondary/35 hover:text-accent tracking-widest uppercase transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
