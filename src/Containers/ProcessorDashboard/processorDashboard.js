import React, { useCallback, useEffect, useState, useRef } from 'react';
import Header from '../../Components/Header/Header'
import MUIDataTable from 'mui-datatables';
import Loader from "../../Components/Loader/Loader";
import LoopIcon from "@material-ui/icons/Loop";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import GetAppIcon from "@material-ui/icons/GetApp";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import { useDispatch, useSelector } from 'react-redux';
import { downloadcertificate, getallpools, getfilelist, getattributedetail, uploadcontract, uploadlms, savelms, viewloans } from '../../Store/ProcessorDashboard/ProcessorDashboardAction';
import { NavLink } from "react-router-dom";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, Chip, InputLabel, FormControl, Tooltip, Checkbox } from '@mui/material';
import { Box } from '@material-ui/core';
import { FilePond, registerPlugin } from "react-filepond";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { default as ReactSelect, components } from "react-select";
import { validate } from '@material-ui/pickers';
import PropTypes from "prop-types";
registerPlugin(FilePondPluginFileValidateType);


const userid = localStorage.getItem("userid");
const Option = (props) => {
    return (
        <div>
            <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{" "}
                <label className="setup">{props.label}</label>
            </components.Option>
        </div>
    );
};
Option.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
};
const customStyle = {
    option: (provided, state) => ({
        ...provided,
        padding: 2,
    }),
    control: (base) => ({
        ...base,
        height: 45,
        minHeight: 45,
        fontWeight: "bold",
        borderStyle: "solid",
        borderColor: "grey",
        borderBottom: "1px solid grey",
    }),
};



const ProcessorDashboard = () => {
    const dispatch = useDispatch();
    const getfilelists = useSelector((state) => state.processordashboard.get_file_list);
    const processordata = useSelector((state) => state.processordashboard.processor_data);
    const pond1Ref = useRef(null);
    const [files1, setFiles1] = useState([]);
    const [files2, setFiles2] = useState([]);
    const [rowsSelected, setRowsSelected] = useState([]);
    const [loading, setLoading] = useState();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [opencontract, setOpenContract] = useState(false);
    const [processoroption, setProcessorOption] = useState([]);
    const [processorarrray, setProcessorArray] = useState([]);
    const [poolid, setPoolId] = useState();
    const [poolname, setPoolName] = useState();
    const [array1, setArray1] = useState([]);
    const [upload, setUpload] = useState(false)

    // ProcessorDashboard.propTypes = {
    //     enqueueSnackbar: PropTypes.func.isRequired,
    // };

    const handleChange = (selectedOptions) => {
        setProcessorArray(selectedOptions);
    };
    const handleInit = () => {
        console.log("FilePond instance has initialised", pond1Ref.current);
    };
    const onRowClick = useCallback((rowData) => {
        console.log("Row clicked: ", rowData);

    }, []);
    const onRowsSelect = useCallback((rowsSelected, allRows) => {
        const selected = allRows.map((row) => row.dataIndex);
        setRowsSelected(selected);
        selectedpoolid(selected);
    }, []);

    const selectedpoolid = (selected) => {
        console.log("Selected Pool ID: ", selected);

    };

    const customSort = useCallback((data, colIndex, order) => {
        console.log("customSort", data, colIndex, order);
        return data.sort((a, b) => {
            if (colIndex === 5) {
                return (
                    (new Date(a.data[colIndex]) < new Date(b.data[colIndex]) ? -1 : 1) *
                    (order === "desc" ? 1 : -1)
                );
            } else {
                return (
                    (a.data[colIndex] < b.data[colIndex] ? -1 : 1) *
                    (order === "desc" ? 1 : -1)
                );
            }
        });
    }, []);


    const oncloseLms = () => {
        setDialogOpen(false);
        setFiles1([]);
        setFiles2([]);
    }

    const openContract = (value, dealname) => {
        getContract(value, dealname)
        setPoolId(value);
        setPoolName(dealname);

    }

    const getContract = async (value, dealname) => {
        localStorage.setItem('poolid', value);
        setProcessorArray([]);
        GetFileList(value, dealname);
        setOpenContract(true);
    }

    const GetFileList = async (value, dealname) => {
        let result = await dispatch(getfilelist(dealname));
        if (result) {
            await dispatch(getattributedetail(value, dealname))

        }
        setProcessorOption(getfilelists);
    }

    const DownloadCertificate = async (value, dealname) => {
        await dispatch(downloadcertificate(value, dealname));
    }


    const addContract = async () => {
        let data = {
            poolname: poolname,
            filename: processorarrray.value,
            poolid: poolid,
            field_details: JSON.parse(localStorage.getItem("field_details")),

        }
        if (!data.poolid) {
            console.log("error")
            window.location.assign("/processor/dashboard")
        }
        await dispatch(uploadcontract(data));
        setOpenContract(false);
        await dispatch(getallpools(userid));
    }
    const addLms = async (value, dealname) => {
        addExcel()
        setDialogOpen(true);
        setPoolId(value);
        setPoolName(dealname);
        setUpload(true)
    }

    const addExcel = async () => {
        if (pond1Ref.current && pond1Ref.current.getFiles().length === 0) {
            alert("Please upload the documents");
        } else if (pond1Ref.current) {
            let formData = new FormData();
            let count = 0;

            pond1Ref.current.getFiles().map((fileItem) => fileItem.file).forEach((file) => {
                formData.append("filename", file);
                count++;

            });
            formData.append("poolname", poolname);
            formData.append("poolid", poolid);

            let upload = await dispatch(uploadlms(formData));

            if (upload) {
                await (saveLms(upload));
            };
        }

    }
    const saveLms = async (value) => {
        let formData = {}
        formData.poolname = poolname;
        formData.poolid = poolid;
        formData.filetype = value;
        console.log(formData, "formmmm")
        await dispatch(savelms(formData));
        setDialogOpen(false);
        await dispatch(getallpools(userid))
    }

    const options = {
        filterType: "dropdown",
        filter: true,
        search: true,
        print: false,
        viewColumns: false,
        download: false,
        rowHover: false,
        selectableRowsOnClick: false,
        selectableRows: false,
        onRowClick: onRowClick,
        onRowsSelect: onRowsSelect,
        rowsSelected: rowsSelected,
        customSort: customSort,
        loading: true,
        textLabels: {
            body: {
                noMatch:
                    loading === true ? (
                        "Sorry, there is no matching data to display"
                    ) : (
                        <Loader msg={"Please wait, Loading Loan Data"} />
                    ),
                toolTip: "Sort",
                columnHeaderTooltip: (column) => `Sort for ${column.label}`,
            },
            filter: {
                all: "All",
                title: "FILTERS",
                reset: "RESET",
            },
            selectedRows: {
                text: "row(s) selected",
                delete: "Delete",
                deleteAria: "Delete Selected Rows",
            },
        },

    };

    const columns = [
        {
            name: "poolid",
            label: "Deal Id",
            options: {
                filter: true,
            },
        },
        {
            name: "poolname",
            label: "Deal Name",
            options: {
                filter: true,
            },
        },
        {
            name: "assetclass",
            label: "Asset Class",
            options: {
                filter: true,
            },
        },
        {
            name: "issuer",
            label: "Issuer",
            options: {
                filter: true,
            },
        },

        {
            name: "noofloans",
            label: "No of Loans",
            options: {
                filter: true,
                sortCompare: (order) => {
                    return (obj1, obj2) => {

                        let val1 = parseInt(obj1.data, 10);
                        let val2 = parseInt(obj2.data, 10);
                        return (val1 - val2) * (order === "asc" ? 1 : -1);
                    };
                },
            },
        },
        {
            name: "datecreated",
            label: "Date Created",
            options: {
                filter: true,
            },
        },
        {
            name: "lastactivity",
            label: "Last Activity",
            options: {
                filter: true,
            },
        },
        {
            name: "status",
            label: "Status",
            options: {
                filter: true,
            },
        },

        {
            name: "certIssued",
            label: "Download Certificate",
            options: {
                filter: true,

                customHeadRender: (columnMeta, updateDirection) => (
                    <th style={{ textAlign: "center", fontSize: "0.875rem", backgroundColor: "#d5f2f0" }}>
                        {columnMeta.label}
                    </th>
                ),
                customBodyRender: (value, tableMeta, updateValue) => {

                    return (
                        <div style={{ textAlign: "center" }}>
                            {value === 0 ? (
                                <GetAppIcon
                                    style={{ cursor: "pointer" }}
                                    color="disabled"
                                >

                                </GetAppIcon>

                            ) : (
                                <GetAppIcon
                                    style={{ cursor: "pointer", color: "#048c88" }}
                                    onClick={() => {
                                        DownloadCertificate(tableMeta.rowData[0],
                                            tableMeta.rowData[1])
                                    }

                                    }
                                >

                                </GetAppIcon>
                            )}


                        </div>
                    );
                },
            }
        },
        {
            name: "poolid",
            label: "Add LMS Data",
            options: {
                filter: true,

                customHeadRender: (columnMeta, updateDirection) => (
                    <th style={{ textAlign: "center", fontSize: "0.875rem", backgroundColor: "#d5f2f0" }}>
                        {columnMeta.label}
                    </th>
                ),
                customBodyRender: (value, tableMeta, updateValue, rowData) => {


                    return (
                        <div style={{ textAlign: "center" }}>
                            {tableMeta.rowData[12] !== 0 ? (

                                <LoopIcon
                                    style={{ cursor: "pointer", color: "#048c88" }}
                                    onClick={() => {
                                        addLms(value, tableMeta.rowData[1]);
                                    }}
                                >

                                </LoopIcon>
                            ) : (
                                <CloudUploadIcon
                                    style={{ cursor: "pointer", color: "#048c88" }}
                                    onClick={() => {
                                        addLms(value, tableMeta.rowData[1]);
                                    }}

                                ></CloudUploadIcon>
                            )}
                        </div>
                    );
                },
            },
        },
        {
            name: "poolid",
            label: "Add Contracts",
            options: {
                filter: true,

                customHeadRender: (columnMeta, updateDirection) => (
                    <th style={{ textAlign: "center", fontSize: "0.875rem", backgroundColor: "#d5f2f0" }}>
                        {columnMeta.label}
                    </th>
                ),
                customBodyRender: (value, tableMeta, updateValue) => {

                    return (
                        <div style={{ textAlign: "center" }}>
                            {tableMeta.rowData[7] === "Created" ? (
                                <CloudUploadIcon
                                    style={{ cursor: "pointer", color: "#048c88" }}
                                    onClick={() => {
                                        openContract(value, tableMeta.rowData[1])
                                    }}

                                ></CloudUploadIcon>
                            ) : (
                                <LoopIcon
                                    style={{ cursor: "pointer", color: "#048c88" }}
                                    onClick={() => {
                                        openContract(value, tableMeta.rowData[1])
                                    }}                                ></LoopIcon>
                            )}
                        </div>
                    );
                },
            },
        },

        {
            name: "poolid",
            label: "View Loans",
            options: {
                filter: true,

                customHeadRender: (columnMeta, updateDirection) => (
                    <th style={{ textAlign: "center", fontSize: "0.875rem", backgroundColor: "#d5f2f0", gap: "20px" }}>
                        {columnMeta.label}
                    </th>
                ),
                customBodyRender: (value, tableMeta, updateValue) => {
                    const handleViewLoansClick = () => {
                        localStorage.setItem("poolid", value);
                        localStorage.setItem("poolname", tableMeta.rowData[1]);
                    };
                    return (
                        <div style={{ textAlign: "center" }}>
                            {tableMeta.rowData[7] === "Reconciled" ? (
                                <NavLink
                                    to={"/processor/ddreport"}
                                    onClick={handleViewLoansClick}
                                >
                                    <img
                                        src={require("../../images/ViewLoans.png")}

                                    ></img>
                                </NavLink>
                            ) : (
                                <>
                                    <img
                                        src={require("../../images/ViewLoans.png")}
                                        className='disabled'
                                    ></img>
                                </>
                            )}

                        </div>
                    )
                }
            },
        },
        {
            name: "lms_status",
            label: "LMS Status",
            options: {
                display: "exclude",
            },
        },
        {
            name: "contract_status",
            label: "Contract Status",
            options: {
                display: "exclude",
            },
        },

    ]

    useEffect(() => {
        setLoading(true);
        dispatch(getallpools(userid));
        setLoading(false)


    }, [])

    return (
        <div className="page">
            <div className="content">
                <div className="header">
                    <Header pageTitle={"DASHBOARD"} />
                </div>
                <div className='page-content'>
                    <MUIDataTable
                        title={"Deals"}
                        columns={columns}
                        options={options}
                        data={processordata.result}

                    />
                </div>
            </div>
            <>
                <Dialog open={dialogOpen} onClose={oncloseLms}
                    maxWidth="lg"
                    PaperProps={{
                        style: {
                            overflow: 'auto', // Allows scrolling
                            scrollbarWidth: 'none', // For Firefox
                            msOverflowStyle: 'none', // For Internet Explorer and Edge
                            '&::-webkit-scrollbar': { // For WebKit browsers like Chrome and Safari
                                display: 'none'
                            }
                        }
                    }}
                >
                    <div className="shifting" style={{ overflow: "hidden" }} >
                        <h5 className="text-secondary" style={{ padding: "15px" }}> Add Loan Data</h5>
                        <div className="row">
                            <div className="col" style={{ textAlign: "center" }}>
                                <Box className="dashedd">
                                    <SaveAltIcon className="upper"></SaveAltIcon>
                                    <div>
                                        <h6 className="text-success font-weight-bold">
                                            Upload Excel
                                        </h6>
                                    </div>
                                    <FilePond
                                        ref={pond1Ref}
                                        oninit={handleInit}
                                        files={files1}
                                        allowMultiple={true}
                                        allowReorder={true}
                                        acceptedFileTypes={[
                                            "application/vnd.ms-excel",
                                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                                        ]}
                                        maxFiles={1}
                                        name="file1"
                                        labelIdle='<span class="filepond--label-action">Browse</span>'
                                        onupdatefiles={(fileItems) => {
                                            setFiles1(fileItems.map((fileItem) => fileItem.file));
                                        }}
                                    />
                                </Box>
                            </div>
                            <div className="col" style={{ textAlign: "center" }}>
                                <Box className="solid">
                                    <SaveAltIcon className="upper"></SaveAltIcon>
                                    <div>
                                        <h6 className="text-success font-weight-bold ">
                                            Upload from LMS
                                        </h6>
                                    </div>
                                    <FilePond
                                        oninit={handleInit}
                                        files={files2}
                                        allowMultiple={true}
                                        allowReorder={true}
                                        maxFiles={1}
                                        name="file2"
                                        labelIdle='<span class="filepond--label-action">Browse</span>'
                                        onupdatefiles={(fileItems) => {
                                            setFiles2(fileItems.map((fileItem) => fileItem.file));
                                        }}


                                    />
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ justifyContent: "center", marginBottom: "30px" }} >
                        <div className="spacing">
                            <Button
                                variant="outlined"
                                id="optionalbutton"
                                onClick={oncloseLms}
                            >
                                {" "}
                                CANCEL{" "}
                            </Button>
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={addExcel}
                        >
                            UPLOAD
                            {/* {this.state.formLoader === true ? (
                                <CircularProgress size="25px" color="primary" />
                            ) : (
                                ""
                            )} */}
                        </Button>
                    </div>

                </Dialog>
            </>
            <>
                <Dialog open={opencontract} onClose={() => setOpenContract(false)}
                    PaperProps={{
                        style: {
                            overflow: 'auto', // Allows scrolling
                            scrollbarWidth: 'none', // For Firefox
                            msOverflowStyle: 'none', // For Internet Explorer and Edge
                            '&::-webkit-scrollbar': { // For WebKit browsers like Chrome and Safari
                                display: 'none'
                            }
                        }
                    }}

                >
                    <div style={{ width: "625px", padding: "20px" }}>
                        <h5 className="text-secondary" style={{ marginLeft: "1rem" }}>
                            Add Contract
                        </h5>
                        <div className="row"  >
                            <div className="col">
                                <div className="" style={{ textAlign: "center" }}>
                                    <SaveAltIcon className="upper"></SaveAltIcon>
                                    <h6 className="text-success font-weight-bold">Upload</h6>
                                </div>

                                <ReactSelect
                                    className="as-shifted"
                                    options={getfilelists}
                                    placeholder="Select File"
                                    closeMenuOnSelect={false}
                                    maxMenuHeight={150}
                                    hideSelectedOptions={false}
                                    components={{ Option }}
                                    onChange={handleChange}
                                    allowSelectAll={true}
                                    value={processorarrray}
                                    styles={customStyle}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row" style={{ display: "flex", justifyContent: "center", height: "15vh", marginTop: "2rem", marginBottom: "2rem" }}>
                        <div className="spacing">
                            <Button
                                variant="outlined"
                                id="optionalbutton"
                                onClick={() => { setOpenContract(false) }}
                            >
                                {" "}
                                CANCEL{" "}
                            </Button>
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={addContract}
                        >
                            UPLOAD
                            {/* {this.state.formLoader === true ? (
                  <CircularProgress size="25px" color="primary" />
                ) : (
                  ""
                )} */}
                        </Button>
                    </div>
                </Dialog>
            </>
        </div >
    )
}

export default ProcessorDashboard
