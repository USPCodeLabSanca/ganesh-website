import React from 'react';


export default function Terminal({ children }:
  { children: React.ReactNode }) {
  return (
    <div style={styles.terminal}>
      {children}
    </div>
  );
}

const styles = {
  terminal: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // semi-transparent black
    backdropFilter: 'blur(3px)',           // adds the blur effect
    borderRadius: '8px',
    padding: '16px',
    fontFamily: 'monospace',
    color: 'white',
    margin: '0 auto',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // subtle shadow
    width: '100%',
  } as React.CSSProperties
};
