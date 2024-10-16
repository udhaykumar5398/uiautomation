import React, { useState, useCallback, useEffect } from 'react';
import Loader from '../../Components/Loader/Loader';
import Header from '../../Components/Header/Header';
import Button from "@material-ui/core/Button";
import MUIDataTable from 'mui-datatables';
import { useDispatch, useSelector } from 'react-redux';
import { addissuecertificate, getallissuecertificate, getuniquedealnames } from '../../Store/AdminDashboard/AdminDashboardAction';
import { Dialog } from '@material-ui/core';
import { CustomFieldTemplate, widgets } from '../../Components/CustomScripts/CustomScript';
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import { Close } from '@material-ui/icons';

const Addissuecertificate = require("./Issue-certificate.json");
const Form = withTheme(MuiTheme);

const IssueCertificate = () => {
  const dispatch = useDispatch();
  const IssueCertificate = useSelector((state) => state.admindashboard?.add_issuecertificate_data);
  const dealname = useSelector((state) => state.admindashboard.get_unique_dealnames);
  const [rowsSelected, setRowsSelected] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData1, setFormData1] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);

  const onRowClick = useCallback((rowData) => {
    console.log("Row clicked: ", rowData);
    // Handle row click event
  }, []);

  const onRowsSelect = useCallback((rowsSelected, allRows) => {
    console.log("allRows", allRows);
    console.log("rowsSelected", rowsSelected);
    setRowsSelected(allRows.map((row) => row.dataIndex));
    const selected = allRows.map((row) => row.dataIndex);
    console.log("selected" + selected);
    selectedpoolid(selected);
  }, []);

  const selectedpoolid = (selected) => {
    console.log("Selected Pool ID: ", selected);
    // Handle selected pool ID
  };
  const onFormChanged = (value) => {
    setFormData1(value.formData);
  }

  const customSearch = useCallback((searchQuery, currentRow, columns) => {
    let isFound = false;
    currentRow.forEach((col) => {
      if (col.toString().indexOf(searchQuery) >= 0) {
        isFound = true;
      }
    });
    return isFound;
  }, []);

  const options = {
    customToolbar: () => { },
    filterType: "dropdown",
    filter: true,
    search: true,
    print: false,
    viewColumns: false,
    download: false,
    rowHover: false,
    selectableRowsOnClick: true,
    selectableRows: false,
    onRowClick: onRowClick,
    onRowsSelect: onRowsSelect,
    rowsSelected: rowsSelected,
    searchText: searchText,
    searchPlaceholder: "Search",
    customSearch: customSearch,
    loading: false,
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
  };
  const columns = [
    {
      name: "dealName",
      label: "Deal Name",
      options: {
        filter: true,
        sort: true,
      },

    },
    {
      name: "messageNumber",
      label: 'Serial Number',
      options: {
        filter: false,
        sort: false,

      }

    },
    {
      name: "messageType",
      label: "Message Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "messageBody",
      label: "Message",
      options: {
        filter: true,
        sort: true,
      },
    },



  ];
  const onSubmit = async (value) => {
    let data = value.formData
    console.log("AddAttribute" + JSON.stringify(data));
    await dispatch(addissuecertificate(data));
    setDialogOpen(false);
    await  dispatch(getallissuecertificate);
  }
  const closeCertificate = () => {
    setDialogOpen(false);
    setFormData1([]);
  }

  useEffect(() => {
    setLoading(true);
    dispatch(getallissuecertificate);
    dispatch(getuniquedealnames);
    setLoading(false);
  }, []);

  useEffect(() => {
    const uniqueNames = new Set(Addissuecertificate.properties.dealName.enum);
    dealname?.forEach((name) => {
      uniqueNames.add(name);
    });
    Addissuecertificate.properties.dealName.enum = Array.from(uniqueNames);
  }, [dealname]);


  return (
    <>
      <div className="page">
        <div className="content">
          <div className="header">
            <Header pageTitle='ONBOARD CERTIFICATE DATA'></Header>
          </div>
          <div className="page-content" style={{ textAlign: "center" }}>
            <div className="row">
              <div className="col-md-12 text-left">
                <h3 className="title-page1">{"ONBOARD CERTIFICATE DATA"}</h3>
              </div>
            </div>
            <div className="contentfields">
              <div className="row">
                <div className="text-left buttonshifts">
                  <Button
                    className="buttonchangess"
                    variant="outlined"
                    color="primary"
                    style={{ margin: "15px", color: "#048c88", border: "1px solid #048c88" }}
                    onClick={() => setDialogOpen(true)}

                  >

                    Add Certificate Data
                  </Button>
                </div>
              </div>
            </div>


            <MUIDataTable
              data={IssueCertificate.length > 0 ? IssueCertificate : []}
              columns={columns}
              options={options}
            />


          </div>
        </div>

        <>
          <Dialog open={dialogOpen} onClose={closeCertificate} className='modalPopup'

            PaperProps={{
              style: {
                width: "40rem"
              }
            }}
          >
            <h2>Add Certificate Data</h2>
            <Button
              className="closePopup"
              style={{ minWidth: "30px", color: "#048c88" }}
              variant="text"
              color="primary"
              onClick={closeCertificate}
            >
              {" "}
              <Close></Close>
            </Button>
            <div>
              <Form
                schema={Addissuecertificate}
                formData={formData1}
                widgets={widgets}
                FieldTemplate={CustomFieldTemplate}
                onSubmit={onSubmit}
                onFormChanged={onFormChanged}
              >


                <div className="modalsubmit">
                  <div className="submitbuttonbg">
                    <hr className="hrbottom" />
                    <div className="row justify-content-end">
                      <Button
                        onClick={closeCertificate}
                        variant="outlined"
                        id="optionalbutton"
                        style={{ color: "#048c88", border: "1px solid #048c88" }}
                      >
                        CANCEL
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ background: "#048c88" }}
                      >
                        ADD CERTIFICATE DATA
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </Dialog>
        </>
      </div>
    </>
  )
}

export default IssueCertificate;
