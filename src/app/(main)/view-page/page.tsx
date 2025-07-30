import { Header } from "@/components/Header";
import { DonationProfile } from "./components/Donation-Profile";
import { DonationSocialMedia } from "./components/Donation-SocialMedia";
import { DonationBuyCoffeeCart } from "./components/DonationBuyCoffeeCart";
import { DonationSupporters } from "./components/DonationSupporters";
import DonationBackground from "@/utils/Image";

export default function Donation() {
  return (
    <div>
      <div className="relative">
        <DonationBackground />
      </div>
      <div className="flex gap-5 justify-center z">
        <div>
          <DonationProfile />
          <DonationSocialMedia />
          <DonationSupporters />
        </div>
        <DonationBuyCoffeeCart />
      </div>
    </div>
  );
}
