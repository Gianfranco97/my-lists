import { Modal } from "antd";

const { confirm } = Modal;

function showDeleteConfirm(onOk) {
  confirm({
    title: "Are you sure you want to close the session?",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      onOk();
    },
  });
}

export default showDeleteConfirm;
