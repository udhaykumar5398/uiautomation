// import React, { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux';
// import { Form } from 'react-bootstrap';
// import CompareItem from './CompareItem';
// import { CircularProgress } from '@material-ui/core';

// const PdfHighlighting = ({ highlights: highlightsParent, resetHighlights }) => {
//     console.log(highlightsParent,'sssss')
//     const [highlights, setHighlights] = useState([]);
//     const activeLoanData = JSON.parse(useSelector((state) => state.processordashboard.review));
//     console.log(activeLoanData,'activee');
//     console.log("PDFHighlighterSidebar", { highlights })

//     useEffect(() => {
//         setHighlights(highlightsParent)
//     }, [highlightsParent])

//     const getLMSKeys = () => {
//         const newArr = []
//         for (let i = 0; i < highlights.length; i++) {
//             newArr.push(Object.keys(highlights[i]?.content?.lmsloan))
//         }

//         return newArr.flat()
//     }
//     console.log(getLMSKeys(),'getLMS')
//     return (
//         <div className="pdfHighlighterSidebar">
//             <div id="content_pdfconent" className="viewmorecolumnpdf">
//                 {getLMSKeys().length !== 0 ?

//                     <Form id="labelform">
//                         <div className="d-flex justify-content-between">
//                             <h6>LMS</h6>
//                             <h6 style={{ width: '50%' }}>Contract</h6>
//                             <CompareItem className="pdfHighlighterSidebar__highlight" highlights={highlights} match={activeLoanData?.attributewise_matched}
//                                 lmsLoan={activeLoanData?.lmsloan} agreementLoan={activeLoanData?.agreementloan}
//                                 isMatched={Object.values(activeLoanData?.attributewise_matched).every(item => item === 1)}
//                             />
//                         </div>

//                     </Form> : ''
//                 }
//             </div>

//         </div>
//     )
// }

// export default PdfHighlighting
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CompareItem from "./CompareItem"
import { CircularProgress } from '@material-ui/core';

const PdfHighlighting = ({ highlights: highlightsParent, resetHighlights }) => {

    const [highlights, setHighlights] = useState([])
    const url = JSON.parse(useSelector((state) => state.processordashboard.review));

    useEffect(() => {
        setHighlights(highlightsParent)
    }, [highlightsParent])
    console.log("PDFHighlighterSidebar", { highlights })


    console.log("PDFHighlighterSidebar", { highlights });
    const getLMSKeys = () => {
        const newArr = []
        for (let i = 0; i < highlights.length; i++) {
            newArr.push(Object.keys(highlights[i]?.content?.lmsloan))
        }
        // setLMSLoan(newArr.flat())
        return newArr.flat()
    }
    console.log("LMS KEYS", getLMSKeys())
    return (
        <div className="pdfHighlighterSidebar">
            <div id="content_pdfconent" className="viewmorecolumnpdf">
                {getLMSKeys().length !== 0 ?
                    <Form id='labelform'>
                        <div className="d-flex justify-content-between">
                            <h6>LMS</h6>
                            <h6 style={{ width: '50%' }}>Contract</h6>
                        </div>
                        <CompareItem className="pdfHighlighterSidebar__highlight"
                            highlights={highlights}
                            match={url?.attributewise_matched}
                            lmsloan={url?.lmsloan}
                            agreementLoan={url?.agreementloan}
                            isMatched={Object.values(url?.attributewise_matched).every(item => item === 1)}

                        />
                    </Form> : <CircularProgress size="30px" color="secondary" />
                }

            </div>
            {console.log("highlights", highlightsParent)}

        </div>
    )
}

export default PdfHighlighting
