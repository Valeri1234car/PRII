import React, { useContext } from 'react';
import { PodatkiContext } from '../../App';

const PdfBesedilo = () => {
    const { pdfText } = useContext(PodatkiContext);
    return (

        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <pre className="card-text text-center" style={{ fontSize: '1.2rem', fontFamily: 'Arial' }}>
                                {/* {pdfText} */}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PdfBesedilo;
