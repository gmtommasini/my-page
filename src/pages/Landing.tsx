// import * as React from 'react';
import { PublishedDate } from 'utils/Dates';


export default function Landing() {


    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 80px)', justifyContent: 'space-between' }}>
            <div>
                <h1>Landing page</h1>

                This is a page I created to study a bit of React and also expose my little backend projects.
                <br />
                It is a continuous work and I'll try to keep updating and including more little projects.
                
            </div>

            {/* For now I am updating this date manually */}
            <PublishedDate date={new Date("2023-6-2")} />

        </div>
    );
}

