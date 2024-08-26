import FoodLottery from "./components/FoodLottery";
import LocationMap from "./components/LocationMap";

export default function Home() {

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl md:text-3xl head-text tracking-widest mb-6">
        NCKU Food Draw
      </h2>
      <div className="text-light-1 w-full flex flex-col items-center">
        <FoodLottery />
        <LocationMap />
      </div>
    </div>
  );
}
