import MultipleSelector, { Option } from '@/components/selector/MultipleSelector';
import { OPTIONS } from '@/constants/options';
import { updateSelectedTags } from '@/redux/slices/lotterySlices';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';

const FoodSelector = () => {
    const isDrawing = useSelector((state: RootState) => state.lottery.isDrawing);

    const dispatch = useDispatch();

    const handleSelectOnChange = (e: Option[]) => {
        const filterTags = e.map((tag: Option) => {
            return `${tag.value}`
        });
        
        dispatch(updateSelectedTags(filterTags))
    };

    return (
        <div className="flex w-full flex-col gap-5 px-10 text-light-1">
            <MultipleSelector
                defaultOptions={OPTIONS}
                placeholder="現在我想來點..."
                emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-light-1">
                        no results found.
                    </p>
                }
                hidePlaceholderWhenSelected
                onChange={(e:Option[]) => handleSelectOnChange(e)}
                disabled={isDrawing}
            />
        </div>
    );
};

export default FoodSelector;
