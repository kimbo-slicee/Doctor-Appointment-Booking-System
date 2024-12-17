import React from 'react';
import { DotLoader} from 'react-spinners';
const override = {
    position:"fixed",
    top:"50%",
    left:"50%",
};
const Spinner = ({ size = 50, color = "#4A90E2", loading = true }) => {
    return (
            <DotLoader
                color="#5f6fff"
                speedMultiplier={1}
                cssOverride={override}
                loading={loading}
                size={80}
            />
    );
};
export default Spinner;

