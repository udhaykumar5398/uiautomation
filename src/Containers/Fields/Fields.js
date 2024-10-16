import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Loader from '../../Components/Loader/Loader';
import Header from '../../Components/Header/Header';
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import { Button, Dialog } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { CustomFieldTemplate, widgets } from '../../Components/CustomScripts/CustomScript';
import { Close } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addfield, getallfields } from '../../Store/AdminDashboard/AdminDashboardAction';

const Addfieldschema = require('./Add-Field.json');
const uiSchema = require('./ui-schema.json');
const Form = withTheme(MuiTheme);

const Fields = () => {
  const dispatch = useDispatch();
  const fielddata = useSelector((state) => state.admindashboard?.add_fields_data);
  const [formData1, setFormData1] = useState({});
  const [rowsSelected, setRowsSelected] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const AddAttribute = async (value) => {
    let data = value.formData;
    console.log("AddAttribute", JSON.stringify(data));
    await dispatch(addfield(data));
    await dispatch(getallfields());
    setDialogOpen(false)
  };

  const onFormChanged = (value) => {
    setFormData1(value.formData);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      dispatch(getallfields());
      setLoading(false);
    };

    fetchData();
  }, []);

  const onRowClick = () => {
    // Implement your logic here
  };

  const selectedpoolid = (selected) => {
    // Implement your logic here
  };
  const closeFields = () => {
    setDialogOpen(false);
    setFormData1([]);
  }

  const columns = useMemo(() => [
    {
      name: 'attributePoolName',
      label: 'Deal Name',
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: 'attributeName',
      label: 'Attribute Name',
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "attributeStandardName",
      label: 'Attribute Standard Name',
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "attributeCategory",
      label: 'Attribute Category',
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "attributeDisplay",
      label: 'Attribute Display',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return typeof value === 'boolean' ? (value ? 'YES' : 'NO') : String(value).toUpperCase();
        },
      }
    },
  ], []);

  const options = useMemo(() => ({
    customToolbar: () => { },
    filterType: 'dropdown',
    filter: true,
    search: true,
    print: false,
    viewColumns: false,
    download: false,
    rowHover: false,
    selectableRowsOnClick: true,
    selectableRows: false,
    onRowClick: onRowClick,
    onRowsSelect: (rowsSelected, allRows) => {
      setRowsSelected(allRows.map(row => row.dataIndex));
      selectedpoolid(allRows.map(row => row.dataIndex));
    },
    rowsSelected: rowsSelected,
    searchText: searchText,
    searchPlaceholder: 'Search',
    customSearch: (searchQuery, currentRow) => {
      return currentRow.some(col => col !== null && searchQuery !== null && col.toString().indexOf(searchQuery) >= 0);
    },
    loading: loading,
    textLabels: {
      body: {
        noMatch: loading ? 'Sorry, there is no matching data to display' : <Loader msg={"Please wait, Loading Loan Data"} />,
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
  }), [rowsSelected, searchText, loading]);

  return (
    <div className='page'>
      <div className='content'>
        <div className="header">
          <Header pageTitle='FIELDS' />
        </div>

        <div className="page-content" style={{ textAlign: "center" }}>
          <div className="row">
            <div className="col-md-12 text-left">
              <h3 className="title-page1">
                <CenterFocusWeakIcon fontSize="large"></CenterFocusWeakIcon>&nbsp;&nbsp;{"Fields to capture"}
              </h3>
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
                  Add Field
                </Button>
              </div>
            </div>
          </div>

          <MUIDataTable
            data={fielddata.length > 0 ? fielddata : []}
            columns={columns}
            options={options}
          />
        </div>
      </div>

      <Dialog open={dialogOpen} onClose={closeFields} className='modalPopup'>
        <h2>Add Field</h2>
        <Button
          className="closePopup"
          style={{ minWidth: "30px", color: "#048c88" }}
          variant="text"
          color="primary"
          onClick={closeFields}
        >
          <Close />
        </Button>
        <div>
          <Form
            schema={Addfieldschema}
            uiSchema={uiSchema}
            formData={formData1}
            onSubmit={AddAttribute}
            onChange={onFormChanged}
            widgets={widgets}
            FieldTemplate={CustomFieldTemplate}
          >
            <div className="modalsubmit">
              <div className="submitbuttonbg">
                <hr className="hrbottom" />
                <div className="row justify-content-end">
                  <Button
                    onClick={closeFields}
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
                    ADD Fields
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </Dialog>
    </div>
  );
};

export default Fields;
