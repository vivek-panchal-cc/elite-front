import React from "react";
import Image from "next/image";
import { elite_mobile_img, images } from "@/components/images";
import { homepageLabels, altTextLabels } from "@/lib/labels";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/ButtonUI";
import { Apple, Play } from "lucide-react";
import Link from "next/link";

export default function MidPageSection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-center">
          <div className="text-center lg:text-center">
            <div className="relative inline-block">
              <div className="bg-gray-100 rounded-3xl p-40 sm:p-48 md:p-48 lg:p-50 mx-auto w-fit shadow-lg relative">
                <Image
                  src={elite_mobile_img}
                  alt={altTextLabels.eliteMobileApp}
                  className="w-96 sm:w-96 md:w-[28rem] lg:w-[36rem] xl:w-[40rem] h-auto absolute -top-13 sm:-top-16 lg:-top-17 -left-0"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="border border-blue-800 rounded-[20px] py-1">
              <CardContent className="flex items-center gap-4 p-4 pl-20">
                {/* Icon */}
                <Image
                  src={images.simply}
                  alt="SIMply Icon"
                  width={48}
                  height={48}
                  className="shrink-0"
                />

                {/* Text Block */}
                <div>
                  <h3 className="text-blue-900 text-base font-extrabold leading-tight">
                    {homepageLabels.platform.directTopUp}
                  </h3>
                  <Link
                    href="/top-up"
                    className="text-blue-800 hover:underline text-sm font-medium"
                  >
                    {homepageLabels.platform.clickForMoreInfo}
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-100 border-none">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {homepageLabels.platform.downloadApp}
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-black text-white hover:bg-gray-800 flex items-center space-x-2">
                    <Play className="h-5 w-5" />
                    <span>{homepageLabels.platform.googlePlay}</span>
                  </Button>
                  <Button className="bg-black text-white hover:bg-gray-800 flex items-center space-x-2">
                    <Apple className="h-5 w-5" />
                    <span>{homepageLabels.platform.appStore}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
