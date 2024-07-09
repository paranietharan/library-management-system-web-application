import httpCommon from './http-common';

const API_URL = '/complaint';

const getAllComplaints = () => httpCommon.get(`${API_URL}/unresolved`);
const resolveComplaint = (complaintId) => httpCommon.put(`${API_URL}/resolve/${complaintId}`);
const unresolveComplaint = (complaintId) => httpCommon.put(`${API_URL}/unresolve/${complaintId}`);
const getAllResolvedComplaints = () => httpCommon.get(`${API_URL}/resolved`);

export default {
    getAllComplaints,
    resolveComplaint,
    unresolveComplaint,
    getAllResolvedComplaints
};