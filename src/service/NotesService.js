import httpCommon from "./http-common";

const API_URL = '/notes';

class NotesService {
    getAllNotes(userId) {
        return httpCommon.get(`${API_URL}/${userId}`);
    }

    getNoteById(id) {
        return httpCommon.get(`${API_URL}/note/${id}`);
    }

    addNote(note, userId) {
        return httpCommon.post(`${API_URL}/${userId}`, note);
    }

    updateNote(note) {
        return httpCommon.put(`${API_URL}/`, note);
    }

    deleteNoteById(id) {
        return httpCommon.delete(`${API_URL}/${id}`);
    }
}

export default new NotesService();