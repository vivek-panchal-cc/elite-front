import React from "react";
import Image from "next/image";
import { elite_mobile_img, images } from "@/components/images";
import { homepageLabels, altTextLabels } from "@/lib/labels";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/ButtonUI";
import { Apple, Play } from "lucide-react";
import Link from "next/link";
const googleStoreUrl = process.env.NEXT_PUBLIC_GOOGLE_PLAY_STORE_URL;
const appleStore = process.env.NEXT_PUBLIC_APP_STORE_URL;

export default function MidPageSection() {
  return (
    <section className="bg-[var(--color-white)] py-16 px-[40px] sm:px-6 md:px-10 lg:px-[60px] mt-[50px]">
      <div className="max-w-[73rem] mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Mobile App Image */}
          <div className="flex justify-center w-full lg:w-1/2">
            <div className="relative bg-[#E9E9E9] rounded-3xl w-full max-w-[100%] sm:max-w-[100%] md:max-w-[100%] lg:max-w-[560px] h-[200px] sm:h-[300px] md:h-[380px] lg:h-[400px] shadow-lg">
              <Image
                src={elite_mobile_img}
                alt={altTextLabels.eliteMobileApp}
                className="w-auto h-[300px] sm:h-[400px] md:h-[480px] lg:h-[518px] absolute bottom-0 left-1/2 -translate-x-1/2"
                priority
              />
            </div>
          </div>

          {/* Info & Buttons */}
          <div className="w-full lg:hidden order-2">
            <Card className="bg-[#E9E9E9] border-none">
              <CardContent className="pt-0 pb-0 px-3 lg:p-6 flex flex-col items-center justify-center text-center h-full">
                <h3 className="text-[17px] md:text-[26px] font-bold text-[var(--color-black)] mb-4 leading-[100%]">
                  {homepageLabels.platform.downloadApp}
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Link
                    href={googleStoreUrl as string}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={images.googlePlay}
                      alt="Google Play Icon"
                      height={100}
                      className="shrink-0 w-[128px]"
                    />
                  </Link>
                  <Link
                    href={appleStore as string}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={images.appleStore}
                      alt="Apple Store Icon"
                      height={100}
                      className="shrink-0 w-[128px]"
                    />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Download App Card */}
          <div className="flex flex-col gap-10 w-full lg:w-1/2 order-3 lg:order-none">
            {/* Direct Top-Up Card */}
            <Card className="border-[3px] border-[var(--color-blue)] rounded-[20px] py-0 sm:py-2">
              <CardContent className="flex items-center gap-4 p-4 px-6 sm:px-14">
                <Image
                  src={images.simply}
                  alt="SIMply Icon"
                  width={48}
                  height={48}
                  className="shrink-0"
                />
                <div>
                  <h3 className="text-[var(--color-blue)] text-[17px] sm:text-[20px] md:text-[25px] font-extrabold leading-tight">
                    {homepageLabels.platform.directTopUp}
                  </h3>
                  <Link
                    href="#"
                    className="text-[var(--color-blue)] text-[14px] hover:underline sm:text-[15px] md:text-[20px] font-medium"
                  >
                    {homepageLabels.platform.clickForMoreInfo}
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Download App Card for desktop view only */}
            <div className="hidden lg:block">
              <Card className="bg-[#E9E9E9] border-none">
                <CardContent className="p-6 px-10 flex flex-col items-center justify-center text-center h-full">
                  <h3 className="text-[26px] font-bold text-[var(--color-black)] mb-4 leading-[100%]">
                    {homepageLabels.platform.downloadApp}
                  </h3>
                  <div className="flex flex-wrap gap-4 justify-center cursor-pointer">
                    <Link
                      href={googleStoreUrl as string}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={images.googlePlay}
                        alt="Google Play Icon"
                        height={100}
                        className="shrink-0 w-auto"
                      />
                    </Link>
                    <Link
                      href={appleStore as string}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={images.appleStore}
                        alt="Apple Store Icon"
                        height={100}
                        className="shrink-0 w-auto"
                      />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
