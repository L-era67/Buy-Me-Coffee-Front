import { DonationPage } from "@/components/donation/DonationPage";

const userData = {
  id: "user_123",
  username: "bolormaa",
  donations: [
    {
      id: 101,
      amount: 5,
      donorId: 4,
      recipientId: 5,
      specialMesssage: "Сайн хийж байна шүү!",
      socialURLOrBuyMeACoffee: "https://twitter.com/fan1",
      createdAt: "2025-08-01T09:30:00.000Z",
      updatedAt: "2025-08-01T09:30:00.000Z",
    },
  ],
  profile: {
    name: "Bolormaa Dev",
    about: "Full-stack developer passionate about clean UI and coffee ☕",
    avatarImage: "https://github.com/shadcn.png",
    backgroundImage: "https://example.com/background.jpg",
    socialMediaURL: "https://twitter.com/bolor_dev",
    successMessage: "Баярлалаа! 🧡 Coffee авсан чинь их урам өглөө.",
  },
};

export default function UsersProfile() {
  return <DonationPage isEditable={false} userData={userData} />;
}
