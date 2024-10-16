// import React, {useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import TextField from "@material-ui/core/TextField";
// import matchIcon from "../../images/match.png";
// import mismatchIcon from "../../images/mismatch.png";
// import { Tooltip } from '@material-ui/core';


// const updateHash = (highlight) => {
//     if (highlight.position.pageNumber === 0) return;
//     document.location.hash = `highlight-${highlight.id}`;
// };
// const CompareItem = (props) => {
//     const dispatch = useDispatch();
//     const lmsloan = JSON.parse(useSelector((state) => state.processordashboard.review.lmsloan));
//     const agreementloan = JSON.parse(useSelector((state) => state.processordashboard.review.agreementloan));

//     const [fields, setFields] = useState({
//         highlights: props.highlights,
//         lmsLoan: lmsloan,
//         agreementLoan: agreementloan,
//         match: props.match,
//         isMatched: props.isMatched,
//     });

//     useEffect(() => {
//         setFields((prevFields) => ({
//             ...prevFields,
//             highlights: props.highlights,
//         }));
//     }, [props.highlights]);

//     const handleChange = (highlight, event, value, key) => {
//         setFields((prevFields) => ({
//             ...prevFields,
//             highlights: prevFields.highlights.map((e) => {
//                 if (e.id === highlight.id) {
//                     if (key === "LMS") {
//                         e.content.lmsloan[value] = event.target.value;
//                     } else {
//                         e.content.agreementloan[value] = event.target.value;
//                     }
//                 }
//                 return e;
//             }),
//         }));
//     };
//     const renderMatchMismatchIcons = (highlight, idx) => {
//         const { match, agreementLoan, lmsLoan } = fields;
//         if (match[Object.keys(lmsLoan)[idx]] === 1) return <img src={matchIcon} />;
//         else if (
//             Object.values(highlight.content.lmsloan)[0] ===
//             Object.values(highlight.content.agreementloan)[0]
//         )
//             return <img src={matchIcon} />;
//         else return <img src={mismatchIcon} />;
//     };
//     const { highlights } = fields;
//     return (
//         <React.Fragment>
//             <tr>
//                 <td>
//                     {highlights.map((highlight, idx) => (
//                         <div className="d-flex justify-content-between align-items-center gap-2" key={highlight.id}>
//                             <Tooltip title={Object.keys(highlight.content.lmsloan)[0]}>
//                                 <React.Fragment>
//                                     <div>
//                                         <label>{Object.keys(highlight.content.lmsloan)[0]}</label>
//                                         <TextField
//                                             onClick={() => updateHash(highlight)}
//                                             id={"outlined-basic-lmsLoan" + props.id}
//                                             name="lmsLoan"
//                                             value={Object.values(highlight.content.lmsloan)[0]}
//                                             onChange={(e) =>
//                                                 handleChange(highlight, e, Object.keys(highlight.content.lmsloan)[0], "LMS")
//                                             }
//                                             variant="outlined"
//                                             size="small"
//                                         />
//                                     </div>
//                                 </React.Fragment>
//                             </Tooltip>

//                             <Tooltip title={Object.keys(highlight.content.lmsloan)[0]}>
//                                 <React.Fragment>
//                                     <div className="mx-2">
//                                         <label>{Object.keys(highlight.content.lmsloan)[0]}</label>
//                                         <div className="d-flex align-items-center">
//                                             <TextField
//                                                 onClick={() => updateHash(highlight)}
//                                                 id={"outlined-basic-agreementLoan" + props.id}
//                                                 name="agreementLoan"
//                                                 value={Object.values(highlight.content.agreementloan)[0]}
//                                                 onChange={(e) =>
//                                                     handleChange(highlight, e, Object.keys(highlight.content.agreementloan)[0], "CONTRACT")
//                                                 }
//                                                 variant="outlined"
//                                                 size="small"
//                                             />
//                                             <span className="ml-2">
//                                                 {renderMatchMismatchIcons(highlight, idx)}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </React.Fragment>
//                             </Tooltip>
//                         </div>
//                     ))}
//                 </td>
//             </tr>
//         </React.Fragment>
//     )
// }

// export default CompareItem
import React, { useState, useEffect } from 'react';
import matchIcon from "../../images/match.png";
import mismatchIcon from "../../images/mismatch.png";
import { useSelector } from 'react-redux';
import { TextField, Tooltip } from '@material-ui/core';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    textField: {
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: '#048c88', // Change border color to red on focus
        },
      },
    },
  });

const updateHash = (highlight) => {
    console.log(highlight,"highlight")
    if (highlight.position.pageNumber === 0) return;
    console.log(`Updating hash to: highlight-${highlight.id}`,'hhhhhh');
    document.location.hash = `highlight-${highlight.id}`;
};

const CompareItem = (props) => {
    const classes = useStyles();

    const url = JSON.parse(useSelector((state) => state.processordashboard.review));
    const [fields, setFields] = useState({
        highlights: props.highlights,
        lmsloan: url?.lmsloan,
        agreementLoan: url?.agreementloan,
        match: props.match,
        isMatched: props.isMatched

    });

    const handleChange = (highlight, event, value, key) => {
        setFields((prevFields) => ({
            ...prevFields,
            highlights: prevFields.highlights.map((e) => {
                if (e.id === highlight.id) {
                    if (key === "LMS") {
                        e.content.lmsloan[value] = event.target.value;
                    } else {
                        e.content.agreementloan[value] = event.target.value;
                    }
                }
                return e;
            }),
        }));
    };
    
    const renderMatchMismatchIcons = (highlight, idx) => {
        const { match, agreementLoan, lmsloan } = fields;
        if (match[Object.keys(lmsloan)[idx]] === 1) return <img src={matchIcon} />
        else if (Object.values(highlight.content.lmsloan)[0] ===
            Object.values(highlight.content.agreementloan)[0]
        )
            return <img src={matchIcon} />
        else return <img src={mismatchIcon} />

    };
    useEffect(() => {
        setFields((prevFields) => ({
            ...prevFields,
            highlights: props.highlights,
        }));
    }, [props.highlights]);


    const { highlights } = fields;
     {console.log("CompareItem Child",{highlights})}


    return (
      
        <div>
            <tr>
                <td>
                    {highlights.map((highlight, idx) => {
                        return (
                            <div className="d-flex justify-content-between align-items-center gap-2">
                                <Tooltip title={Object.keys(highlight.content.lmsloan)[0]}>
                                    <div className="d-flex flex-column">
                                        <label>
                                            {Object.keys(highlight.content.lmsloan)[0]}
                                        </label>
                                        <TextField
                                        
                                            onClick={() => updateHash(highlight)}
                                            id={"outlined-basic-lmsLoan" + props.id}
                                            name="lmsLoan"
                                            value={Object.values(highlight.content.lmsloan)[0]}
                                            variant="outlined"
                                            size="small"
                                            onChange={(e) =>
                                                handleChange(
                                                    highlight,
                                                    e,
                                                    Object.keys(highlight.content.lmsloan)[0],
                                                    "LMS"
                                                )
                                            }
                                            className={classes.textField}
                                        />
                                    </div>
                                </Tooltip>

                                <Tooltip title={Object.keys(highlight.content.lmsloan)[0]}>
                                    <div className="d-flex flex-column mx-2">
                                        <label>
                                            {Object.keys(highlight.content.lmsloan)[0]}
                                        </label>
                                        <div className="d-flex align-items-center">
                                            <TextField
                                                onClick={() => updateHash(highlight)}
                                                id={"outlined-basic-agreementLoan" + props.id}
                                                name="agreementLoan"
                                                value={
                                                    Object.values(highlight.content.agreementloan)[0]
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        highlight,
                                                        e,
                                                        Object.keys(highlight.content.agreementloan)[0],
                                                        "CONTRACT"
                                                    )
                                                }
                                                variant="outlined"
                                                size="small"
                                                className={classes.textField}

                                            />
                                            <span className="ml-2">
                                                {renderMatchMismatchIcons(highlight, idx)}
                                            </span>
                                        </div>
                                    </div>
                                </Tooltip>
                            </div>

                        )
                    })}
                </td>
            </tr>
        </div>
    )
}

export default CompareItem
