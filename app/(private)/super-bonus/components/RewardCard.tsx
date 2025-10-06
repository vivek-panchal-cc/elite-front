import Image, { StaticImageData } from "next/image";
import { superRewardsLabels } from "@/lib/labels";

const RewardCard: React.FC<{
  target: number | string;
  rewards: string[];
  image: string | StaticImageData;
}> = ({ target, rewards, image }) => {
  return (
    <>
      <div className="w-[95%] mx-auto">
        <div className="p-0 focus:bg-white">
          <div className="w-full p-4 pt-10 flex flex-col relative">
            {/* Target */}
            <p className="text-[14px] font-bold">
              {superRewardsLabels.target}
              <span className="font-medium text-[12px]">{target}</span>
            </p>

            {/* Reward Section */}
            <div className="mt-2">
              <p className="text-[14px] font-bold">
                {superRewardsLabels.reward}
              </p>
              <ul className="text-[12px] font-medium pl-4 mt-1 space-y-1 list-none">
                {rewards.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            {/* Logo */}
            <div className="absolute top-8 right-3">
              <Image
                src={image}
                width={30}
                height={20}
                alt="elite"
                className="w-12 h-12 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RewardCard;
