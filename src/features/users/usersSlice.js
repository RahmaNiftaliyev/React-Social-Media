import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { client } from './../../api/client'


const usersAdapter = createEntityAdapter() ; 

const initialState = usersAdapter.getInitialState();



export const fetchUsers = createAsyncThunk('/users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users');
  return response.users
})



export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
    extraReducers: {
      [fetchUsers.fulfilled]:usersAdapter.setAll
    }
    
})





export const selectUserById = (state,userId) => state.users.find(user => user.id === userId)

export const  {
  selectAll: selectAllUsers,
  selectById: selectUsersById
} = usersAdapter.getSelectors(state => state.users)


export default usersSlice.reducer