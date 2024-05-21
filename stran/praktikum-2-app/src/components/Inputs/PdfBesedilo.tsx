import React, { useContext } from 'react';
import { PodatkiContext } from '../../App';

const PdfBesedilo = () => {
    const { pdfText } = useContext(PodatkiContext);
    return (
        <>
            <h3>Extracted Text:</h3>
            <pre>{pdfText}</pre>
        </>
    );
}

export default PdfBesedilo;
