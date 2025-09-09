import { Button } from '@/components/ui/ButtonUI';
import { Input } from '@/components/ui/Input';
import React from 'react';

const RewardPoints = () => {
  return (
    <>
      <section>
        <div className="max-w-7xl mx-auto w-full">
          <div className="gap-6 px-4 sm:px-5 md:px-8 lg:px-[60px] ">
            <div className="flex flex-col md:items-center lg:items-start items-center">
              <p className="text-[22px] md:text-[24px] lg:text-[26px] text-[var(--color-blue)] font-bold  mb-2">
                Reward Points Stats Listing
              </p>
              <div className="border-2 rounded-xl bg-[#F6F6F6] border-[#ED174B] flex flex-col w-full lg:flex-row lg:w-full m-0 p-5 pb-8 justify-center items-center">
                <div className="sm:justify-center flex flex-col items-center w-full lg:items-start 2xl:items-start">
                  <p className="text-[14px] md:text-[16px] lg:text-[18px] text-[var(--color-blue)] font-bold mb-2 ">
                    Enter Reward Points To Redeem
                  </p>
                  <Input
                    type="number"
                    className="border-2 h-[33px] md:h-[51px] rounded-4xl w-full sm:w-[70%] lg:w-full mx-auto lg:mx-0 xl:w-120"
                    style={{ borderColor: '#ED174B' }}
                  ></Input>
                </div>
                <div className="flex flex-row-reverse md:flex-row justify-center items-center gap-2 p-3 lg:gap-10 lg:pl-5 pt-3 lg:pb-0">
                  <Button className="lg:text-[25px] h-[33px] md:h-[51px] lg:mt-5 font-semibold px-16 py-0 rounded-4xl bg-[rgba(0,81,152,0.1)] hover:bg-[rgba(0,81,152,0.1)] text-[#005198]">
                    £451.40
                  </Button>
                  <Button className="lg:text-[20px] h-[33px] md:h-[51px] font-semibold md:px-24 rounded-4xl bg-[#ED174B] hover:bg-[#ED174B] text-[var(--color-white)]">
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
