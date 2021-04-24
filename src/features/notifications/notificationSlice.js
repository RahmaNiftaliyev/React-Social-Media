import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { client } from './../../api/client' ; 

const notificationsAdapter = createEntityAdapter({
    sortComparer: (a,b) => b.date.localeCompare(a.date)
});

export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async (_, { getState }) => {

    const allNotifications = selectAllNotifications(getState()) ;
    const [latestNotification] = allNotifications;

    const latestTimeStamp = latestNotification ? latestNotification.date : ''  ;

    const response = await client.get(`/fakeApi/notifications?since=${latestTimeStamp}`) ;

    return response.notifications ; 

})


export const notificationsSlice = createSlice({
    name:'notifications',
    initialState:notificationsAdapter.getInitialState(),
    reducers:{
        allNotificationsRead:(state, action) => {
            Object.values(state.entities).forEach(notification => {
                notification.read = true 
            })
        }
    },
    extraReducers: {
        [fetchNotifications.fulfilled]: (state, action) => {
          Object.values(state.entities).forEach(notification => {
                notification.isNew = !notification.read
            })
          notificationsAdapter.upsertMany(state,action.payload)
           
        }
    }
})


export const {
    selectAll:selectAllNotifications
} = notificationsAdapter.getSelectors(state => state.notifications)

export const { allNotificationsRead } = notificationsSlice.actions

export default notificationsSlice.reducer

