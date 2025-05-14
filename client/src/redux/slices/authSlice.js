import {createSlice} from '@reduxjs/toolkit';
//test dummy
const dummyUser = {
    id: 123,
    name: 'HazeqTest',
    email: 'hazeqtest@example.com',
    role: 'admin',
}

/**const initialState= {
    user: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')) : null,

    isSidebarOpen: false,
};**/

//testdummyuser
const initialState= {
    user: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : dummyUser,

    isSidebarOpen: false,
};

// Ensure dummy user is also stored in localStorage if it wasn't already
if (!localStorage.getItem('userInfo')) {
    localStorage.setItem('userInfo', JSON.stringify(dummyUser));
}

const authSlice= createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredential: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logOut: (state, action) => {
            state.user = null;
            localStorage.removeItem('userInfo');
        },
        setOpenSidebar: (state, action) => {
            state.isSidebarOpen = action.payload;
        },
    },
});

export const {
    setCredential, logOut, setOpenSidebar
} = authSlice.actions;

export default authSlice.reducer;