import React, { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

export default function AddCabin() {
  const [showModal, setShowModal] = useState(false);
  function handleModal() {
    setShowModal(true);
  }
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <button
            onClick={handleModal}
            className="bg-indigo-600 px-4 py-2 my-7 transition-colors duration-300 hover:bg-indigo-700 text-white rounded-lg"
          >
            Add a new Cabin
          </button>
        </Modal.Open>

        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
