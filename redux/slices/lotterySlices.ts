import { Store } from '@/app/types/store'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface LotteryState {
    store: Store,
    selectedTags: string[]
}

const initialState: LotteryState = {
    store: {
        id: '',
        title: '',
        src: '',
        tags: []
    },
    selectedTags: []
}

export const lotterySlice = createSlice({
    name: 'lottery',
    initialState,
    reducers: {
        updateStore: (state, action: PayloadAction<Store>) => {
            state.store = action.payload;
        },
        updateSelectedTags: (state, action: PayloadAction<string[]>) => {
            state.selectedTags = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { updateStore, updateSelectedTags } = lotterySlice.actions

export default lotterySlice.reducer