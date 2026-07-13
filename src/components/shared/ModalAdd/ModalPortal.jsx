import React from 'react';
import { createPortal } from "react-dom";

export default function ModalPortal({ children }) {
  const root = document.getElementById("modal-add-container");

  if (!root) return null;

  return createPortal(children, root);
}