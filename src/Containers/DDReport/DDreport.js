import React, { useEffect, useState, useCallback } from 'react';
import Header from '../../Components/Header/Header';
import { ReportProblemOutlined, Search } from '@material-ui/icons';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, Chip, InputLabel, FormControl, Tooltip, Checkbox, CircularProgress, IconButton } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from 'react-redux';
import { getattributedetailbypoolid, viewloans, reviewdata, downloadexcel, exportexcel, editloans, ddreportselect, addsignature, issuecertificate, getallmessagesbydealname, savecertificate } from '../../Store/ProcessorDashboard/ProcessorDashboardAction';
import MUIDataTable from 'mui-datatables';
import Match from "../../images/match.png";
import Mismatch from "../../images/mismatch.png";
import { Close } from '@material-ui/icons';
import CompareData from './CompareData';
import Loader from '../../Components/Loader/Loader';
import TextField from "@material-ui/core/TextField";
import $ from "jquery";
import { useHistory } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TableVirtuoso } from 'react-virtuoso';
import { TableCell, TableRow, Table, TableContainer, TableBody, Paper, TableHead } from '@material-ui/core';

const theme = createTheme({
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#048c88",
          "&.Mui-checked": {
            color: "#048c88",
          },
        },
      },
    },
  },
});

const TableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => <Table {...props} style={{ borderCollapse: "separate" }} />,
  TableHead: TableHead,
  TableRow: TableRow,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

const DDreport = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const ddreportdata = useSelector((state) => state.processordashboard.view_loans);
  const getddreportattribute = useSelector((state) => state.processordashboard.get_attribute_detail) || [];
  const getallmessage = useSelector((state) => state.processordashboard.getallmessage);
  const responsee = useSelector((state) => state.processordashboard.edit_loans);
  const [poolname, setPoolName] = useState();
  const [poolid, setPoolId] = useState();
  const [lmsfile, setLmsFile] = useState();
  const [contractfile, setContractFile] = useState();
  const [loandata, setLoanData] = useState(null);
  const [tabledata, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');
  const [datafilter, setDataFilter] = useState();
  const [exportdata, setExportData] = useState();
  const [openreview, setOpenReview] = useState(false);
  const [editedloanid, setEditedLoanId] = useState("");
  const [msgdata, setMsgData] = useState();
  const [editloan, setEditLoan] = useState(null);
  const [opensign, setOpenSign] = useState(false);
  const [openreport, setOpenReport] = useState(false);
  const [certifydata, setCertifyData] = useState([]);
  const [address, setAddress] = useState([]);
  const [signatory, setSignatory] = useState([]);
  const [exportdataxl, setExportdataxl] = useState([]);
  const [sort, setSort] = useState([]);
  const [certifystatus, setCertifyStatus] = useState();
  const [formloader, setFormLoader] = useState();
  const [file1, setFile1] = useState("");
  const [filename1, setFileName1] = useState("");
  const [rowsselected, setRowsSelected] = useState();
  const [certifyDisabled, setCertifyDisabled] = useState(true);
  const [getdata, setGetData] = useState(false);
  const [getdata1, setGetData1] = useState(false);
  const [filepath, setFilePath] = useState("");
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [isTextFieldVisible, setTextFieldVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [tableHeight, setTableHeight] = useState(600);
  const [displaydata, setDisplayData] = useState(tabledata);



  const handleSearchClick = () => {
    setTextFieldVisible(prevState => !prevState);
    setSearchValue("");
  };





  const handleSearchChange = (event) => {
    const value = event.target.value.trim().toLowerCase();
    setSearchValue(value);
  };

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    const allSelectedIndices = Array.from({ length: tabledata.length }, (_, i) => i);

    setSelectAllChecked(isChecked);
    setSelectedRows(isChecked ? allSelectedIndices : []);

    if (isChecked) {
      const allDealIds = tabledata.map(row => row["Deal Id"]);
      setSelectedRecords(allDealIds);
      dispatch(ddreportselect(JSON.stringify(allDealIds)));
    } else {
      setSelectedRecords([]);
      dispatch(ddreportselect(JSON.stringify([])));
    }
  };

  const handleSelectRowChange = (event, index) => {
    const isChecked = event.target.checked;
    setSelectedRows(prevSelectedRows =>
      isChecked
        ? [...prevSelectedRows, index]
        : prevSelectedRows.filter(rowIndex => rowIndex !== index)
    );
  };


  const backBtn = () => {
    history.push({
      pathname: "/processor/dashboard",
    });
  }
  const handleCloseReport = () => {
    setOpenReport(false);
    setOpenSign(false);
  }
  const handleYesReport = () => {
    setOpenReport(false);
    setOpenSign(true);

  }
  const onSubmit = async () => {
    console.log("Saving", selectedRows)
    let flag = 0;
    for (var i = 0; i < selectedRows.length; i++) {
      var j = selectedRows[i];
      let loanId = tabledata[j];
      if (loanId.matched == 0) {
        flag = 1;
        break;
      }
    }
    if (flag == 1) {
      setOpenReport(true);
      await GetAllMessagesByDealName();
      setGetData(true);

    } else {
      setOpenSign(true);
      await GetAllMessagesByDealName();
      console.log('finall')
      setGetData(true);
    }




  }

  const GetAllMessagesByDealName = async () => {
    var data = {
      dealName: poolname,
    }

    let result = await dispatch(getallmessagesbydealname(data));
    console.log(result, "resulltttt")
    let exportdata = [];
    console.log(tabledata, 'tabledataa')
    tabledata.map((data) => {
      let dupjson = {};
      Object.keys(data.lmsloan).map((value) => {
        dupjson[value] = data.lmsloan[value];
      });
      let ababa1 = "Number of pages processed";
      dupjson[ababa1] = data.NumberofPagesProcessed;
      Object.keys(data.lmsloan).map((value) => {
        dupjson[value + " "] =
          data.attributewise_matched[value] === 1 ? "YES" : "NO";
      });
      dupjson["Exceptions"] = data.matched === 1 ? "NO" : "YES";
      exportdata.push(dupjson);

    });
    console.log(exportdata, "exportdataa")
    setExportdataxl(exportdata);

    if (result.statuscode === 200) {
      if (Array.isArray(result.result)) {
        let signatory = result.result.filter((value) => {
          return value.messageType === "Signatory";
        })
        let address = result.result.filter((value) => {
          return value.messageType === "Address";
        });
        let message = result.result.filter((value) => {
          return value.messageType === "Message";
        });
        const sorting = [...message].sort(
          (a, b) => a.messageNumber - b.messageNumber
        );
        setSort(sorting);
        setCertifyData(result.result);
        setAddress(address);
        setSignatory(signatory);

        console.log({ sort, address, signatory, certifydata }, "seeeeeeeeeeeee")

      } else {
        console.log('error');
        setLoading(false);
      }
    }


    // else {
    //   alert('error')
    // }
  }

  const handleOnChange1 = (e) => {
    setFile1(e.target.files[0])
    setFileName1(e.target.files[0].name);
    console.log("eeee", e.target.files[0].name, file1);

  };
  const closeSignaturePop = () => {
    setFile1([]);
    setFileName1([]);
    setCertifyStatus(false);
    setOpenSign(false);
    setSelectedRows([]);
    setSelectedRecords([])
    setSelectAllChecked(false)

  }
  const onAddSignature = async () => {
    let data = new FormData();
    data.append("filename", file1);
    let filePath = await dispatch(addsignature(data));
    console.log(filePath, "filleee")
    setFilePath(filePath)

    setCertifyStatus(true);
  }

  const Certify = () => {
    const data = $("#pdfdata").html();
    console.log("dataaaaa", data);

    issueCertificate(data)
  }

  const issueCertificate = async (value) => {
    var data = {
      poolID: poolid,
      data: JSON.stringify(value),
    }
    let result = await dispatch(issuecertificate(data));
    if (result) {
      await saveCertificate(result);
    }
    window.location.assign('/processor/dashboard')
  }
  const saveCertificate = async (value) => {
    var data = {
      dealId: poolid,
      filePath: value
    }
    let result = await dispatch(savecertificate(data));
    if (result) {
      window.location.assign("/processor/dashboard")
    }
  }

  const tableData = (tableData1) => {
    if (!Array.isArray(tableData1) || tableData1.length === 0) {
      return <></>;
    }
    const heading = Object.keys(tableData1[0]);
    return (
      <div className="span-class-scheduled">
        <table className="table-servicer">
          <thead>
            <tr>
              {heading.map((head) => (
                <th key={head} className="servicer-data-table-heading">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData1.map((data, rowIndex) => (
              <tr key={rowIndex}>
                {heading.map((e, colIndex) => (
                  <td key={colIndex}>
                    {data[e]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const childHandler = (dataFromChild) => {
    if (dataFromChild.close === true) {
      setOpenReview(false);
    }
    if (dataFromChild.reload === true) {
      console.log('reloadedd')
      editLoans();
    }
  }

  const editLoans = async () => {
    var data = {
      edited_loanid: editedloanid,
      poolid: poolid,
      poolname: poolname,
    };
    await dispatch(editloans(data));
  };
  const ExportExcel = async () => {
    if (search === "") {
      let exportdata = [];
      tabledata.map((data) => {
        let dupjson = {};
        Object.keys(data.lmsloan).map((value) => {
          dupjson[value] = data.lmsloan[value];
        });
        Object.keys(data.lmsloan).map((value) => {
          dupjson[value + " "] =
            data.attributewise_matched[value] === 1 ? "YES" : "NO";
        });
        dupjson["Exceptions"] = data.matched === 1 ? "NO" : "YES";
        exportdata.push(dupjson);

      });


      var dealid = JSON.parse(localStorage.getItem('dealids'));
      let data = {
        dealid: dealid,
        poolname: poolname,
        poolid: poolid
      }
      await dispatch(exportexcel(data))
    } else {
      let exportdata = [];
      datafilter.map((data) => {
        let dupjson = {};
        Object.keys(data.lmsloan).map((value) => {
          dupjson[value + " "] =
            data.attributewise_matched[value] === 1 ? "YES" : "NO";

        });
        dupjson["Exceptions"] = data.matched === 1 ? "NO" : "YES";
        exportdata.push(dupjson);
      });
      setExportData(exportdata);
      var dealid = JSON.parse(localStorage.getItem('dealids'));
      let data = {
        dealid: dealid,
        poolname: poolname,
        poolid: poolid
      }
      await dispatch(exportexcel(data));
      setSelectAllChecked(false);
    }
  }
  const openReview = (value, loandocpath) => {
    console.log({ value, loandocpath }, "valueee")
    setEditedLoanId(value);
    setMsgData(value);
    setLoanData(prevData => {
      const loandataarray = Array.isArray(prevData) ? prevData : [];
      console.log('Updated Loan Data in openReview:', loandataarray);
      let result = loandataarray.find(e => e["Deal Id"] === value);
      const updatedLoanData = { ...result, loandocpath };
      console.log(JSON.stringify(updatedLoanData), 'result');
      dispatch(reviewdata(JSON.stringify(updatedLoanData)));
      setEditLoan(value);
      setOpenReview(true);
      return prevData;
    });
  }

  const prepareColumns = (loanData) => {
    let display = [];
    getddreportattribute.forEach((value) => {
      console.log(loanData, 'tablee')
      if (loanData[0]?.lmsloan) {
        Object.keys(loanData[0].lmsloan).forEach((val) => {
          console.log({ val, value }, "vallll")
          if (value.attributeName.toLowerCase().replace(/ /g, "") === val.toLowerCase().replace(/ /g, "")) {
            display.push({
              name: "lmsloan",
              label: value.attributeName,
              options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => <>{value[val]}</>,
              },
            });
          }
        });
      }
    });

    const additionalColumns = [
      {
        name: "NumberofPagesProcessed",
        label: "Pages Processed",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "matched",
        label: "Match / Mismatch",
        options: {
          filter: false,
          sort: false,
        },
      },
      {
        name: "agreementloan",
        label: "Action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            return (
              <Button
                variant="outlined"
                id="optionalbutton"
                type="submit"
                style={{ maxWidth: "10rem", padding: '1rem' }}
                onClick={(e) => {
                  openReview(
                    value["Deal Id"] ||
                    value["APP_ID"] ||
                    value["Unique Identifier / Filename"] ||
                    value["Contract #"] ||
                    value["Unique Identifier"] ||
                    value["DOCUMENT_ID"] ||
                    value[
                    "Identifier (9 digit unique identifier)"
                    ] ||
                    value["Document ID"],
                    tableMeta.rowData.filter(
                      (e) =>
                        (typeof e === "string" &&
                          e.includes(".pdf")) ||
                        (typeof e === "string" &&
                          e.toLowerCase().endsWith(".pdf"))
                    )[0]
                  )
                }}
              >
                Review
              </Button>
            )
          }


        },

      },
    ];

    display = [...display, ...additionalColumns];
    console.log(display, "disp")
    setColumns(display);
  };

  useEffect(() => {
    if (responsee?.res?.data.length > 0) {
      console.log('Response Data:', responsee.res.data);

      const updatedData = responsee.res.data;
      const existingData = loandata || [];

      const updatedTableData = existingData.map(existingItem => {
        const updatedItem = updatedData.find(item => item['Deal Id'] === existingItem['Deal Id']);
        return updatedItem ? updatedItem : existingItem;
      });

      console.log('Updated Table Data:', updatedTableData);

      setLoanData(updatedTableData);
      setTableData(updatedTableData.sort((a, b) => parseFloat(a.matched) - parseFloat(b.matched)));

    }
  }, [responsee]);




  useEffect(() => {
    const fetchLoans = async () => {
      setLoading(true);

      const poolid = localStorage.getItem("poolid");
      var data = {
        poolid: poolid
      }
      if (poolid) {
        await dispatch(viewloans(data));
        await dispatch(getattributedetailbypoolid(poolid));
      }
      setLoading(false);
      setGetData1(true);
    };

    fetchLoans();
  }, [dispatch]);

  useEffect(() => {
    const filterData = () => {
      if (searchValue) {
        const lowerCaseSearchText = searchValue.toLowerCase();
        const newFilteredData = tabledata.filter(row =>
          Object.values(row).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(lowerCaseSearchText)
          )
        );
        setFilteredData(newFilteredData);
        setDisplayData(newFilteredData);
      } else {
        setFilteredData(tabledata);
        setDisplayData(tabledata);
      }
    };

    filterData();
  }, [searchValue, tabledata]);

  useEffect(() => {
    const height = filteredData.length > 0 ? 50 * filteredData.length + 100 : 600;
    setTableHeight(height);
  }, [filteredData]);

  useEffect(() => {
    if (getdata1) {
      if (ddreportdata?.display_values) {
        setPoolId(ddreportdata.display_values.poolid);
        setPoolName(ddreportdata.display_values.poolname);
        setLmsFile(ddreportdata.display_values.lms_filename);
        setContractFile(ddreportdata.display_values.contract_filename);

        const poolIdFromData = ddreportdata.display_values.poolid;
        const loanData = ddreportdata?.data[0]?.[poolIdFromData]?.data;

        if (loanData && loanData.length > 0) {
          const sortedData = loanData.sort((a, b) => parseFloat(a.matched) - parseFloat(b.matched));
          console.log(sortedData, 'sortt');
          setTableData(sortedData);
          setLoanData(loanData);
          localStorage.setItem('dealids', JSON.stringify(ddreportdata.data[0][poolIdFromData]?.dealids));
          prepareColumns(sortedData);
        }
      }
    }
  }, [ddreportdata, getdata1]);
  useEffect(() => {
    if (selectAllChecked) {
      const allDealIds = tabledata.map(row => row["Deal Id"]);
      setSelectedRecords(allDealIds);
      dispatch(ddreportselect(JSON.stringify(allDealIds)));
    } else {
      setSelectedRecords([]);
      dispatch(ddreportselect(JSON.stringify([])));
    }
  }, [selectAllChecked, dispatch]);

  useEffect(() => {
    setCertifyDisabled(selectedRows.length === 0);
  }, [selectedRows]);


  // const displaydata = searchValue ? filteredData : tabledata
  const tableheight = 50 * displaydata.length + 100;
  const maxheight = 600;
  const limitedTableHeight = Math.min(tableheight, maxheight);
  return (
    <div className="page">
      <div className="content">
        <div className="header">
          <Header pageTitle={"DD REPORT SCREEN"}></Header>
        </div>
        <div className='dealdata'>

          <div style={{ marginLeft: "1rem" }}>
            <div>Deal Name: {poolname}</div>
            <div>Deal ID: {poolid} </div>
          </div>
          <div>
            {" "}
            <div>LMS File:{lmsfile}</div>
            <div>Zip File:{contractfile} </div>
          </div>
        </div>

        <div className='page-content'>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div><h6 style={{ fontSize: "20px" }}>{poolname}</h6></div>
            <div style={{
              display: 'flex',
              alignItems: "center",
              marginBottom: "5px"
            }}>

              {isTextFieldVisible && (
                <div style={{ marginRight: "3rem" }}>
                  <TextField
                    autoFocus
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    variant="standard"
                    color="#212121"
                    size="small"
                  />
                </div>

              )}
              <IconButton onClick={handleSearchClick}>
                {isTextFieldVisible ? (
                  <CloseIcon style={{ marginRight: "10px" }} />
                ) : (
                  <Search style={{ marginRight: "10px" }} />
                )}
              </IconButton>

              <Button
                variant="contained"
                color="primary"
                onClick={async () => {
                  await dispatch(downloadexcel(poolid, poolname));
                }}
                style={{ marginRight: "1rem" }}>
                Export LMS Excel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={ExportExcel}>
                EXPORT RECON
              </Button>
            </div>

          </div>

          {loading === false ? (
            tabledata.length > 0 ? (
              searchValue && filteredData.length === 0 ? (

                <div
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <p>No Data Found</p>
                </div>

              ) : (
                <div>

                  <TableVirtuoso
                    components={TableComponents}
                    data={displaydata}
                    columns={columns}
                    itemHeight={50}
                    style={{ height: `${limitedTableHeight}px`, overflowAnchor: "none" }}
                    fixedHeaderContent={() => (
                      <TableRow>
                        <>
                          <TableCell>
                            <Checkbox
                              checked={selectAllChecked}
                              onChange={handleSelectAllChange}
                            />
                          </TableCell>
                          {columns.map((column, i) => (
                            <TableCell
                              key={i}
                              style={{
                                background: "white",
                                cursor: "pointer",
                                width: `${column.length * 10}px`,
                                whiteSpace: "nowrap",
                              }}
                            >
                              <Tooltip title={`${column.label}`} placement="bottom-start">
                                <span>{column.label}</span>
                              </Tooltip>
                            </TableCell>
                          ))}
                        </>
                      </TableRow>
                    )}

                    itemContent={(index) => {
                      const rowdata = displaydata[index]['lmsloan']
                      const isOddRow = index % 2 !== 0;
                      return (
                        <>
                          <TableCell
                            style={{
                              backgroundColor: isOddRow
                                ? "rgb(229,229,229,0.3)"
                                : "",
                            }}
                          >
                            <Checkbox
                              checked={selectedRows.includes(index)}
                              onChange={(event) => handleSelectRowChange(event, index)}
                            />
                          </TableCell>

                          {columns.map((column, i) => (

                            <TableCell
                              key={i}
                              style={{
                                width: `${column.length * 10}px`,
                                background: "white",
                                whiteSpace: "nowrap",
                                backgroundColor: isOddRow
                                  ? "rgb(229,229,229,0.3)"
                                  : "",

                              }}
                            >
                              {column.name === "NumberofPagesProcessed" ? (
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                  {displaydata[index][column.name]}
                                </div>
                              ) : column.name === "matched" ? (
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                  {displaydata[index][column.name] === 1 ? (
                                    <img alt='' src={Match} />
                                  ) : (
                                    <img alt='' src={Mismatch} />
                                  )}
                                </div>
                              ) : column.name === "agreementloan" ? (
                                <Button
                                  variant="outlined"
                                  id="optionalbutton"
                                  type="submit"
                                  style={{ maxWidth: "13rem", padding: "10px" }}
                                  onClick={(event) => {

                                    const dealID =
                                      displaydata[index]["Deal Id"]
                                      ||
                                      displaydata[index][
                                      "APP_ID"
                                      ] ||
                                      displaydata[index][
                                      "Unique Identifier / Filename"
                                      ] ||
                                      displaydata[index][
                                      "Contract #"
                                      ] ||
                                      displaydata[index][
                                      "Unique Identifier"
                                      ] ||
                                      displaydata[index][
                                      "DOCUMENT_ID"
                                      ] ||
                                      displaydata[index][
                                      "Identifier (9 digit unique identifier)"
                                      ] ||
                                      displaydata[index][
                                      "Document ID"
                                      ];
                                    openReview(dealID, displaydata[index].loandocpath, event.currentTarget)
                                  }}



                                >
                                  Review
                                </Button>
                              ) : (rowdata[column.label])}
                            </TableCell>
                          ))}
                        </>
                      );
                    }}
                  />
                </div>
              )
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <p>No Data Found</p>
              </div>
            )
          ) : loading === true ? (
            <div
              style={{
                textAlign: "center",
                margin: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <CircularProgress size="25px" color="primary" /> Please
              wait, Loading Loan Data...
            </div>
          ) : (<div style={{ display: "flex", justifyContent: "center" }}>
            <p>No Data Found</p>
          </div>)}












          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "1rem",
            }}
          >
            Total no. of Loans{" "}
            <div style={{ marginLeft: "5px", fontWeight: "bold" }}>
              {displaydata.length}
            </div>{" "}

          </div>

          {/* <MUIDataTable
            title={poolname}
            data={tabledata}
            columns={columns}
            // options={options}
          /> */}
        </div>
        <div className="navbarSteps navbarStepsBtm">
          <div className="row justify-content-end">
            <Button
              variant="outlined"
              id="optionalbutton"
              onClick={backBtn}
              sx={{ color: "#048c88 !important", borderColor: "#048c88 !important" }}

            >
              {" "}
              BACK{" "}
            </Button>

            <Button
              // onClick={this.onSubmit}
              variant="contained"
              color="primary"
              type="submit"
              // sx={{ color: "#048c88 !important" }}
              disabled={certifyDisabled}
              onClick={() => { onSubmit() }}
            >

              CERTIFY
            </Button>
          </div>
        </div>
      </div>
      <>
        <Dialog open={openreview} onClose={() => setOpenReview(false)} className='modalPopup' maxWidth="lg" PaperProps={{
          style: {
            overflow: 'hidden', // Hides overflow
          },
        }} >
          <h2>Match Unmatch Data</h2>
          <Button
            className="closePopup"
            style={{ minWidth: "30px" }}
            variant="text"
            color="primary"
            onClick={() => setOpenReview(false)}
          >
            {" "}
            <Close></Close>

          </Button>
          <CompareData
            action={childHandler}
            msgData={msgdata}
          >

          </CompareData>
        </Dialog>
      </>
      <>
        <Dialog open={opensign} onClose={closeSignaturePop} className='modalPopup' maxWidth="xl"

          PaperProps={{
            style: {
              overflow: 'hidden', // Hides overflow
              width: "40rem"

            },
          }}

        >
          <h2>Upload Signature</h2>
          <Button
            className="closePopup"
            style={{ minWidth: "30px" }}
            variant="text"
            color="primary"
            onClick={closeSignaturePop}
          >

            <Close></Close>

          </Button>
          <div className="form-container" style={{ gap: "0" }}>
            <div className="kyc-card__button-container1" style={{ marginBottom: "0px" }}>
              <div style={{ padding: "2rem" }}>
                <h6 className="e1class">Upload Signature</h6>
                <button
                  className="card__button"
                  style={{
                    position: "relative",
                  }}
                >
                  <label
                    htmlFor="icon-button-file-id2"
                    className="upload-button-label"
                  >
                    Select File
                  </label>
                  <input
                    required
                    id="icon-button-file-id2"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    style={{
                      position: "absolute",
                      width: "60%",
                      height: "100%",
                      cursor: "pointer",
                      top: "0",
                      right: "0px",
                      opacity: "0",
                      border: "1.2px solid #212121",
                    }}
                    onChange={handleOnChange1}
                  />
                </button>
              </div>
              {file1 !== "" && (
                <div className="kyc-card__select_name-container" style={{ marginTop: "34px" }}>
                  <p>{filename1}</p>
                </div>
              )}
            </div>
            <div className="modalsubmit">
              <div className="submitbuttonbg">
                <div className="">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      variant="outlined"
                      id="optionalbutton"
                      onClick={closeSignaturePop}
                    >
                      {" "}
                      CANCEL{" "}
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={onAddSignature}
                    >
                      Upload
                      {formloader === true ? (
                        <CircularProgress
                          size="22px"
                          color="primary"
                        />
                      ) : (
                        ""
                      )}
                    </Button>

                    {certifystatus === true ? (
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={Certify}
                      >
                        {" "}
                        CERTIFY{" "}
                        {formloader === true ? (
                          <CircularProgress
                            size="22px"
                            color="primary"
                          />
                        ) : (
                          ""
                        )}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled
                        onClick={Certify}
                      >
                        CERTIFY
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </>

      <>
        {getdata && (
          <div id='pdfdata' hidden>
            {console.log({ signatory, sort, signatory }, "messss")}
            <h4 className="certicate-heading">Certificate</h4>
            {address.map((value) => {
              var arr = value.messageBody.split(",").map((add) => (
                <div>
                  {add},<br />
                </div>
              ));
              return (
                <div className="certificate-para1">
                  <address>{arr}</address>
                </div>
              )
            })}

            <div className="certificate-para1">

              {sort.map((value) => {
                return (
                  <div className="certificate-para1">
                    {value.messageBody}
                  </div>
                )
              })}
            </div>
            {signatory.map((value) => {
              return (
                <div className="certificate-para1-right">

                  <h6>{value.messageBody}</h6>
                  <img
                    src={
                      "https://intainva.intainabs.com/" +
                      "root_folder/"
                      +
                      filepath
                    }
                    alt="logo"
                    className="wellslogodeal"
                  />
                </div>
              )
            })}
            <h4 className="certicate-heading1">Exception Report</h4>
            <div>
              {exportdataxl === undefined ? (
                <></>
              ) : tableData(exportdataxl)}
              {/* exportdataxl */}
            </div>
          </div>
        )}
        {/* {getallmessage.result.length !== 0 ? (
          

        ) : null} */}
      </>
      <>
        <div>
          <Dialog open={openreport} onClose={handleCloseReport} PaperProps={{
            style: {
              padding: "15px", // Hides overflow
              width: "500px",
              outline: "none",
              borderRadius: "4px"
            },
          }} >
            <div style={{ textAlign: "center" }}>
              <ReportProblemOutlined
                style={{ fontSize: "xxx-large" }}
              >
              </ReportProblemOutlined>
            </div>
            <div style={{ textAlign: "center" }}>
              <h5>
                Contracts have not been viewed for mismatch. Do you
                still want to proceed?
              </h5>
            </div>
            <div class="row p-3" style={{ textAlign: "center" }}>

              <div className="col-md-6">
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleCloseReport}
                >
                  No
                </Button>
              </div>
              <div className="col-md-6">
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleYesReport}
                >
                  Yes
                </Button>
              </div>
            </div>
          </Dialog>
        </div>
      </>
    </div >
  );
};

export default DDreport;