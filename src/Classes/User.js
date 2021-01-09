class User {
    constructor(email, password, notes) {
        this.email = email;
        this.password = password;
        this.notes = notes;
    }

    addNote = (note) => {
        let temp = [...this.notes, note];
        this.notes = temp;
    };

    deleteNote = (i) => {
        let temp = this.notes.filter((note, index) => i !== index);
        this.notes = temp;
    };
}

export default User;