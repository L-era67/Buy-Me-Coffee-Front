import { CircleCheck } from "lucide-react";

export  function DonationComplatePage () {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-center gap-5 items-center">
        <div className="w-16 h-16 bg-green-500 flex justify-center items-center rounded-full">
          <CircleCheck className="text-white" />
        </div>
        <h1 className="font-semibold">Donation Complete !</h1>
      </div>
      <div className="p-3 border w-[510px] rounded-lg">
        <div className="flex items-center gap-2">
          <img
            src="https://i.pinimg.com/736x/8e/45/77/8e4577d002725d24c78f1449748e5d12.jpg"
            alt="zureg"
            className="w-8 h-8 rounded-full"
          />
          <h2 className="font-medium">Moloko:</h2>
        </div>
        <p className="font-normal">
          Thank you for supporting me! It means a lot to have your support. It’s
          a step toward creating a more inclusive and accepting community of
          artists.
        </p>
      </div>
    </div>
  );
}
