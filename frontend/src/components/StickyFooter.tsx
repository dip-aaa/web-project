import React from "react";

const StickyFooter = () => (
  <footer style={{
    width: '100%',
    position: 'fixed',
    left: 0,
    bottom: 0,
    textAlign: 'center',
    padding: '10px 0 8px 0',
    fontFamily: 'Roboto, Helvetica',
    fontWeight: 400,
    fontSize: 14,
    color: '#6b7280',
    background: '#fffaf6',
    borderTop: '1px solid #f0e6d9',
    zIndex: 100
  }}>
    © {new Date().getFullYear()} KOSH. All rights reserved.
  </footer>
);

export default StickyFooter;
