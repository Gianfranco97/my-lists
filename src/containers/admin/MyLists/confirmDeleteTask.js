import React from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

function showDeleteConfirm(id, onOk) {
  confirm({
    title: "Are you sure delete this task?",
    icon: <ExclamationCircleOutlined />,
    content: "Once it is eliminated there is no going back",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      onOk(id)
    },
  });
}

export default showDeleteConfirm;
