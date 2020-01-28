import React from "react";
import PropTypes from "prop-types";
import { FaFolderOpen as IconLoad } from "react-icons/fa";
import ToolbarButton from "./toolbar-button";
import { browserPDFupload } from "../../utils/browser";

export default function ToolbarPdfLoadButton({ state }, { translator, projectActions }) {

  let loadPdfFromFile = (event) => {
    console.log(state.scene.width);
    event.preventDefault();
    browserPDFupload().then(data => {
      projectActions.setProjectProperties({ background: data, width: state.scene.width, height: state.scene.height });
    });
  };

  return (
    <ToolbarButton active={false} tooltip={translator.t("Open PDF")} onClick={loadPdfFromFile}>
      <IconLoad />
    </ToolbarButton>
  );
}

ToolbarPdfLoadButton.propTypes = {
  state: PropTypes.object.isRequired
};

ToolbarPdfLoadButton.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};
