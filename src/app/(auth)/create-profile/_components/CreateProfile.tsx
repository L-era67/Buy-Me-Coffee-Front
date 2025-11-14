"use client";

import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";

import { CreateUserProfile } from "@/components/userInfo/createProfileInfo/CreateUpdateProfile";
import { ProfileImageUploader } from "@/components/userInfo/createProfileInfo/profileImageuploader";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/provider/currentUserProvider";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const createUserSchema = Yup.object({
  profileImage: Yup.string().required("Please enter image"),
  name: Yup.string().required("Name is Please enter name"),
  about: Yup.string().required("Please enter info about yourself"),
  socialURL: Yup.string().url("Please enter a social link").required(),
});

type createProfileType = {
  handleNext: () => void;
};

export const CreateProfile = ({ handleNext }: createProfileType) => {
  const [loading, setLoading] = useState(false);
  const [waitingForUser, setWaitingForUser] = useState(true);

  const { userProvider, refreshUser } = useContext(UserContext);

  const url = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || "http://localhost:4001";

  // Wait for userProvider.id to be available
  useEffect(() => {
    if (userProvider?.id) {
      setWaitingForUser(false);
      return;
    }

    // If no user id, try to refresh
    const token = localStorage.getItem("token");
    if (token) {
      const loadUser = async () => {
        await refreshUser();
        // Give context time to update
        setTimeout(() => {
          setWaitingForUser(false);
        }, 500);
      };
      loadUser();
    } else {
      setWaitingForUser(false);
    }
  }, [userProvider?.id, refreshUser]);

  const createProfilePost = async (
    profileImage: string,
    about: string,
    name: string,
    socialURL: string
  ) => {
    if (!userProvider?.id) {
      toast.error("User information is not available. Please refresh the page.");
      return;
    }

    try {
      await axios.post(`${url}/profile/${userProvider.id}`, {
        avatarImage: profileImage,
        about,
        name,
        socialMediaURL: socialURL,
      });
      toast.success("Profile created successfully!");
    } catch (error) {
      toast.error("Error creating profile");
    }
  };

  const formik = useFormik({
    initialValues: {
      profileImage: "",
      name: "",
      about: "",
      socialURL: "",
    },

    validationSchema: createUserSchema,

    onSubmit: async (values) => {

      setLoading(true);

      await createProfilePost(
        values.profileImage,
        values.about,
        values.name,
        values.socialURL
      );

      handleNext();

      setLoading(false);
    },
  });

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    values,
    setFieldValue,
  } = formik;

  const getFieldProps = (name: keyof typeof values) => ({
    name,
    onChange: handleChange,
    onBlur: handleBlur,
    value: values[name],
    inputError: touched[name] && errors[name],
    inputErrorMessage: errors[name],
  });

  if (waitingForUser || !userProvider?.id) {
    return (
      <div className="w-[100%] h-[100vh] flex flex-col justify-center items-center">
        <div className="flex gap-6 flex-col w-[510px]">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-full" />
          <div className="text-right mt-[24px]">
            <Skeleton className="h-10 w-32 ml-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[100%] h-[100vh] flex flex-col justify-center items-center ">
      <form onSubmit={handleSubmit} className="flex gap-6 flex-col w-[510px]">
        <p className="text-2xl font-semibold">Complete your profile page</p>
        <ProfileImageUploader
          value={values.profileImage}
          touchedErr={!!touched.profileImage}
          error={errors.profileImage || ""}
          setImageField={(url: string) => setFieldValue("profileImage", url)}
        />
        <CreateUserProfile
          profileNameinputProps={getFieldProps("name")}
          profileAboutMeInputProps={getFieldProps("about")}
          profileURLInputProps={getFieldProps("socialURL")}
        />
        <div className="text-right mt-[24px]">
          <Button type="submit" disabled={loading || !userProvider?.id}>
            {loading ? "...loading" : "Continue"}
          </Button>
        </div>
      </form>
    </div>
  );
};
