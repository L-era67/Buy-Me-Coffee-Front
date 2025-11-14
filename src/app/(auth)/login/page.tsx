"use client";

import { LogInEmailPassword } from "./_components/login";

const Page = () => {
//   const [currentStep, setCurrentStep] = useState(0);

  // const StepComponent = [LogInEmailPassword][currentStep];

  return (
    <div className="flex justify-center">
      <LogInEmailPassword />
    </div>
  );
};

export default Page;