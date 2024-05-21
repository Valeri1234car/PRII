import React, { useState, useRef, useContext } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import Tesseract from 'tesseract.js';
import { PodatkiContext } from '../../App';

GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.0.279/pdf.worker.min.js`;

const PdfReader = () => {
    const [files, setFiles] = useState<FileList | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { setPdfText } = useContext(PodatkiContext);

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        setFiles(event.dataTransfer.files);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setFiles(files);
            processFiles(files);
        }
    };

    const processFiles = async (files: FileList) => {
        setLoading(true);
        let textContent = '';
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            textContent += await convertPdfToImagesAndExtractText(file);
        }
        setPdfText(textContent);
        setLoading(false);
    };

    const convertPdfToImagesAndExtractText = async (file: File) => {
        const reader = new FileReader();
        return new Promise<string>((resolve, reject) => {
            reader.onload = async () => {
                if (reader.result) {
                    const typedArray = new Uint8Array(reader.result as ArrayBuffer);
                    const pdf = await getDocument(typedArray).promise;
                    let textContent = '';
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const viewport = page.getViewport({ scale: 2.0 });
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;

                        const renderContext = {
                            canvasContext: context!,
                            viewport: viewport,
                        };

                        await page.render(renderContext).promise;
                        const imgData = canvas.toDataURL('image/png');
                        const text = await extractTextFromImage(imgData);
                        textContent += text + '\n';
                    }
                    resolve(textContent);
                }
            };
            reader.readAsArrayBuffer(file);
        });
    };

    const extractTextFromImage = (imgData: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            Tesseract.recognize(
                imgData,
                'eng',
                {
                    logger: (m) => console.log(m),
                }
            ).then(({ data: { text } }) => {
                resolve(text);
            }).catch(reject);
        });
    };

    if (files) return (
        <div className="uploads">
            <ul>
                {Array.from(files).map((file, idx) => <li key={idx}>{file.name}</li>)}
            </ul>
            <div className="actions">
                <button onClick={() => setFiles(null)}>Cancel</button>
            </div>
            {loading && <p>Processing...</p>}
        </div>
    );

    return (
        <>
            <div 
                className="vnosnoPoljePDF"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <h1>Drag and drop</h1>
                <h1>or</h1>
                <input 
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    hidden
                    accept="application/pdf"
                    ref={inputRef}
                />
                <button onClick={() => inputRef.current?.click()}>Select Files</button>
            </div>
        </>
    );
};

export default PdfReader;
