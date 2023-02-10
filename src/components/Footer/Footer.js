import React from "react";
import "./Footer.css"
const Footer = () => {
  let date = new Date()
  let year = date.getFullYear()
  return (
    <footer>
      <p>&copy; {year} All Rights Reserved to Mahmoud Khallaf</p>
    </footer>
  );
};

export default Footer;
