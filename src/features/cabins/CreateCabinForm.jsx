import React from "react";
import { useForm } from "react-hook-form";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";
import { useDarkMode } from "../../context/DarkModeContext";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import Spinner from "../../ui/Spinner";

export default function CreateCabinForm({ onCloseModal, cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { createCabin, isLoading } = useCreateCabin();
  const { editCabin, isLoading: isUpdating } = useEditCabin();
  const { register, handleSubmit, getValues, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const ref = useOutsideClick(onCloseModal);
  const { isDarkMode } = useDarkMode();

  if (isLoading || isUpdating) return <Spinner />;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image: image }, id: editId },
        {
          onSuccess: (updatedCabin) => {
            reset(updatedCabin);
            onCloseModal?.();
          },
        }
      );
    } else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }
  return (
    <div className="w-[325px] md:w-auto" ref={ref}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 lg:flex lg:flex-col lg:h-[50vh] lg:py-10"
      >
        <div className="lg:flex lg:gap-10 flex items-center ">
          <label className="basis-40">Cabin name</label>
          <input
            type="text"
            id="name"
            {...register("name", { require: "This field is required" })}
            className={`${
              isDarkMode
                ? "input bg-gray-700 border-gray-600"
                : "input bg-gray-200 border-gray-300"
            }`}
          />
        </div>

        <div className="lg:flex lg:gap-10  flex items-center">
          <label className="basis-40">Maximum capacity</label>
          <input
            type="number"
            {...register("maxCapacity", { require: "This field is required" })}
            className={`${
              isDarkMode
                ? "input bg-gray-700 border-gray-600"
                : "input bg-gray-200 border-gray-300"
            }`}
            id="maxCapacity"
          />
        </div>

        <div className="lg:flex lg:gap-10  flex items-center">
          <label className="basis-40">Regular price</label>
          <input
            type="number"
            className={`${
              isDarkMode
                ? "input bg-gray-700 border-gray-600"
                : "input bg-gray-200 border-gray-300"
            }`}
            id="regularPrice"
            {...register("regularPrice", { require: "This field is required" })}
          />
        </div>

        <div className="lg:flex lg:gap-10  flex items-center">
          <label className="basis-40">Discount</label>
          <input
            type="number"
            className={`${
              isDarkMode
                ? "input bg-gray-700 border-gray-600"
                : "input bg-gray-200 border-gray-300"
            }`}
            id="discount"
            {...register("discount", {
              require: "This field is required",
              validate: (value) =>
                value <= getValues().regularPrice ||
                "Discount should be less than regular price",
            })}
          />
        </div>

        <div className="lg:flex lg:gap-10 gap-16 flex items-center">
          <label className="basis-40">Description for cabin</label>
          <textarea
            className={`${
              isDarkMode
                ? "bg-gray-700 w-[245px] input h-[65px] border-gray-600  lg:w-[400px]"
                : "bg-gray-200 w-full input h-[65px] lg:w-[400px]"
            }`}
            id="description "
            {...register("description", { require: "This field is required" })}
          />
        </div>
        {/* 
        <div className="flex gap-2 mt-3 items-center">
          <label
            htmlFor="image"
            className="cursor-pointer flex items-center gap-4"
          >
            <span>Cabin photo</span>
            <span className="bg-indigo-700 text-white py-2 px-4 rounded">
              Choose File
            </span>
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            className="hidden"
            {...register("image", {
              required: "This field is required",
            })}
          />
        </div> */}
        <div className="flex items-center gap-4">
          <label>Cabin Photo</label>
          <input
            id="image"
            accept="image/*"
            type="file"
            {...register("image", {
              required: isEditSession ? false : "This field is required",
            })}
          />
        </div>

        <div className="flex gap-4 justify-end mt-4">
          <button
            className="border text-gray-600 border-gray-300 bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
            onClick={() => onCloseModal()}
          >
            Cancel
          </button>

          <button className="bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 text-white py-2 px-4 rounded">
            {isEditSession ? "Edit cabin" : "Create new cabin"}
          </button>
        </div>
      </form>
    </div>
  );
}
