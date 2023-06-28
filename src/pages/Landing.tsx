import React, { useState, useEffect } from 'react';

import Hello from './Hello';
import Card from './Card';

export default function Landing() {
    const [redirectToDashboard, setRedirectToDashboard] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
          setRedirectToDashboard(true);
        }, 5000);
    
        // Clear the timer when the component is unmounted or the state changes
        return () => clearTimeout(timer);
      }, []);

    return (
        // <Hello/>
        redirectToDashboard ? <Card/> : <Hello/>
    );
}

