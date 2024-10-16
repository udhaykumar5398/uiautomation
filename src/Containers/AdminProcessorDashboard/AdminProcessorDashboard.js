import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import { Dialog, TextField } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import MUIDataTable from 'mui-datatables';
import Loader from '../../Components/Loader/Loader';
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import { Close } from '@material-ui/icons';
import { CustomFieldTemplate, widgets } from '../../Components/CustomScripts/CustomScript';
import '../../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { addprocessordata, getallprocessor, getallprocessors } from '../../Store/AdminDashboard/AdminDashboardAction';


const Form = withTheme(MuiTheme);
const Processorschema = require('./processor-schemas.json');

const token = localStorage.getItem('token')

const AdminProcessorDashboard = () => {
  const dispatch = useDispatch();
  const admin_processor_data = useSelector((state) => state.admindashboard.add_processor_data.data.result)
  console.log(admin_processor_data, 'addd')
  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState(false);
  const [noofprocessor, setNoofProcessor] = useState(0);
  const [rowsSelected, setRowsSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openProcessor, setOpenProcessor] = useState(false);

  const onRowClick = (rowData, rowMeta) => {
    // Implement your onRowClick logic here
  };

  const onSubmitProcessor = async (value) => {
    let data = value.formData
    console.log("addprocessor---" + JSON.stringify(data));
    await dispatch(addprocessordata(data));
    await dispatch(getallprocessor);
    setOpenProcessor(false);

  }
  const onRowsSelect = (rowsSelected, allRows) => {
    console.log('allRows', allRows);
    console.log('rowsSelected', rowsSelected);
    setRowsSelected(allRows.map(row => row.dataIndex));
    const selected = allRows.map(row => row.dataIndex);
    console.log('selected' + selected);
    selectedpoolid(selected);
  };

  const selectedpoolid = (selected) => {
    // Implement your selectedpoolid logic here
  };

  const customSearch = (searchQuery, currentRow, columns) => {
    let isFound = false;
    currentRow.forEach(col => {
      if (col.toString().indexOf(searchQuery) >= 0) {
        isFound = true;
      }
    });
    return isFound;
  };

  const options = {
    customToolbar: () => { },
    filterType: 'dropdown',
    filter: true,
    search: false,
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
    searchPlaceholder: 'Your Custom Search Placeholder',
    customSearch: customSearch,
    loading: loading,
    textLabels: {
      body: {
        noMatch: loading === true
          ? 'Sorry, there is no matching data to display'
          : <Loader msg={"Please wait, Loading Loan Data"} />,
        toolTip: 'Sort',
        columnHeaderTooltip: (column) => `Sort for ${column.label}`,
      },
      filter: {
        all: 'All',
        title: 'FILTERS',
        reset: 'RESET',
      },
      selectedRows: {
        text: 'row(s) selected',
        delete: 'Delete',
        deleteAria: 'Delete Selected Rows',
      },
    },
  };

  const columns = [
    {
      name: 'username',
      label: 'Processor',
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "emailid",
      label: 'Email ID',
      options: {
        filter: true,
        sort: true,
      }
    },

    {
      name: "userrole",
      label: 'Role',
      options: {
        filter: true,
        sort: true,

      }
    },

    {
      name: "noofpool",
      label: 'Deals',
      options: {
        filter: true,
        sort: true,

      }
    },

  ];

  const handleChange = (e) => {
    setSearchText(e.target.value);
    setSearchType(true);
    console.log("search: e.target.value", e.target.value);
  };
  const handleClear = () => {
    setSearchText('');
    setSearchType(false);
  };

  useEffect(() => {
    dispatch(getallprocessor)
  }, [])
  return (
    <div className='page'>
      <div className='content'>
        <div className="header">
          <Header pageTitle='PROCESSORS' />
        </div>
        <div className='page-content'>
          <>
            <div className='row11'>

              <div className="col-md-6 col-sm-12" id="searchBox">
                <div className="tableSearch1">
                  <TextField
                    id="outlined-basic"
                    value={searchText}
                    onChange={handleChange}
                    label="Search"
                    variant="filled"
                    size="small"
                  />
                  {searchText.length !== 0 ? (
                    <CloseIcon className="closeiconstyle" onClick={handleClear} />
                  ) : (
                    ''
                  )}
                </div>
              </div>

              <div className="col-md-3 col-sm-12 " style={{ marginBottom: "1rem" }}>
                <div className="page-content1 text-center">
                  <div className="row align-items-center">
                    <div className="col text-secondary shifts1">
                      <h5 className="font-weight-bold">NO. OF PROCESSORS &nbsp;&nbsp;

                        {admin_processor_data.length}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>


              <div className="col-md-3 col-sm-12" style={{ marginBottom: "1rem" }}>
                <div className="page-content12 text-center">
                  <div className="row align-items-center">
                    <div className="col shifts12">
                      <Button className="buttonchanges"
                        id="optionalbutton"
                        onClick={() => setOpenProcessor(true)}
                        type="submit" startIcon={<AddIcon />}>&nbsp;&nbsp;&nbsp;ADD PROCESSOR</Button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <MUIDataTable
              data={admin_processor_data}
              columns={columns}
              options={options}
            />
          </>
        </div>
      </div>
      <>
        <Dialog open={openProcessor} onClose={() => setOpenProcessor(false)} className='modalPopup'>
          <h2>Add Processor</h2>
          <Button
            className="closePopup"
            style={{ minWidth: "30px" }}
            variant="text"
            color="primary"
            onClick={() => setOpenProcessor(false)}
          >
            {" "}
            <Close></Close>
          </Button>
          <div>
            <Form
              schema={Processorschema}
              onSubmit={onSubmitProcessor}
              widgets={widgets}
              FieldTemplate={CustomFieldTemplate}
            >
              <div className="modalsubmit">
                <div className="submitbuttonbg">
                  <hr className="hrbottom" />
                  <div className="row justify-content-end">
                    <Button
                      onClick={() => setOpenProcessor(false)}
                      variant="outlined"
                      id="optionalbutton"
                      style={{ color: "#048c88",border: "1px solid #048c88" }}

                    >
                      CANCEL
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      style={{ background: "#048c88" }}
                    >
                      ADD Processor
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </Dialog>
      </>
    </div>
  )
}

export default AdminProcessorDashboard
