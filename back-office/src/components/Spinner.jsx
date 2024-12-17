import React from 'react';
import { DotLoader} from 'react-spinners';
const override = {
    position:"fixed",
    top:"50%",
    left:"50%",
};
const Spinner = ({ size = 50, color = "#4A90E2", loading = true }) => {
    return (
        <div className="fixed z-10 bg-[rgba(224,224,224,0.2)] min-w-full min-h-full">
            <DotLoader
                color="#5f6fff"
                speedMultiplier={1}
                cssOverride={override}
                loading={loading}
                size={80}
            />
        </div>
    );
};
export default Spinner;

