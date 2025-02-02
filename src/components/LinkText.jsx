// components/LinkText.js
import React from 'react';
import { Link } from 'react-router-dom';

const LinkText = ({ text, link }) => {
  return (
    <Link to={link} className="text-blue-500 hover:underline">
      {text}
    </Link>
  );
};

export default LinkText;
