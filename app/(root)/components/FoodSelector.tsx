import MultipleSelector from '@/components/selector/MultipleSelector';
import { OPTIONS } from '@/constants/options';

const FoodSelector = () => {
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
            />
        </div>
    )
}

export default FoodSelector
