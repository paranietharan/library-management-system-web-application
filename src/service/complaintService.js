import httpCommon from './http-common';
import axios from 'axios';

const API_URL = httpCommon.API_URL + '/complaints';

const getAllComplaints = () => axios.get(`${API_URL}/unresolved`);
const resolveComplaint = (complaintId) => axios.put(`${API_URL}/resolve/${complaintId}`);
const unresolveComplaint = (complaintId) => axios.put(`${API_URL}/unresolve/${complaintId}`);
const getAllResolvedComplaints = () => axios.get(`${API_URL}/resolved`);

export default {
    getAllComplaints,
    resolveComplaint,
    unresolveComplaint,
    getAllResolvedComplaints
};