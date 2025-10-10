import { profileLabels } from "@/lib/labels";
import Phone from "../images/svgs/Phone";
import Mail from "../images/svgs/Mail";

export default function ContactCard() {
  return (
    <div className="bg-[var(--color-white)] rounded-xl shadow-lg p-3 sm:p-4 text-center flex flex-col justify-center text-[var(--color-black)]">
      <h3 className="font-semibold text-[12px] sm:text-[14px] mb-3">
        {profileLabels.contactUs}
      </h3>
      <div className="flex flex-col gap-2 w-full px-6 sm:px-12 font-semibold">
        <a
          href={`tel:${profileLabels.profilePhone}`}
          className="flex items-center justify-center gap-2 bg-[var(--color-red)] hover:bg-[var(--color-red-hover)] text-[var(--color-white)] text-xs sm:text-sm md:text-[12px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full w-full max-h-[29px] !leading-[20px]"
        >
          <Phone fill="var(--color-white)" className="h-3 w-3" />
          {profileLabels.profilePhone}
        </a>
        <a
          href={`mailto:${profileLabels.profileEmail}`}
          className="flex items-center justify-center gap-2 bg-[var(--color-dark-blue)] hover:bg-primary/90 text-[var(--color-white)] text-xs sm:text-sm md:text-[12px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full w-full max-h-[29px] !leading-[20px]"
        >
          <Mail fill="var(--color-white)" />
          {profileLabels.profileEmail}
        </a>
      </div>
    </div>
  );
}
