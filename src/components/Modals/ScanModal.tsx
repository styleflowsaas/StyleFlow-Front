import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ScanModal: React.FC<{ handleModal: () => void }> = ({ handleModal }) => {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (code) {
      router.push(`/Productos/${code}`);
      handleModal();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Modal dismissible show={true} onClose={handleModal} size="md">
      <Modal.Header>Escanear Producto</Modal.Header>
      <Modal.Body className="flex flex-col gap-2 items-center">
        <input
          type="text"
          autoFocus
          className="w-full rounded border-none bg-secundario-ligth dark:bg-fondo-dark   focus:ring-0 focus:outline-fondo-dark"
          placeholder="Código de Barras"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleSearch} color="gray">
          Buscar
        </Button>{" "}
      </Modal.Body>
    </Modal>
  );
};

export default ScanModal;
