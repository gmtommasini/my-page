import * as React from 'react';
import 'utils/Dates';
import { PublishedDate } from 'utils/Dates';


export default function Landing() {


    return (
        <>
            <h1>Landing page</h1>

            This is a page I created to study a bit of React and also expose my little backend projects.
            <br/>
            It is a continuous work and I'll try to keep updating and including more little projects.
            
            <PublishedDate date={new Date()}/>

        </>
    );
}

