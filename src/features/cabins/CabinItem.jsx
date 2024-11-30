import React, { useState } from "react";
import useDeleteCabins from "./useDeleteCabins";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import useCreateCabin from "./useCreateCabin";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Spinner from "../../ui/Spinner";
import { useDarkMode } from "../../context/DarkModeContext";

export default function CabinItem({ cabin }) {
  const { deleteCabin, isLoading } = useDeleteCabins();
  const { createCabin } = useCreateCabin();
  const { isDarkMode } = useDarkMode();

  if (isLoading) return <Spinner />;

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <div
      className={`transition-colors duration-500 ${
        isDarkMode
          ? "mt-5 bg-gray-800  text-gray-200 px-4"
          : "mt-5 bg-gray-200 text-gray-700 px-4"
      } `}
    >
      <section
        className={`transition-colors duration-500 ${
          isDarkMode
            ? "md:grid  md:py-3 md:grid-cols-[1.2fr_2.5fr_3.0fr_2.2fr_2.0fr_1.2fr] md:items-center gap-4 flex flex-col items-start px-4 relativ py-2"
            : "md:grid md:border-b-2 md:py-3 md:grid-cols-[1.2fr_2.5fr_3.0fr_2.2fr_2.0fr_1.2fr] md:items-center gap-4 flex flex-col items-start px-4 relativ py-2"
        }`}
      >
        <img
          src={image}
          alt="Cabin"
          className="block w-[75px] lg:w-[100px] aspect-[3/2]"
        />
        <p className="px-2 text-left">{name}</p>
        <p className="text-sm ">Fits up to {maxCapacity} guests</p>
        <p className="px-2">{formatCurrency(regularPrice)}</p>
        <p className={`px-2 ${discount && "text-green-500"}`}>
          {discount === 0 ? <span>&mdash;</span> : formatCurrency(discount)}
        </p>

        <div className="absolute right-16 mt-4 xl:mt-0 xl:right-[200px]">
          <Modal>
            <Menus.Menu>
              <div className="relative">
                <Menus.Toggle id={cabinId} />
                <Menus.List id={cabinId}>
                  <Modal.Open opens="deleteCabin">
                    <button className="flex items-center gap-2 text-gray-600">
                      <span
                        className={` transition-colors duration-500 ${
                          isDarkMode
                            ? "text-gray-600 text-xl"
                            : "text-gray-400 text-xl"
                        }`}
                      >
                        <HiTrash />
                      </span>
                      Delete
                    </button>
                  </Modal.Open>
                  <Modal.Open opens="edit">
                    <button className="flex items-center gap-2 text-gray-600">
                      <span
                        className={`${
                          isDarkMode
                            ? "text-gray-600 text-xl"
                            : "text-gray-400 text-xl"
                        }`}
                      >
                        <HiPencil />
                      </span>
                      Edit
                    </button>
                  </Modal.Open>
                  <button
                    onClick={() => handleDuplicate()}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <span
                      className={`transition-colors duration-500 ${
                        isDarkMode
                          ? "text-gray-600 text-xl"
                          : "text-gray-400 text-xl"
                      }`}
                    >
                      <HiSquare2Stack />
                    </span>
                    Duplicate
                  </button>
                </Menus.List>

                <Modal.Window name="edit" className="bg-gray-700">
                  <CreateCabinForm cabinToEdit={cabin} />
                </Modal.Window>

                <Modal.Window name="deleteCabin">
                  <ConfirmDelete onConfirm={() => deleteCabin(cabinId)} />
                </Modal.Window>
              </div>
            </Menus.Menu>
          </Modal>
        </div>
      </section>
      {/* {showModal && (
        <Modal>
        <Modal.Open opens="createCabin"></Modal.Open>
        <CreateCabinForm cabinToEdit={cabin} showModal={setShowModal} />
        </Modal>
      )} */}
    </div>
  );
}
