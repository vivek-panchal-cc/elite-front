import { Button } from '@/components/ui/ButtonUI';
import { Input } from '@/components/ui/Input';
import React from 'react';

const RewardPoints = () => {
  return (
    <>
      <section>
        <div className="max-w-7xl mx-auto w-full">
          <div className=" gap-6 px-4 sm:px-5 md:px-8 lg:px-[60px] ">
            <div className="flex flex-col md:items-center lg:items-start items-center">
              <p className="text-[22px] md:text-[24px] lg:text-[26px] text-[var(--color-blue)] font-bold  mb-2">
                Reward Points Stats Listing
              </p>
              <div className="border-2  rounded-xl bg-[#F6F6F6] border-[#ED174B] flex flex-col md:w-full xl:flex-row xl:w-full m-0 px-6  py-5 justify-center items-center">
                <div className="sm:justify-center  lg:pb-8 flex flex-col items-center  xl:items-start 2xl:items-start">
                  <p className="text-[14px] md:text-[16px] lg:text-[18px] text-[var(--color-blue)] font-bold mb-2 ">
                    Enter Reward Points To Redeem
                  </p>
                  <Input
                    type="number"
                    className="border-2 rounded-4xl lg:w-120 lg:py-5 w-70 "
                    style={{ borderColor: '#ED174B' }}
                  ></Input>
                </div>
                {/* small devices and medium device */}
                <div className="xl:hidden flex flex-row justify-center items-center gap-2  pt-4 md:gap-3">
                  <Button className="text-[14px] md:text-[16px] font-semibold px-8 py-3 md:py-4 rounded-2xl bg-[#ED174B] text-[var(--color-white)]">
                    Redeem Points
                  </Button>
                  <Button className="text-[14px] md:text-[16px] font-semibold px-5 py-3 md:py-4  rounded-2xl bg-[rgba(0,81,152,0.1)] text-[#005198]">
                    £451.40
                  </Button>
                </div>
                {/* 1024 above */}
                <div className="hidden  xl:flex  flex-row justify-center items-center gap-2  p-3  lg:gap-10 lg:p-5 lg:pb-8">
                  <Button className="lg:text-[25px] font-semibold px-16 py-5  mt-5 rounded-4xl bg-[rgba(0,81,152,0.1)] text-[#005198]">
                    £451.40
                  </Button>
                  <Button className="lg:text-[20px] font-semibold px-24  py-7  rounded-4xl bg-[#ED174B] text-[var(--color-white)]">
                    Redeem Points
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RewardPoints;
