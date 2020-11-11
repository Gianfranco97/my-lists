import React from "react";
import { Modal, Form, Input, Spin } from "antd";
import PropTypes from "prop-types";
import api from "../../../../shared/api-rest";

class TaskForm extends React.Component {
  state = {
    loading: false,
  };

  handleOk = () => {
    this.myForm.submit();
  };

  save = (values) => {
    const { closeModal, selectedTask, selectedList } = this.props;
    this.setState({ loading: true }, async () => {
      try {
        if (selectedTask)
          await api.updateTask({ idlist: selectedList.id, id: selectedTask.id, ...values });
        else await api.addNewTask({ idlist: selectedList.id, ...values });

        closeModal(true);
      } catch (error) { }
    });
  };

  render() {
    const { visible, selectedTask, closeModal } = this.props;
    const { loading } = this.state;

    return (
      <Modal
        title={
          selectedTask
            ? `Update '${selectedTask.task}'`
            : `Add new task`
        }
        visible={visible}
        onOk={this.handleOk}
        onCancel={() => closeModal()}
        okText={selectedTask ? "Update" : "Submit"}
        cancelText="Cancel"
      >
        <Spin spinning={loading} delay={500}>
          <Form
            ref={(e) => {
              this.myForm = e;
            }}
            initialValues={selectedTask}
            onFinish={this.save}
            layout="vertical"
            name="userForm"
          >
            <Form.Item name="task" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    );
  }
}

TaskForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  selectedList: PropTypes.object.isRequired,
  selectedTask: PropTypes.object,
  visible: PropTypes.bool,
};

export default TaskForm;
