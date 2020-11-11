import React from "react";
import { Modal, Form, Input, InputNumber, Spin } from "antd";
import PropTypes from "prop-types";
import api from "../../../../shared/api-rest";

class MyListsForm extends React.Component {
  state = {
    loading: false,
  };

  handleOk = () => {
    this.myForm.submit();
  };

  save = (values) => {
    const { closeModal, selectedList } = this.props;
    this.setState({ loading: true }, async () => {
      try {
        if (selectedList)
          await api.updateList({ id: selectedList.id, ...values });
        else await api.addNewList(values);

        closeModal(true);
      } catch (error) { }
    });
  };

  render() {
    const { visible, selectedList, closeModal } = this.props;
    const { loading } = this.state;

    return (
      <Modal
        title={
          selectedList
            ? `Update '${selectedList.name}'`
            : `Add new list`
        }
        visible={visible}
        onOk={this.handleOk}
        onCancel={() => closeModal()}
        okText={selectedList ? "Update" : "Submit"}
        cancelText="Cancel"
      >
        <Spin spinning={loading} delay={500}>
          <Form
            ref={(e) => {
              this.myForm = e;
            }}
            initialValues={selectedList}
            onFinish={this.save}
            layout="vertical"
            name="userForm"
          >
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    );
  }
}

MyListsForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  selectedList: PropTypes.object,
};

export default MyListsForm;
