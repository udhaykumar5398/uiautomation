import { combineReducers } from 'redux';
import AdminDashboardReducer from "../Store/AdminDashboard/AdminDashboardReducer";
import processorReducer from './ProcessorDashboard/ProcessorDashboardReducer';
// import processorReducer from './Processor/processorReducer';
// import fieldsReducer from './Fields/fieldsReducer';
// import documentReducer from './Documents/documentReducer';
// import queuesReducer from './Queues/queuesReducer';
// import userReducer from './User/userReducer';
// import digitizeReducer from './Digitize/digitizeReducer';
// import PreprocessorReducer from './PreProcessing/PreProcessingReducer';
// import CommonReducer from './Common/CommonReducer';
// import testReducer from './Test/testReducer';

// const reducer = combineReducers({
//   test: testReducer,
//   processor: processorReducer,
//   fields: fieldsReducer,
//   documents: documentReducer,
//   queues: queuesReducer,
//   user: userReducer,
//   digitize: digitizeReducer,
//   preProcess: PreprocessorReducer,
//   common: CommonReducer,
//   //test: testReducer,
// });
// export default reducer;

const reducer = combineReducers({
  admindashboard: AdminDashboardReducer,
  processordashboard:processorReducer
})

export default reducer