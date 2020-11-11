import React from "react";
import { List, Button, Menu, Dropdown } from "antd";
import { ShoppingFilled, DownOutlined, SwapRightOutlined } from "@ant-design/icons";
import MyListsForm from "./MyListsForm";
import TaskForm from "./TaskForm";
import confirmDeleteList from "./confirmDeleteList";
import confirmDeleteTask from "./confirmDeleteTask";
import AdminLayout from "../../../components/AdminLayout";
import api from "../../../shared/api-rest";
import "./styles.scss";

class MyListsPage extends React.Component {
  state = {
    loading: true,
    showFormModal: false,
    showTaskModal: false,
    data: [],
    selectedList: null,
    selectedTask: null,
  };

  componentDidMount() {
    this.getData();
  }

  deleteList = (id) => {
    this.setState({ loading: true }, async () => {
      try {
        await api.deleteList(id);

        this.getData();
      } catch (error) { }
    });
  };

  deleteTask = (id) => {
    this.setState({ loading: true }, async () => {
      try {
        await api.deleteTask(id);

        this.getData();
      } catch (error) { }
    });
  };

  getData = () => {
    this.setState({ loading: true }, async () => {
      try {
        const res = await api.getMyLists();

        for (let index = 0; index < res.length; index++) {
          const list = res[index];
          const tasks = await api.getTasks(list.id)

          res[index].tasks = tasks
        }

        this.setState({
          loading: false,
          data: res,
        });
      } catch (error) {
        this.setState({
          loading: false
        })
      }
    });
  };

  closeModal = (update) => {
    if (update) this.getData();
    this.setState({ showFormModal: false, showTaskModal: false, selectedTask: null, selectedList: null });
  };

  moveTask(task, newListID) {
    this.setState({ loading: true }, async () => {
      try {
        await api.updateTask({ ...task, idlist: newListID });

        this.getData()
      } catch (error) {
        this.setState({
          loading: false
        })
      }
    });
  }

  render() {
    const { loading, data, showFormModal, showTaskModal, selectedList, selectedTask } = this.state;

    return (
      <AdminLayout title="My lists">
        <List
          className="my-list"
          loading={loading}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={`my-lists-${item.id}`}
              id={`my-lists-${item.name}`.replace(' ', '-')}
              actions={[
                <Button
                  type="link"
                  onClick={() => {
                    this.setState({
                      selectedList: item,
                      showTaskModal: true,
                    });
                  }}
                >
                  Add new task
              </Button>,
                <Button
                  type="link"
                  onClick={() => {
                    this.setState({
                      selectedList: item,
                      showFormModal: true,
                    });
                  }}
                >
                  edit
                </Button>,
                <Button
                  type="link"
                  onClick={() =>
                    confirmDeleteList(item.name, item.id, this.deleteList)
                  }
                >
                  delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<ShoppingFilled style={{ fontSize: "22px" }} />}
                title={item.name}
                description={
                  Array.isArray(item.tasks)
                    ? (
                      <List
                        size="large"
                        dataSource={item.tasks}
                        renderItem={task => (
                          <List.Item actions={[]}>
                            <div>
                              <p>
                                <SwapRightOutlined />  <b>{task.task}</b>
                              </p>

                              <div>
                                <Button
                                  type="link"
                                  onClick={() => {
                                    this.setState({
                                      selectedList: item,
                                      selectedTask: task,
                                      showTaskModal: true,
                                    });
                                  }}
                                >
                                  Edit
                                </Button>
                                <Dropdown
                                  overlay={() => (
                                    <Menu
                                      onClick={(e) => this.moveTask(task, e.key)}
                                    >
                                      {
                                        data.filter(list => list.name !== item.name).map((list, index) => (
                                          <Menu.Item key={list.id}>{list.name}</Menu.Item>
                                        ))
                                      }
                                    </Menu>
                                  )}
                                  trigger={['click']}
                                >
                                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    Move to <DownOutlined />
                                  </a>
                                </Dropdown>
                                <Button
                                  type="link"
                                  onClick={() =>
                                    confirmDeleteTask(task.id, this.deleteTask)
                                  }
                                >
                                  delete
                                </Button>
                              </div>
                            </div>
                          </List.Item>
                        )}
                      />
                    )
                    : []
                }
              />
            </List.Item>
          )
          }
        />

        <Button id="add-new-list" onClick={() => this.setState({ showFormModal: true })}>
          + ADD NEW LIST
        </Button >

        { showFormModal && (
          <MyListsForm
            visible
            closeModal={this.closeModal}
            selectedList={selectedList}
          />
        )}

        {
          showTaskModal && (
            <TaskForm
              visible
              closeModal={this.closeModal}
              selectedList={selectedList}
              selectedTask={selectedTask}
            />
          )
        }
      </AdminLayout >
    );
  }
}

export default MyListsPage;
