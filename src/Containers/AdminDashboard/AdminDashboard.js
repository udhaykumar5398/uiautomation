import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adddealdata, addprocessordata, getallattributes, getallmapfields, getallpools, getallprocessor, getuniquedealnames, savemapfields, deletedealid } from '../../Store/AdminDashboard/AdminDashboardAction';
import Header from '../../Components/Header/Header';
import '../../App.css';
import ReactSelect, { components } from "react-select";
import AddIcon from "@material-ui/icons/Add";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import { Button, Dialog, TextField, Select, MenuItem, Tooltip, Checkbox } from '@mui/material';
import { Close } from '@material-ui/icons';
import { CustomFieldTemplate, widgets } from '../../Components/CustomScripts/CustomScript';
import MySelect from './MySelect';
import VisibilityIcon from "@material-ui/icons/VisibilityOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Loader from "../../Components/Loader/Loader"
import LinearLoader from '../../Components/LinearLoader/LinearLoader';
import { InputAdornment } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const Option = (props) => {
    return (
        <div>
            <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{" "}
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};

const allOption = {
    label: "Select all",
    value: "*",
};

const ValueContainer = ({ children, ...props }) => {
    const currentValues = props.getValue();
    let toBeRendered = children;
    if (currentValues.some((val) => val.value === allOption.value)) {
        toBeRendered = [[children[0][0]], children[1]];
    }

    return (
        <components.ValueContainer {...props}>
            {toBeRendered}
        </components.ValueContainer>
    );
};

const MultiValue = (props) => {
    let labelToBeDisplayed = `${props.data.label} `;
    if (props.data.value === allOption.value) {
        labelToBeDisplayed = "All is selected";
    }
    return (
        <components.MultiValue {...props}>
            <span>{labelToBeDisplayed}</span>
        </components.MultiValue>
    );
};
const customStyle = {
    option: (provided, state) => ({
        ...provided,

        color: state.isSelected ? "black" : "black",
        backgroundColor: state.isSelected ? "#eee" : "#fff",
    }),
    control: (base) => ({
        ...base,
        height: 53,
        minHeight: 53,
        fontWeight: "bold",
        borderStyle: "solid",
        borderColor: "grey",
        borderBottom: "1px solid grey",
    }),
};

const AdminDashboard = () => {
    const getallattribute = useSelector((state) => state.admindashboard.get_all_attributes);
    const dispatch = useDispatch();
    const admindata = useSelector((state) => state.admindashboard.data);
    const processoroption = useSelector((state) => state.admindashboard.get_all_processor);
    const dealname = useSelector((state) => state.admindashboard.get_unique_dealnames);
    const [dealid, setDealId] = useState('');
    const [poolname, setPoolName] = useState('');
    const [searchText, setSearchText] = useState('');
    const [rowsSelected, setRowsSelected] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [mapfields, setMapFields] = useState(false);
    const [processors, setProcessors] = useState([]);
    const [formData1, setFormData1] = useState({});
    const [openProcessor, setOpenProcessor] = useState(false);
    const [processorOption, setProcessorOption] = useState([]);
    const [processorArray, setProcessorArray] = useState([]);
    const [mapprocessor, setMapProcessor] = useState(false);
    const [deletedeal, setDeleteDeal] = useState(false);
    const [mappoolid, setMapPoolId] = useState("");
    const [linearloader, setLinearLoader] = useState();
    const [tableData1, setTableData1] = useState([]);
    const [tableData2, setTableData2] = useState([]);
    const [tableData3, setTableData3] = useState([]);
    const [getdata, setGetData] = useState(false);
    const [formData2, setFormData2] = useState({
        poolname: "",
        datecreated: "",
        assetclass: "",
        issuer: "",
    });
    const [processorformData, setProcessorFormData] = useState({
        name: '',
        userlastname: '',
        emailid: ''
    });

    const [formdata, setFormData] = useState({
        poolname: "",
        datecreated: null,
        assetclass: "",
        issuer: ""
    })
    const asset_Class_option = [
        {
            value: 'Residential Mortgage',
            label: 'Residential Mortgage',
        },
        {
            value: 'Commercial Mortgage',
            label: 'Commercial Mortgage',
        },
        {
            value: 'Auto Loans',
            label: 'Auto Loans',
        },
        {
            value: 'Consumer Loans',
            label: 'Consumer Loans',
        },
        {
            value: 'Credit Cards',
            label: 'Credit Cards',
        },
        {
            value: 'Leasing',
            label: 'Leasing',
        },
        {
            value: 'Esoteric',
            label: 'Esoteric',
        },
        {
            value: 'Non Performing Loans',
            label: 'Non Performing Loans',
        },
        {
            value: 'Asset Backed Commercial Papers',
            label: 'Asset Backed Commercial Papers',
        },
    ];

    const formatDate = (date) => {
        if (!date) return ''; // Handle null or undefined dates

        // Convert Dayjs object to string in the format YYYY-MM-DD
        const dateString = dayjs(date).format('YYYY-MM-DD');
        const [year, month, day] = dateString.split("-");
        return `${month}-${day}-${year}`;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Convert the datecreated field to the desired format
        const formattedDate = formatDate(formdata.datecreated);

        const formDataToSubmit = {
            ...formdata,
            datecreated: formattedDate
        };
        console.log(formDataToSubmit, "Form Data");

        if (processorArray.length <= 0) {
            console.log('Please fill the required fields');
        } else {
            let processor = processorArray.map(option => option.value).filter(value => value !== "*");
            formDataToSubmit.processor = processor.join('#');
            console.log("addPool" + JSON.stringify(formDataToSubmit));
            // Handle form submission logic here
            await dispatch(adddealdata(formDataToSubmit));
            setDialogOpen(false);
            await dispatch(getallpools);
        }
      
        setFormData([]);
        setProcessorArray([]);
    };
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const formData = {
    //         poolname: formdata.poolname,
    //         datecreated: formdata.datecreated,
    //         assetclass: formdata.assetclass,
    //         issuer: formdata.issuer
    //     };

    //     console.log(formData, "formData");

    //     if (processorArray.length <= 0) {
    //         console.log('Please fill the required fields');
    //     } else {
    //         let processor = [];
    //         processorArray.forEach(function (key) {
    //             if (key.value !== "*") {
    //                 processor.push(key.value);
    //             }
    //         });
    //         formData.processor = processor.join('#');
    //         console.log("addPool" + JSON.stringify(formData));
    //     }

    //     await dispatch(adddealdata(formData));
    //     await dispatch(getallpools);
    //     // Handle form submission logic here
    // };

    const handledealChange = (event) => {
        setFormData({
            ...formdata,
            [event.target.name]: event.target.value
        });
    };

    const handleDateChange = (newDate) => {
        setFormData({
            ...formdata,
            datecreated: newDate // Ensure newDate is a Dayjs object or null
        });
    };

    const handleProcessorChange = (e) => {
        const { name, value } = e.target;
        setProcessorFormData({
            ...processorformData,
            [name]: value
        });
    };
    const onAddingItem1 = (i) => (event) => {
        setTableData1(prevState => {
            const newState = [...prevState];
            newState[i] = { ...newState[i], matched: !newState[i].matched };
            return newState;
        });
    };

    const onAddingItem2 = (i) => (event) => {

        setTableData2(prevState => {
            const newState = [...prevState];
            newState[i] = { ...newState[i], matched: !newState[i].matched };
            return newState;
        }, console.log('table', tableData2));
    };

    const onAddingItem3 = (i) => (event) => {
        setTableData3(prevState => {
            const newState = [...prevState];
            newState[i] = { ...newState[i], matched: !newState[i].matched };
            return newState;
        });
    };
    const handleChange = (selectedOptions) => {
        setProcessorArray(selectedOptions);
    };
    const onFormChangedpool = (value) => {
        setFormData1(value.formData);
    };
    const onFormChangedpool1 = (value) => {
        setFormData2(value.formData);
    };
    const closeDeal = () => {
        setDialogOpen(false);
        setProcessorArray([]);
        setFormData([]);

    };

    const closeProcessor = () => {
        setOpenProcessor(false);
        setProcessorFormData([]);
    }

    const onOpenMapFields = async (value, poolname) => {
        setDealId(value);
        setPoolName(poolname);
        fetchAttributes(value, poolname);


    };

    const onOpenDeleteDeal = async (value, poolname) => {
        setDealId(value);
        setPoolName(poolname);
        setDeleteDeal(true);
    }
    const matchedRows = (tabledata, num) => {
        return tabledata.map((tr_item, i) => {
            return (
                <>
                    <tr>
                        <td style={{ width: "30%" }}>
                            <Checkbox
                                style={{ color: "#048C88" }}
                                type="checkbox"
                                id={i}
                                name={tr_item.name}
                                value={tr_item.name}
                                onChange={
                                    num === 0
                                        ? onAddingItem1(i)
                                        : num === 1
                                            ? onAddingItem2(i)
                                            : onAddingItem3(i)
                                }
                                checked={tr_item.matched}
                            ></Checkbox>


                            {tr_item.attributeName}
                            <label
                                style={{ cursor: 'pointer' }}
                                onClick={num == 0 ? onAddingItem1(i) : num == 1 ? onAddingItem2(i) : onAddingItem3(i)}
                            >
                                {tr_item.name}
                            </label>
                        </td>
                    </tr>
                </>
            )
        })

    }
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
            name: "noofprocessor",
            label: "Processor",
            options: {
                filter: true,
            },
        },
        {
            name: "noofloans",
            label: "No. of Loans",
            options: {
                filter: true,
                sortCompare: (order) => {
                    return (obj1, obj2) => {

                        let val1 = parseInt(obj1.data, 10);
                        let val2 = parseInt(obj2.data, 10);
                        return (val1 - val2) * (order === 'asc' ? 1 : -1);
                    };
                }
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
            name: "poolid",
            label: "Map Fields",
            options: {
                filter: true,
                customHeadRender: (columnMeta, updateDirection) => (
                    <th style={{ textAlign: "center", fontSize: "0.875rem", backgroundColor: "#d5f2f0" }}>
                        {columnMeta.label}
                    </th>
                ),
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <div style={{ textAlign: "center" }}>
                                <VisibilityIcon
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => onOpenMapFields(value, tableMeta.rowData[1])}
                                ></VisibilityIcon>
                            </div>
                        </>
                    )
                }
            },
        },

        {
            name: "poolid",
            label: "Map Processor",
            options: {
                filter: true,
                customHeadRender: (columnMeta, updateDirection) => (
                    <th style={{ textAlign: "center", fontSize: "0.875rem", backgroundColor: "#d5f2f0" }}>
                        {columnMeta.label}
                    </th>
                ),
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <div style={{ textAlign: "center" }}>
                                <VisibilityIcon
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => { onOpenMapProcessor(value, tableMeta.rowData) }}

                                ></VisibilityIcon>
                            </div>
                        </>
                    )
                }
            },
        },

        {
            name: "processor",
            label: "Processorsss",
            options: {
                display: "exclude",
            },
        },
        {
            name: "poolid",
            label: "Delete Deal",
            options: {
                customHeadRender: (columnMeta, updateDirection) => (
                    <th style={{ textAlign: "center", fontSize: "0.875rem", backgroundColor: "#d5f2f0" }}>
                        {columnMeta.label}
                    </th>
                ),
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <React.Fragment>
                            <div style={{ textAlign: "center" }}>
                                <DeleteOutlineIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() => onOpenDeleteDeal(value, tableMeta.rowData[1])}
                                >
                                </DeleteOutlineIcon>
                            </div>
                        </React.Fragment>
                    );
                },
            },
        },
    ];

    const onOpenMapProcessor = (value, rowData) => {
        const mapdata = formData2;
        console.log(rowData[6], "dattee")
        mapdata.poolname = rowData[1];
        mapdata.datecreated = rowData[6];
        mapdata.assetclass = rowData[2];
        mapdata.issuer = rowData[3];
        setDealId(value);
        setFormData2(mapdata);
        setMapPoolId(rowData[0]);
        let x = processoroption;
        let y = rowData[9];
        let z = y.split("#");

        let res = [];
        z.map((value) => {
            x.map((val) => {
                if (value === val.value) {
                    res.push(val)
                }
            })
        })
        setProcessorArray(res)
        setMapProcessor(true);
    };
    const fetchAttributes = async (value, poolname) => {
        setMapFields(true);
        setTableData1([]);
        setTableData2([]);
        setTableData3([]);
        setLinearLoader(true);
        await dispatch(getallattributes(value, poolname));
        setGetData(true);
        setLinearLoader(false)
    };


    const deleteDeal = async (value) => {
        await dispatch(deletedealid(value));
        setDeleteDeal(false);
        await dispatch(getallpools);
    }
    const openAddProcessor = () => {
        setOpenProcessor(true);
        setDialogOpen(false);
    }

    const MapProcessor = async (event) => {
        event.preventDefault();
        var data = {
            poolid: dealid,
            processor: ""
        }
        let processors = [];
        processorArray.forEach(function (key, value) {
            processors.push(key.value)
        })
        data.processor = processors.join("#")
        console.log(data, "dataaa")
        await dispatch(getallmapfields(data));
        setMapProcessor(false);
        await dispatch(getallprocessor);
        await dispatch(getallpools);
    }

    const onSubmitProcessor = async (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', processorformData);
        await dispatch(addprocessordata(processorformData));
    };

    const handleRowClick = useCallback(() => {
    }, []);

    const handleRowsSelect = useCallback((rowsSelected, allRows) => {
        const selected = allRows.map((row) => row.dataIndex);
        setRowsSelected(selected);
    }, []);

    const customSort = useCallback((data, colIndex, order) => {
        return data.sort((a, b) => {
            if (colIndex === 6) {
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
    const customSearch = useCallback((searchQuery, currentRow, columns) => {
        let isFound = false;
        currentRow.forEach((col) => {
            if (col && col.toString && typeof col.toString === 'function' && col.toString().indexOf(searchQuery) >= 0) {
                isFound = true;
            }
        });
        return isFound;
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            dispatch(getallpools);
            dispatch(getuniquedealnames);
            dispatch(getallprocessor);
            setLoading(false);
        }
        fetchData();
    }, [])
    useEffect(() => {
        if (getdata) {
            getallattribute?.result?.forEach((value) => {
                console.log(value, 'value');
                if (value.attributeCategory === "Borrower") {
                    setTableData1((prevTableData1) => [...prevTableData1, value]);
                    console.log('TableData1 updated:', value);
                } else if (value.attributeCategory === "Loan") {
                    setTableData2((prevTableData2) => [...prevTableData2, value]);
                    console.log('TableData2 updated:', value);
                } else {
                    setTableData3((prevTableData3) => [...prevTableData3, value]);
                    console.log('TableData3 updated:', value);
                }
            });
        }

    }, [getdata, getallattribute]);

    // useEffect(() => {
    //     const uniqueNames = new Set(Poolschema.properties.poolname.enum);
    //     dealname?.forEach((name) => {
    //         uniqueNames.add(name);
    //     });
    //     Poolschema.properties.poolname.enum = Array.from(uniqueNames);
    // }, [dealname]);

    const options = useMemo(() => ({
        filterType: "dropdown",
        filter: true,
        search: true,
        print: false,
        viewColumns: false,
        download: false,
        rowHover: false,
        selectableRows: "none", // Disable row selection checkboxes
        selectableRowsHeader: false, // Hide the header checkbox
        onRowClick: handleRowClick,
        onRowsSelect: handleRowsSelect,
        rowsSelected: rowsSelected,
        customSort: customSort,
        searchText: searchText,
        searchPlaceholder: "Search",
        customSearch: customSearch,
        loading: loading,
        textLabels: {
            body: {
                noMatch: loading === true ? (
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
    }), [rowsSelected, searchText, loading]);


    const MapFields = async () => {
        let arr = [];
        tableData1.map((val) => {
            if (val.matched) {
                arr.push(val.attributeId)
            }
        });
        tableData2.map((val) => {
            if (val.matched) {
                arr.push(val.attributeId)
            }
        });
        tableData3.map((val) => {
            if (val.matched) {
                arr.push(val.attributeId)
            }
        });
        var data = {
            poolid: dealid,
            attributes: arr.join("#")
        }

        dispatch(savemapfields(data));
        setMapFields(false);


    }

    return (
        <div className="page">
            <div className='content'>
                <div className="header">
                    <Header pageTitle={"DASHBOARD"}></Header>
                </div>
                <div className="row1">
                    <div className="col-md-6 col-sm-12">
                        <div className="page-content adddeal-pop" style={{ textAlign: "center" }}>
                            <div className="row align-items-center">
                                <div className="col text-secondary shift">
                                    <h4 className="font-weight-bold">{admindata.noofpool}</h4>
                                    <p>NO. OF DEALS</p>
                                </div>
                                <div className="vertical-divider"></div>
                                <div className="col text-secondary shifts">
                                    <Button onClick={() => setDialogOpen(true)}>
                                        <AddIcon></AddIcon>
                                    </Button>
                                    <p>ADD DEAL</p>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="col-md-6 col-sm-12">
                        <div className="page-content adddeal-pop" style={{ textAlign: "center" }}>
                            <div className="row align-items-center">
                                <div className="col text-secondary shift">
                                    <h4 className="font-weight-bold">{admindata.noofprocessor}</h4>
                                    <p>NO. OF PROCESSOR</p>
                                </div>
                                <div className="vertical-divider"></div>
                                <div className="col text-secondary shifts">
                                    <Button onClick={() => setOpenProcessor(true)}>
                                        <AddIcon></AddIcon>
                                    </Button>
                                    <p>ADD PROCESSOR</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='page-content'>
                    <>
                        <MUIDataTable
                            title="Deals"
                            columns={columns}
                            options={options}
                            data={admindata.result && admindata.result.length > 0 ? admindata.result : []}
                        />
                    </>
                </div>
            </div>
            {/* Add Deal */}
            <>
                <Dialog open={dialogOpen} onClose={closeDeal} className='modalPopup'

                    PaperProps={{
                        style: {
                            width: "50rem"
                        },
                    }}
                >
                    <h2>Add Deal</h2>
                    <Button
                        className="closePopup"
                        style={{ minWidth: "30px" }}
                        variant="text"
                        color="primary"
                        onClick={closeDeal}
                    >
                        {" "}
                        <Close></Close>
                    </Button>
                    <div>
                        <form
                            onSubmit={handleSubmit}
                            style={{ margin: "auto", padding: "20px" }}
                        >
                            <TextField
                                label="Deal Name"
                                select
                                variant="filled"
                                fullWidth
                                margin="normal"
                                name='poolname'
                                value={formdata.poolname}
                                onChange={handledealChange}
                                required
                                style={{ width: "100%", marginBottom: "16px" }}
                            >

                                {dealname?.map((name, index) => (
                                    <MenuItem key={index} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}

                            </TextField>

                            {/* <TextField
                                label="Date created"
                                type="date"
                                variant="filled"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                margin="normal"
                             
                                value={formdata.datecreated}
                                onChange={handledealChange}
                                required
                                name='datecreated'
                               
                                style={{ width: "100%", marginBottom: "16px" }} // Increased width and gap
                            // /> */}
                            <div style={{ marginBottom: "16px" }}>

                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}>
                                    <DemoContainer

                                        components={['DatePicker']}>
                                        <DatePicker
                                            // name='datecreated'
                                            value={formdata.datecreated}
                                            onChange={handleDateChange}
                                            slotProps={{
                                                textField: { variant: "filled" }, day: {
                                                    sx: (theme) => ({
                                                        '&.Mui-selected': {
                                                            backgroundColor: "#048c88",
                                                            color: theme.palette.common.white,

                                                        },
                                                    }),
                                                },
                                            }} label="Date Created" />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>

                            <TextField
                                label="Asset Class"
                                select
                                variant="filled"
                                fullWidth
                                margin="normal"
                                name='assetclass'
                                value={formdata.assetclass}
                                onChange={handledealChange}
                                required
                                style={{ width: "100%", marginBottom: "16px" }} // Increased width and gap
                            >
                                {asset_Class_option.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                label="Issuer"
                                type="text"
                                variant="filled"
                                fullWidth
                                margin="normal"
                                name='issuer'
                                value={formdata.issuer}
                                onChange={handledealChange}
                                required
                                style={{ width: "100%", marginBottom: "16px" }} // Increased width and gap
                            />

                            <MySelect
                                options={processoroption}
                                isMulti
                                placeholder="Select Processor"
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                components={{
                                    Option,
                                    MultiValue,
                                    ValueContainer,
                                }}
                                onChange={handleChange}
                                allowSelectAll={true} // Note: react-select does not support this prop directly; custom implementation needed
                                value={processorArray}
                                styles={customStyle}
                            />

                            <div className="modalsubmit">
                                <div className="submitbuttonbg">
                                    <hr className="hrbottom" />
                                    <div className="row justify-content-end">
                                        <Button
                                            onClick={() => setDialogOpen(false)}
                                            variant="outlined"
                                            id="optionalbutton"
                                        >
                                            CANCEL
                                        </Button>
                                        <Button variant="contained" color="primary" type="submit">
                                            ADD DEAL
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </Dialog>
            </>
            {/* Add Processor */}
            <>
                <Dialog open={openProcessor} onClose={closeProcessor} className='modalPopup'>
                    <h2>Add Processor</h2>
                    <Button
                        className="closePopup"
                        style={{ minWidth: "30px" }}
                        variant="text"
                        color="primary"
                        onClick={closeProcessor}
                    >
                        {" "}
                        <Close></Close>
                    </Button>
                    <div >
                        <form
                            onSubmit={onSubmitProcessor}
                            style={{ margin: 'auto', padding: '20px' }}
                        >

                            <TextField
                                label="Name"
                                variant="filled"
                                id="name"
                                name="name"
                                value={processorformData.name}
                                onChange={handleProcessorChange}
                                required
                                fullWidth
                                margin="normal"
                                style={{ width: '100%', marginBottom: '16px' }}

                            />
                            <TextField
                                label="Last Name"
                                variant="filled"
                                id="userlastname"
                                name="userlastname"
                                value={processorformData.userlastname}
                                onChange={handleProcessorChange}
                                required
                                fullWidth
                                margin="normal"
                                style={{ width: '100%', marginBottom: '16px' }}

                            />

                            <TextField
                                label="Email ID"
                                variant="filled"
                                id="emailid"
                                name="emailid"
                                value={processorformData.emailid}
                                onChange={handleProcessorChange}
                                required
                                fullWidth
                                margin="normal"
                                style={{ width: '100%', marginBottom: '16px' }}

                            />
                            <div className="modalsubmit">
                                <div className="submitbuttonbg">
                                    <hr className="hrbottom" />
                                    <div className="row justify-content-end">
                                        <Button
                                            onClick={closeProcessor}
                                            variant="outlined"
                                            id="optionalbutton"
                                        >
                                            CANCEL
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                        >
                                            ADD Processor
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Dialog>
            </>
            {/* Map Fields */}
            <>
                <Dialog open={mapfields} onClose={() => setMapFields(false)} className='modalPopup'>
                    <h2>Map Fields</h2>
                    <Button
                        className="closePopup"
                        style={{ minWidth: "30px" }}
                        variant="text"
                        color="primary"
                        onClick={() => setMapFields(false)}
                    >
                        {" "}
                        <Close></Close>
                    </Button>
                    <div>
                        <>
                            <div className="contentfields" text-left>
                                <div className="rowmapfield">
                                    <div className="col-md-1">
                                        <InfoOutlinedIcon
                                            fontSize="large"
                                            className="imgcolor"
                                        ></InfoOutlinedIcon>
                                    </div>
                                    <div className="col-md-11">
                                        <p>
                                            Please enable fields that need to be
                                            validated. We also recommend disabling
                                            fields that are not needed as this will
                                            speed up the verification process.{" "}
                                        </p>

                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <TextField
                                        // label={"Name"}
                                        variant="filled"
                                        name="name"
                                        disabled
                                        value={poolname}
                                    ></TextField>
                                </div>
                                {linearloader === true ? <LinearLoader /> : ""}
                                <div className="col-md-12 col-sm-12">
                                    <>
                                        {tableData1 && tableData1.length > 0 ? (
                                            <table className="table table-bordered fieldstable" id="fieldtable1">
                                                <thead>
                                                    <tr>
                                                        <th colSpan="2">Borrower</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="setwidth">
                                                    {matchedRows(tableData1, 0)}
                                                </tbody>
                                            </table>
                                        ) : null}
                                    </>
                                    <>
                                        {tableData2 && tableData2.length > 0 ? (
                                            <table className="table table-bordered fieldstable" id="fieldtable1">
                                                <thead>
                                                    <tr>
                                                        <th colSpan="2">Loan</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="setwidth">
                                                    {matchedRows(tableData2, 1)}
                                                </tbody>
                                            </table>
                                        ) : null}
                                    </>
                                    <>
                                        {tableData3 && tableData3.length > 0 ? (
                                            <table className="table table-bordered fieldstable" id="fieldtable1">
                                                <thead>
                                                    <tr>
                                                        <th colSpan="2">Collateral</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="setwidth">
                                                    {matchedRows(tableData3, 2)}
                                                </tbody>
                                            </table>
                                        ) : null}
                                    </>


                                </div>
                            </div>
                        </>
                        <div className="modalsubmit col-md-12">
                            <div className="submitbuttonbg">
                                <hr className="hrbottom" />
                                <div className="mt-1 mb-1">
                                    <div className="row justify-content-end">
                                        <Button
                                            variant="outlined"
                                            id="optionalbutton"
                                            onClick={() => setMapFields(false)}
                                        >
                                            {" "}
                                            CANCEL{" "}
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            onClick={MapFields}
                                        >
                                            {" "}
                                            SAVE FIELDS

                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </>
            {/* Map Processor */}


            <>

                <Dialog open={mapprocessor} onClose={() => setMapProcessor(false)} className='modalPopup'>
                    <h2> Map Processor </h2>
                    <Button
                        className="closePopup"
                        style={{ minWidth: "30px" }}
                        variant="text"
                        color="primary"
                        onClick={() => setMapProcessor(false)}
                    >
                        {" "}
                        <Close></Close>
                    </Button>

                    <div>
                        {/* <Form
                            schema={MapProcessorSchema}
                            onSubmit={MapProcessor}
                            onChange={onFormChangedpool1}
                            formData={formData2}
                            widgets={widgets}
                            FieldTemplate={CustomFieldTemplate}


                        >
                            <ReactSelect
                                options={processoroption}
                                isMulti
                                placeholder="Select Processor"
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                components={{
                                    Option,
                                }}
                                onChange={handleChange}

                                allowSelectAll={true}
                                value={processorArray}
                                styles={customStyle}
                            />

                            <Tooltip title="Add Processor" placement="right">
                                <AddIcon
                                    // onClick={()=>setOpenProcessor(true)}

                                    fontSize="large"
                                    style={{ marginLeft: "15px", marginTop: "5px" }}
                                />

                            </Tooltip>
                            <div className="">
                                <div className="submitbuttonbg">
                                    <hr className="hrbottom" />
                                    <div className="row justify-content-end">
                                        <Button
                                            onClick={() => setMapProcessor(false)}
                                            variant="filled"
                                            id="optionalbutton"
                                        >
                                            CANCEL
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                        >
                                            MAP PROCESSOR
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Form> */}
                        <form
                            onSubmit={MapProcessor}
                            style={{ margin: "auto", padding: "20px" }}
                        >
                            <TextField
                                label="Deal Name"
                                variant="filled"
                                disabled
                                fullWidth
                                margin="normal"
                                value={formData2.poolname}
                                // onChange={handledealChange}              
                                required
                                style={{ width: "100%", marginBottom: "16px" }}
                            />

                            <TextField
                                label="Date created"
                                // type="date"
                                variant="filled"
                                // InputLabelProps={{ shrink: true }}
                                disabled
                                fullWidth
                                margin="normal"
                                value={formData2.datecreated}
                                // onChange={handledealChange}
                                required
                                style={{ width: "100%", marginBottom: "16px" }} // Increased width and gap
                            />

                            <TextField
                                label="Asset Class"
                                select
                                variant="filled"
                                disabled
                                fullWidth
                                margin="normal"
                                value={formData2.assetclass}
                                // onChange={handledealChange}
                                required
                                style={{ width: "100%", marginBottom: "16px" }} // Increased width and gap
                            >
                                {asset_Class_option.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                label="Issuer"
                                type="text"
                                variant="filled"
                                fullWidth
                                disabled
                                margin="normal"
                                value={formData2.issuer}
                                // onChange={handledealChange}
                                required
                                style={{ width: "100%", marginBottom: "16px" }} // Increased width and gap
                            />
                            <ReactSelect
                                options={processoroption}
                                isMulti
                                placeholder="Select Processor"
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                components={{
                                    Option,
                                }}
                                onChange={handleChange}
                                allowSelectAll={true}
                                value={processorArray}
                                styles={customStyle}
                            />

                            <Tooltip title="Add Processor" placement="right">
                                <AddIcon
                                    onClick={openAddProcessor}
                                    fontSize="large"
                                    style={{ marginLeft: "15px", marginTop: "5px" }}
                                />
                            </Tooltip>
                            <div className="">
                                <div className="submitbuttonbg">
                                    <hr className="hrbottom" />
                                    <div className="row justify-content-end">
                                        <Button
                                            onClick={() => setMapProcessor(false)}
                                            variant="outlined"
                                            id="optionalbutton"
                                        >
                                            CANCEL
                                        </Button>
                                        <Button variant="contained" color="primary" type="submit">
                                            MAP PROCESSOR
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Dialog>
            </>


            {/* Delete Deal */}
            <>
                <div>
                    <Dialog open={deletedeal} onClose={() => setDeleteDeal(false)} className='modalPopup' >
                        <h2>Delete Deal</h2>
                        <Button
                            className="closePopup"
                            style={{ minWidth: "30px" }}
                            variant="text"
                            color="primary"
                            onClick={() => setDeleteDeal(false)}
                        >

                            <Close></Close>
                        </Button>
                        <div>
                            <p className="popup-title" style={{ padding: "5px" }}>
                                Are you sure you wish to Delete this Deal? Doing so,
                                will remove linked data
                            </p>
                            <div className="deletemodal">
                                <div className="submitbuttonbg">
                                    <hr className="hrbottom" />
                                    <div className="row justify-content-end" style={{ marginRight: "1rem" }}>
                                        <Button
                                            onClick={() => setDeleteDeal(false)}
                                            variant="outlined"
                                            id="optionalbutton"
                                        >
                                            NO
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => deleteDeal(dealid)}
                                        >
                                            YES
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </div>
            </>
        </div>

    )
}

export default AdminDashboard

