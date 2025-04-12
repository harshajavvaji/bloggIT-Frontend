import React from "react";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import Button from "react-bootstrap/Button";

const DeleteBlogModal = ({ id, closeDeleteModal, setReload }) => {
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://blogit-0mif.onrender.com/api/blogs/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();
      console.log("response", data);
      setReload(true);
      closeDeleteModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.3)", 
        backdropFilter: "blur(4px)",
        zIndex: 1050, 
      }}
    >
      <div
        className="p-4 bg-white border rounded shadow"
        style={{ width: "350px" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <strong>Delete Blog</strong>
          <Link
            onClick={closeDeleteModal}
            style={{ color: "grey", cursor: "pointer" }}
          >
            <RxCross2 size={20} />
          </Link>
        </div>
        <div className="mb-3">Are you sure you want to delete this blog?</div>
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlogModal;
