import { useState } from "react";

export default function useModal() {
  const [modalActive, setModalActive] = useState(false);

  const toggleModal = () => {
    setModalActive(!modalActive);
  };

  return {
    modalActive,
    setModalActive,
    toggleModal,
  };
}
